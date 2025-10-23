from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
import os
from functools import wraps

# Import modeli bazy danych
from database import menu_manager, contact_manager, settings_manager

app = Flask(__name__)
CORS(app)  # Umożliwia requesty z frontendu

# Konfiguracja
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
app.config['UPLOAD_FOLDER'] = 'static/assets/images'

# =============================================================================
# SECURITY MIDDLEWARE - Nagłówki bezpieczeństwa
# =============================================================================


@app.after_request
def add_security_headers(response):
    """Dodaje nagłówki bezpieczeństwa do każdej odpowiedzi"""
    # Content Security Policy - pozwala na CDN i inline styles/scripts
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; "
        "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://fonts.googleapis.com; "
        "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com; "
        "img-src 'self' data: https:; "
        "frame-src 'self' https://www.google.com; "
        "connect-src 'self' http://127.0.0.1:5000;"
    )
    
    # Inne nagłówki bezpieczeństwa
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
    
    return response


# Rate limiting decorator (dla produkcji użyj Flask-Limiter)
def rate_limit(max_per_minute=60):
    """
    Prosty rate limiter decorator.
    W produkcji należy użyć Flask-Limiter lub Redis.
    """

    def decorator(f):

        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Placeholder - w produkcji zaimplementuj sprawdzanie limitu
            # np. używając Redis lub Flask-Limiter
            return f(*args, **kwargs)

        return decorated_function

    return decorator

# =============================================================================
# ROUTES - STRONY GŁÓWNE  
# =============================================================================


@app.route('/')
def index():
    """Strona główna"""
    return render_template('index.html')


@app.route('/robots.txt')
def robots_txt():
    """Serwuje plik robots.txt dla SEO"""
    return send_from_directory('static', 'robots.txt', mimetype='text/plain')


@app.route('/sitemap.xml')
def sitemap_xml():
    """Serwuje sitemap.xml dla SEO"""
    return send_from_directory('static', 'sitemap.xml', mimetype='application/xml')


@app.route('/manifest.json')
def manifest_json():
    """Serwuje manifest.json dla PWA"""
    return send_from_directory('static', 'manifest.json', mimetype='application/json')


@app.route('/admin')
def admin_dashboard():
    """Dashboard administracyjny"""
    return render_template('admin.html')


@app.route('/menu/<slug>')
def menu_page(slug):
    """Podstrona z menu dla konkretnej kategorii"""
    # Mapowanie slug na obrazki
    menu_images = {
        'dania-prosto-z-ognia': 'daniaZOgnia.jpg',
        'wypieki': 'wypieki.jpg',
        'zupy': 'zupy.jpg',
        'khinkali-tolma': 'wypieki.jpg',  # użyj odpowiedniego obrazka
        'desery-dodatki': 'deser.jpg'
    }
    
    # Mapowanie na tytuły
    menu_titles = {
        'dania-prosto-z-ognia': 'Dania prosto z ognia',
        'wypieki': 'Wypieki',
        'zupy': 'Zupy',
        'khinkali-tolma': 'Khinkali i Tolma',
        'desery-dodatki': 'Desery i Dodatki'
    }
    
    if slug not in menu_images:
        return "Menu nie znalezione", 404
    
    from datetime import datetime
    
    return render_template('menu.html',
                          image=menu_images[slug],
                          title=menu_titles[slug],
                          slug=slug,
                          year=datetime.now().year)


@app.route('/o-nas')
def about():
    """Strona O nas"""
    from datetime import datetime
    return render_template('about.html', year=datetime.now().year)

# =============================================================================
# API - PUBLICZNE ENDPOINTY
# =============================================================================


@app.route('/api/menu', methods=['GET'])
def get_menu():
    """Pobiera dane menu z bazy danych"""
    try:
        menu_data = menu_manager.get_all_menu_data()
        return jsonify(menu_data)
    except Exception as e:
        print(f"Błąd pobierania menu: {e}")
        return jsonify({'error': 'Błąd serwera'}), 500


@app.route('/api/contact', methods=['POST'])
@rate_limit(max_per_minute=10)  # Limit 10 wiadomości na minutę
def contact():
    """Obsługuje formularz kontaktowy z walidacją i sanityzacją"""
    try:
        data = request.get_json()
        
        # Walidacja podstawowa
        if not data or not isinstance(data, dict):
            return jsonify({'error': 'Nieprawidłowe dane'}), 400
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '').strip()
        message = data.get('message', '').strip()
        
        # Walidacja wymaganych pól
        if not name or not email or not message:
            return jsonify({'error': 'Wszystkie pola są wymagane'}), 400
        
        # Walidacja długości (ochrona przed flood attacks)
        if len(name) > 100 or len(email) > 100 or len(message) > 2000:
            return jsonify({'error': 'Dane przekraczają dozwoloną długość'}), 400
        
        # Walidacja email (podstawowa)
        import re
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            return jsonify({'error': 'Nieprawidłowy format email'}), 400
        
        # Sanityzacja danych (usunięcie potencjalnie niebezpiecznych znaków)
        safe_data = {
            'name': re.sub(r'[<>]', '', name),  # Usuń < >
            'email': email.lower(),
            'phone': re.sub(r'[^\d\s\+\-\(\)]', '', phone) if phone else '',  # Tylko cyfry i znaki tel
            'message': re.sub(r'[<>]', '', message)  # Usuń < >
        }
        
        # Zapisz wiadomość w bazie
        message_id = contact_manager.save_message(safe_data)
        
        print(f"✓ Nowa wiadomość ID: {message_id} od: {safe_data['name']} ({safe_data['email']})")
        
        return jsonify({
            'message': 'Wiadomość została wysłana pomyślnie!',
            'id': message_id
        }), 200
        
    except ValueError as e:
        print(f"⚠ Błąd walidacji: {e}")
        return jsonify({'error': 'Nieprawidłowe dane wejściowe'}), 400
    except Exception as e:
        print(f"✗ Błąd serwera: {e}")
        return jsonify({'error': 'Wystąpił błąd. Spróbuj ponownie później.'}), 500


@app.route('/api/static/<path:filename>')
def serve_static(filename):
    """Serwuje pliki statyczne (zdjęcia)"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/api/health', methods=['GET'])
def health_check():
    """Sprawdzenie statusu API"""
    return jsonify({'status': 'OK', 'message': 'API działa poprawnie'})

# =============================================================================
# ADMIN API - ZARZĄDZANIE MENU
# =============================================================================


@app.route('/api/admin/categories', methods=['GET'])
def get_categories():
    """Pobiera wszystkie kategorie"""
    try:
        categories = menu_manager.get_categories()
        return jsonify(categories)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/menu-items', methods=['GET'])
def get_menu_items_admin():
    """Pobiera wszystkie dania (admin)"""
    try:
        category_id = request.args.get('category_id', type=int)
        items = menu_manager.get_menu_items(category_id)
        return jsonify(items)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/menu-items', methods=['POST'])
def add_menu_item():
    """Dodaje nowe danie"""
    try:
        data = request.get_json()
        
        # Walidacja
        required_fields = ['name', 'description', 'price', 'category_id']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Pole {field} jest wymagane'}), 400
        
        item_id = menu_manager.add_menu_item(data)
        return jsonify({'message': 'Danie zostało dodane', 'id': item_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/menu-items/<int:item_id>', methods=['PUT'])
def update_menu_item(item_id):
    """Aktualizuje istniejące danie"""
    try:
        data = request.get_json()
        
        if menu_manager.update_menu_item(item_id, data):
            return jsonify({'message': 'Danie zostało zaktualizowane'})
        else:
            return jsonify({'error': 'Danie nie zostało znalezione'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/menu-items/<int:item_id>', methods=['DELETE'])
def delete_menu_item(item_id):
    """Usuwa danie"""
    try:
        if menu_manager.delete_menu_item(item_id):
            return jsonify({'message': 'Danie zostało usunięte'})
        else:
            return jsonify({'error': 'Danie nie zostało znalezione'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============================================================================
# ADMIN API - WIADOMOŚCI
# =============================================================================


@app.route('/api/admin/messages', methods=['GET'])
def get_contact_messages():
    """Pobiera wiadomości kontaktowe"""
    try:
        unread_only = request.args.get('unread_only', 'false').lower() == 'true'
        messages = contact_manager.get_messages(unread_only)
        return jsonify(messages)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/messages/<int:message_id>/read', methods=['PUT'])
def mark_message_read(message_id):
    """Oznacza wiadomość jako przeczytaną"""
    try:
        if contact_manager.mark_as_read(message_id):
            return jsonify({'message': 'Wiadomość oznaczona jako przeczytana'})
        else:
            return jsonify({'error': 'Wiadomość nie została znaleziona'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============================================================================
# ADMIN API - USTAWIENIA
# =============================================================================


@app.route('/api/admin/settings', methods=['GET'])
def get_settings():
    """Pobiera ustawienia strony"""
    try:
        settings = settings_manager.get_settings()
        return jsonify(settings)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/settings', methods=['PUT'])
def update_settings():
    """Aktualizuje ustawienia strony"""
    try:
        data = request.get_json()
        settings_manager.update_multiple_settings(data)
        return jsonify({'message': 'Ustawienia zostały zaktualizowane'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============================================================================
# MAIN
# =============================================================================


if __name__ == '__main__':
    # Tworzenie folderu static jeśli nie istnieje
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Uruchomienie w trybie development
    app.run(debug=True, host='127.0.0.1', port=5000)
