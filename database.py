"""
Modele bazy danych dla aplikacji Aragac
"""

import sqlite3
import os
from datetime import datetime
from typing import List, Optional, Dict, Any


class Database:
    """Klasa do zarządzania bazą danych SQLite"""
    
    def __init__(self, db_path: str="aragac.db"):
        self.db_path = db_path
        self.init_database()
    
    def get_connection(self):
        """Zwraca połączenie z bazą danych"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row  # Umożliwia dostęp do kolumn po nazwie
        return conn
    
    def init_database(self):
        """Inicjalizuje tabele w bazie danych"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            # Tabela kategorii menu
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL UNIQUE,
                    description TEXT,
                    slug TEXT NOT NULL UNIQUE,
                    order_index INTEGER DEFAULT 0,
                    is_active BOOLEAN DEFAULT 1,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Tabela dań
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS menu_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT,
                    price DECIMAL(10,2) NOT NULL,
                    category_id INTEGER NOT NULL,
                    image_url TEXT,
                    ingredients TEXT,
                    allergens TEXT,
                    is_vegetarian BOOLEAN DEFAULT 0,
                    is_vegan BOOLEAN DEFAULT 0,
                    is_gluten_free BOOLEAN DEFAULT 0,
                    is_spicy BOOLEAN DEFAULT 0,
                    is_popular BOOLEAN DEFAULT 0,
                    is_available BOOLEAN DEFAULT 1,
                    order_index INTEGER DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (category_id) REFERENCES categories (id)
                )
            ''')
            
            # Tabela ustawień strony
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS site_settings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    key TEXT NOT NULL UNIQUE,
                    value TEXT,
                    description TEXT,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Tabela wiadomości kontaktowych
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    phone TEXT,
                    message TEXT NOT NULL,
                    is_read BOOLEAN DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            conn.commit()
            self._insert_default_data()
    
    def _insert_default_data(self):
        """Wstawia przykładowe dane jeśli baza jest pusta"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            # Sprawdź czy są już kategorie
            cursor.execute("SELECT COUNT(*) FROM categories")
            if cursor.fetchone()[0] == 0:
                # Dodaj domyślne kategorie
                categories = [
                    ("Dania z grilla", "Aromatyczne mięsa i warzywa grillowane na węglu", "dania-z-grilla", 1),
                    ("Wypieki", "Świeże pieczywo i tradycyjne wypieki", "wypieki", 2),
                    ("Zupy", "Tradycyjne armeńskie zupy", "zupy", 3),
                    ("Desery", "Słodkie zakończenie posiłku", "desery", 4)
                ]
                
                cursor.executemany('''
                    INSERT INTO categories (name, description, slug, order_index)
                    VALUES (?, ?, ?, ?)
                ''', categories)
                
                # Dodaj przykładowe dania
                menu_items = [
                    # Dania z grilla (category_id = 1)
                    ("Khorovats", "Tradycyjny armeński szaszłyk z baraniny marinowany w winie i ziołach", 45.00, 1, "/api/static/khorovats.jpg", "baranina, cebula, przyprawy", "brak", 0, 0, 1, 1, 1, 1, 1),
                    ("Dolma", "Liście winogron nadziewane ryżem, mięsem i aromatycznymi ziołami", 32.00, 1, "/api/static/dolma.jpg", "liście winogron, ryż, mięso mielone", "brak", 0, 0, 1, 0, 1, 1, 2),
                    ("Khash", "Tradycyjna armeńska zupa z golonki wołowej", 28.00, 1, "/api/static/khash.jpg", "golonka wołowa, czosnek, przyprawy", "brak", 0, 0, 1, 0, 0, 1, 3),
                    
                    # Wypieki (category_id = 2)
                    ("Lahmadżo", "Cienka placka z mięsem, warzywami i tradycyjnymi przyprawami", 28.00, 2, "/api/static/lahmadzo.jpg", "mąka, mięso mielone, pomidory", "gluten", 0, 0, 0, 1, 1, 1, 1),
                    ("Lavash", "Tradycyjny armeński chleb pieczony w piecu", 12.00, 2, "/api/static/lavash.jpg", "mąka, woda, sól", "gluten", 1, 1, 0, 0, 0, 1, 2),
                    ("Gata", "Słodkie ciasto z nadzieniem orzechowym", 18.00, 2, "/api/static/gata.jpg", "mąka, orzechy, masło, cukier", "gluten, orzechy, lakto", 1, 0, 0, 0, 0, 1, 3),
                ]
                
                cursor.executemany('''
                    INSERT INTO menu_items (name, description, price, category_id, image_url, ingredients, allergens, is_vegetarian, is_vegan, is_gluten_free, is_spicy, is_popular, is_available, order_index)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', menu_items)
                
                # Dodaj domyślne ustawienia strony
                settings = [
                    ("site_title", "Aragac - Kuchnia Ormiańsko-Gruzińska", "Tytuł strony"),
                    ("site_subtitle", "Kuchnia Ormiańsko-Gruzińska", "Podtytuł strony"),
                    ("site_description", "Zapraszamy na wyjątkowe smaki kuchni ormiańsko-gruzińskiej. Odkryj aromaty Kaukazu w Kartuzach!", "Opis strony"),
                    ("restaurant_name", "Aragac", "Nazwa restauracji"),
                    ("restaurant_address", "ul. Kościuszki 27, 83-300 Kartuzy", "Adres restauracji"),
                    ("restaurant_phone", "501 839 411", "Telefon restauracji"),
                    ("restaurant_email", "aragac.arm@gmail.com", "Email restauracji"),
                    ("hours_daily", "10:00-21:00", "Godziny otwarcia codziennie"),
                    ("facebook_url", "https://www.facebook.com/profile.php?id=61563066510136", "Link do Facebook"),
                    ("instagram_url", "https://www.instagram.com/aragac_arm", "Link do Instagram"),
                    ("website_url", "https://aragac.pl", "Strona internetowa"),
                ]
                
                cursor.executemany('''
                    INSERT INTO site_settings (key, value, description)
                    VALUES (?, ?, ?)
                ''', settings)
                
                conn.commit()


class MenuManager:
    """Klasa do zarządzania menu"""
    
    def __init__(self, db: Database):
        self.db = db
    
    def get_all_menu_data(self) -> Dict[str, Any]:
        """Zwraca wszystkie dane menu dla API"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            
            # Pobierz ustawienia strony
            cursor.execute("SELECT key, value FROM site_settings")
            settings = {row['key']: row['value'] for row in cursor.fetchall()}
            
            # Pobierz kategorie z daniami
            cursor.execute('''
                SELECT c.*, COUNT(m.id) as items_count
                FROM categories c
                LEFT JOIN menu_items m ON c.id = m.category_id AND m.is_available = 1
                WHERE c.is_active = 1
                GROUP BY c.id
                ORDER BY c.order_index
            ''')
            categories = cursor.fetchall()
            
            sections = []
            for category in categories:
                # Pobierz dania dla tej kategorii
                cursor.execute('''
                    SELECT * FROM menu_items
                    WHERE category_id = ? AND is_available = 1
                    ORDER BY order_index, name
                ''', (category['id'],))
                items = cursor.fetchall()
                
                section = {
                    'id': category['slug'],
                    'title': category['name'],
                    'description': category['description'],
                    'items': [{
                        'name': item['name'],
                        'description': item['description'],
                        'price': f"{item['price']:.2f} zł",
                        'image': item['image_url'],
                        'ingredients': item['ingredients'],
                        'allergens': item['allergens'],
                        'is_vegetarian': bool(item['is_vegetarian']),
                        'is_vegan': bool(item['is_vegan']),
                        'is_gluten_free': bool(item['is_gluten_free']),
                        'is_spicy': bool(item['is_spicy']),
                        'is_popular': bool(item['is_popular'])
                    } for item in items]
                }
                sections.append(section)
            
            return {
                'hero': {
                    'title': settings.get('site_title', 'Aragac'),
                    'subtitle': settings.get('site_subtitle', 'Autentyczna Kuchnia Armeńska'),
                    'description': settings.get('site_description', 'Tradycyjne dania...')
                },
                'sections': sections,
                'contact': {
                    'name': settings.get('restaurant_name', 'Aragac'),
                    'address': settings.get('restaurant_address', ''),
                    'phone': settings.get('restaurant_phone', ''),
                    'email': settings.get('restaurant_email', ''),
                    'hours': {
                        'mon_thu': settings.get('hours_mon_thu', ''),
                        'fri_sat': settings.get('hours_fri_sat', ''),
                        'sun': settings.get('hours_sun', '')
                    },
                    'social': {
                        'facebook': settings.get('facebook_url', ''),
                        'instagram': settings.get('instagram_url', '')
                    }
                }
            }
    
    def get_categories(self) -> List[Dict]:
        """Zwraca wszystkie kategorie"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM categories ORDER BY order_index")
            return [dict(row) for row in cursor.fetchall()]
    
    def get_menu_items(self, category_id: Optional[int]=None) -> List[Dict]:
        """Zwraca dania menu, opcjonalnie filtrowane po kategorii"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            
            if category_id:
                cursor.execute('''
                    SELECT m.*, c.name as category_name
                    FROM menu_items m
                    JOIN categories c ON m.category_id = c.id
                    WHERE m.category_id = ?
                    ORDER BY m.order_index, m.name
                ''', (category_id,))
            else:
                cursor.execute('''
                    SELECT m.*, c.name as category_name
                    FROM menu_items m
                    JOIN categories c ON m.category_id = c.id
                    ORDER BY c.order_index, m.order_index, m.name
                ''')
            
            return [dict(row) for row in cursor.fetchall()]
    
    def add_menu_item(self, data: Dict) -> int:
        """Dodaje nowe danie do menu"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO menu_items (name, description, price, category_id, image_url, ingredients, allergens, is_vegetarian, is_vegan, is_gluten_free, is_spicy, is_popular, is_available, order_index)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                data['name'], data['description'], data['price'], data['category_id'],
                data.get('image_url', ''), data.get('ingredients', ''), data.get('allergens', ''),
                data.get('is_vegetarian', False), data.get('is_vegan', False), data.get('is_gluten_free', False),
                data.get('is_spicy', False), data.get('is_popular', False), data.get('is_available', True),
                data.get('order_index', 0)
            ))
            conn.commit()
            return cursor.lastrowid
    
    def update_menu_item(self, item_id: int, data: Dict) -> bool:
        """Aktualizuje istniejące danie"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                UPDATE menu_items SET
                    name = ?, description = ?, price = ?, category_id = ?,
                    image_url = ?, ingredients = ?, allergens = ?,
                    is_vegetarian = ?, is_vegan = ?, is_gluten_free = ?,
                    is_spicy = ?, is_popular = ?, is_available = ?,
                    order_index = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            ''', (
                data['name'], data['description'], data['price'], data['category_id'],
                data.get('image_url', ''), data.get('ingredients', ''), data.get('allergens', ''),
                data.get('is_vegetarian', False), data.get('is_vegan', False), data.get('is_gluten_free', False),
                data.get('is_spicy', False), data.get('is_popular', False), data.get('is_available', True),
                data.get('order_index', 0), item_id
            ))
            conn.commit()
            return cursor.rowcount > 0
    
    def delete_menu_item(self, item_id: int) -> bool:
        """Usuwa danie z menu"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM menu_items WHERE id = ?", (item_id,))
            conn.commit()
            return cursor.rowcount > 0


class ContactManager:
    """Klasa do zarządzania wiadomościami kontaktowymi"""
    
    def __init__(self, db: Database):
        self.db = db
    
    def save_message(self, data: Dict) -> int:
        """Zapisuje wiadomość kontaktową"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO contact_messages (name, email, phone, message)
                VALUES (?, ?, ?, ?)
            ''', (data['name'], data['email'], data.get('phone', ''), data['message']))
            conn.commit()
            return cursor.lastrowid
    
    def get_messages(self, unread_only: bool=False) -> List[Dict]:
        """Pobiera wiadomości kontaktowe"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            
            if unread_only:
                cursor.execute("SELECT * FROM contact_messages WHERE is_read = 0 ORDER BY created_at DESC")
            else:
                cursor.execute("SELECT * FROM contact_messages ORDER BY created_at DESC")
            
            return [dict(row) for row in cursor.fetchall()]
    
    def mark_as_read(self, message_id: int) -> bool:
        """Oznacza wiadomość jako przeczytaną"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE contact_messages SET is_read = 1 WHERE id = ?", (message_id,))
            conn.commit()
            return cursor.rowcount > 0


class SettingsManager:
    """Klasa do zarządzania ustawieniami strony"""
    
    def __init__(self, db: Database):
        self.db = db
    
    def get_settings(self) -> Dict[str, str]:
        """Pobiera wszystkie ustawienia"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT key, value FROM site_settings")
            return {row['key']: row['value'] for row in cursor.fetchall()}
    
    def update_setting(self, key: str, value: str) -> bool:
        """Aktualizuje pojedyncze ustawienie"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT OR REPLACE INTO site_settings (key, value, updated_at)
                VALUES (?, ?, CURRENT_TIMESTAMP)
            ''', (key, value))
            conn.commit()
            return cursor.rowcount > 0
    
    def update_multiple_settings(self, settings: Dict[str, str]) -> bool:
        """Aktualizuje wiele ustawień jednocześnie"""
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            for key, value in settings.items():
                cursor.execute('''
                    INSERT OR REPLACE INTO site_settings (key, value, updated_at)
                    VALUES (?, ?, CURRENT_TIMESTAMP)
                ''', (key, value))
            conn.commit()
            return True


# Globalne instancje
db = Database()
menu_manager = MenuManager(db)
contact_manager = ContactManager(db)
settings_manager = SettingsManager(db)
