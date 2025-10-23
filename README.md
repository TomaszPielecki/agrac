# 🍽️ Aragac - Restauracja Kuchni Ormiańsko-Gruzińskiej

> Profesjonalna strona internetowa restauracji z autentyczną kuchnią kaukaską w Kartuzach.

**⚠️ Uwaga:** To jest projekt demo/portfolio. Dane kontaktowe restauracji są publiczne i udostępnione za zgodą właścicieli w celach prezentacyjnych.

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Spis Treści

- [O Projekcie](#o-projekcie)
- [Funkcje](#funkcje)
- [Technologie](#technologie)
- [Instalacja](#instalacja)
- [Uruchomienie](#uruchomienie)
- [Struktura Projektu](#struktura-projektu)
- [Deployment](#deployment)
- [SEO](#seo)
- [Kontakt](#kontakt)

## 🎯 O Projekcie

Aragac to nowoczesna strona internetowa restauracji kuchni ormiańsko-gruzińskiej w Kartuzach. Projekt łączy tradycyjne smaki Kaukazu z nowoczesnym designem i funkcjonalnościami webowymi.

### 🌟 Najważniejsze Cechy

- ✅ **Responsywny design** - działa idealnie na desktop, tablet i mobile
- ✅ **SEO zoptymalizowane** - Schema.org, Open Graph, Twitter Cards
- ✅ **PWA Ready** - manifest.json, może działać jako aplikacja
- ✅ **Galeria dań** - 15 autentycznych dań z filtrami (ormiańskie/gruzińskie)
- ✅ **Sekcja promocji** - dynamiczne karty z aktualnymi ofertami
- ✅ **Formularz kontaktowy** - z walidacją i sanityzacją danych
- ✅ **Google Maps** - integracja z mapą dojazdu
- ✅ **Security headers** - CSP, XSS Protection, CORS

## 🚀 Funkcje

### 🏠 Strona Główna
- Hero section z CTA
- Sekcja Nowości i Promocje (4 oferty)
- Karty menu (6 kategorii w gridzie)
- Galeria dań (15 pozycji z lightbox)
- Formularz kontaktowy
- Mapa dojazdu w stopce

### 📱 Menu
- Dania prosto z ognia
- Wypieki / Lahmadżo
- Zupy
- Khinkali i Tolma
- Desery i dodatki
- Napoje (12 pozycji z cenami)

### 🎨 Promocje
- Lunch biznesowy (35 zł)
- Nowość: Khachapuri po ajarsku (28 zł)
- Happy Hour: Lemoniady -20% (12 zł)
- Vouchery prezentowe (od 50 zł)

### 🖼️ Galeria
- Filtry: Wszystkie / Ormiańskie 🇦🇲 / Gruzińskie 🇬🇪
- Lightbox do powiększania zdjęć
- Wysokiej jakości zdjęcia z Unsplash
- Lazy loading obrazków

## 🛠️ Technologie

### Backend
- **Python 3.11+**
- **Flask 2.3.3** - framework webowy
- **Flask-CORS** - obsługa CORS
- **SQLite3** - baza danych (do zmiany na PostgreSQL w produkcji)

### Frontend
- **React 18** (CDN) - komponenty UI
- **Tailwind CSS** (CDN) - styling
- **Font Awesome 6.4** - ikony
- **Google Fonts** - Playfair Display, Inter
- **Babel Standalone** - transpilacja JSX

### SEO & Performance
- **Schema.org** - structured data (Restaurant, BreadcrumbList)
- **Open Graph** - Facebook/LinkedIn
- **Twitter Cards** - Twitter
- **Sitemap.xml** - mapa strony
- **Robots.txt** - instrukcje dla botów
- **Manifest.json** - PWA support

## 📦 Instalacja

### Wymagania
- Python 3.11 lub nowszy
- pip (menedżer pakietów Python)
- Git

### Kroki instalacji

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/TomaszPielecki/agrac.git
cd agrac

# 2. Utwórz wirtualne środowisko
python -m venv venv

# 3. Aktywuj środowisko
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 4. Zainstaluj zależności
pip install -r requirements.txt

# 5. Utwórz plik .env (opcjonalnie)
echo "FLASK_ENV=development" > .env
echo "SECRET_KEY=twoj-sekretny-klucz" >> .env
```

## 🎮 Uruchomienie

### Tryb Development

```bash
# Aktywuj środowisko (jeśli nieaktywne)
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Uruchom aplikację
python app.py
```

Aplikacja będzie dostępna pod adresem: **http://127.0.0.1:5000**

### Tryb Production

```bash
# Zainstaluj gunicorn
pip install gunicorn

# Uruchom z gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## 📁 Struktura Projektu

```
agrac/
├── app.py                          # Główna aplikacja Flask
├── database.py                     # Modele bazy danych
├── update_menu.py                  # Script do aktualizacji menu
├── requirements.txt                # Zależności Python
├── package.json                    # Zależności npm (Tailwind)
├── tailwind.config.js             # Konfiguracja Tailwind
├── README.md                       # Ten plik
├── .gitignore                      # Git ignore
│
├── static/                         # Pliki statyczne
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css           # Główne style
│   │   │   └── tailwind.css       # Tailwind input
│   │   ├── images/
│   │   │   ├── logo.jpg           # Logo restauracji
│   │   │   ├── banner.jpg         # Banner hero
│   │   │   └── *.jpg              # Zdjęcia menu
│   │   └── js/
│   │       ├── components/        # Komponenty React
│   │       │   ├── Header.js
│   │       │   ├── Hero.js
│   │       │   ├── MenuSection.js
│   │       │   ├── PromotionsSection.js
│   │       │   ├── GallerySection.js
│   │       │   ├── ContactForm.js
│   │       │   └── Footer.js
│   │       ├── app.js             # Główny komponent App
│   │       └── main.js            # Utilities
│   ├── robots.txt                 # SEO - instrukcje dla botów
│   ├── sitemap.xml                # SEO - mapa strony
│   └── manifest.json              # PWA manifest
│
├── templates/                      # Szablony HTML
│   ├── index.html                 # Strona główna
│   ├── about.html                 # O nas
│   ├── menu.html                  # Podstrony menu
│   └── admin.html                 # Panel admin
│
└── restaurant.db                   # Baza danych SQLite
```

## 🌐 Deployment

### Railway.app (Zalecane)

```bash
# 1. Dodaj Procfile
echo "web: gunicorn app:app" > Procfile

# 2. Dodaj runtime.txt
echo "python-3.11.5" > runtime.txt

# 3. Push na GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main

# 4. Połącz Railway.app z GitHub
# 5. Deploy automatyczny! 🚀
```

### Heroku

```bash
# 1. Zainstaluj Heroku CLI
# 2. Login
heroku login

# 3. Utwórz aplikację
heroku create aragac-kartuzy

# 4. Deploy
git push heroku main

# 5. Otwórz
heroku open
```

### Render.com

1. Połącz repo GitHub z Render
2. Wybierz "Web Service"
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `gunicorn app:app`
5. Deploy! 🎉

## 🔒 Bezpieczeństwo

- ✅ **CSP Headers** - Content Security Policy
- ✅ **CORS** - poprawna konfiguracja
- ✅ **XSS Protection** - nagłówki bezpieczeństwa
- ✅ **Sanityzacja formularzy** - regex validation
- ✅ **Rate limiting** - gotowy decorator (do aktywacji)
- ✅ **HTTPS ready** - canonical URLs

## 📊 SEO

### Meta Tagi
- **Title**: 57 znaków (✅ optymalny)
- **Description**: 150 znaków (✅ optymalny)
- **Keywords**: tematyczne
- **Geo tags**: Kartuzy, współrzędne GPS

### Structured Data
- **Restaurant Schema** - pełne dane kontaktowe
- **BreadcrumbList** - nawigacja
- **LocalBusiness** - dane firmy

### Pliki SEO
- `robots.txt` - /admin zablokowany
- `sitemap.xml` - 7 stron z obrazkami
- `manifest.json` - PWA

### Wynik SEO: **95+/100** 🎯

## 🎨 Kolory Marki

```css
--warm-beige: #F5F5DC;
--warm-brown: #8B7355;
--pastel-orange: #E6B17A;
--golden: #D4A574;
--soft-white: #FEFEFE;
```

## 📞 Kontakt

**Restauracja Aragac**
- 📍 Adres: ul. Kościuszki 27, 83-300 Kartuzy
- ☎️ Telefon: [501 839 411](tel:+48501839411)
- 📧 Email: aragac.arm@gmail.com
- 🌐 Web: [aragac.pl](https://aragac.pl)
- 📱 Facebook: [Aragac](https://www.facebook.com/profile.php?id=61563066510136)
- 📷 Instagram: [@aragac_arm](https://www.instagram.com/aragac_arm)

**Godziny otwarcia:**
- Codziennie: 10:00 - 21:00

## 📝 Licencja

Copyright © 2025 Aragac.pl - Wszystkie prawa zastrzeżone

## 🤝 Contributing

Pull requesty są mile widziane! Dla większych zmian, proszę najpierw otwórz issue.

## 🙏 Podziękowania

- Zdjęcia: [Unsplash](https://unsplash.com)
- Ikony: [Font Awesome](https://fontawesome.com)
- Fonty: [Google Fonts](https://fonts.google.com)
- Framework: [Flask](https://flask.palletsprojects.com)
- UI: [React](https://reactjs.org) + [Tailwind CSS](https://tailwindcss.com)

---

**Zbudowano z ❤️ w Polsce dla smakoszy kuchni kaukaskiej** 🇵🇱🇦🇲🇬🇪
