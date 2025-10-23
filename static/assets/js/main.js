/**
 * Aragac - Main JavaScript File
 * Główny plik JavaScript dla aplikacji
 */

// Konfiguracja API
const API_BASE_URL = window.location.origin;

// Utility functions
const Utils = {
    // Bezpieczne wywołanie fetch z obsługą błędów
    async fetchAPI(url, options = {}) {
        try {
            const response = await fetch(`${API_BASE_URL}${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Pokazywanie powiadomień
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm`;
        
        const bgColor = {
            'success': 'bg-green-100 text-green-800 border border-green-200',
            'error': 'bg-red-100 text-red-800 border border-red-200',
            'warning': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
            'info': 'bg-blue-100 text-blue-800 border border-blue-200'
        };
        
        notification.className += ` ${bgColor[type]}`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    },

    // Formatowanie ceny
    formatPrice(price) {
        return `${parseFloat(price).toFixed(2)} zł`;
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Lazy loading obrazów
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    },

    // Smooth scroll do elementu
    smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    },

    // Walidacja email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Walidacja telefonu
    isValidPhone(phone) {
        const phoneRegex = /^(\+48\s?)?(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
};

// Loading manager
const LoadingManager = {
    show(element = document.body) {
        const loader = document.createElement('div');
        loader.className = 'loading-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        loader.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-lg text-center">
                <div class="spinner mx-auto mb-4"></div>
                <p class="text-gray-600">Ładowanie...</p>
            </div>
        `;
        element.appendChild(loader);
    },

    hide(element = document.body) {
        const loader = element.querySelector('.loading-overlay');
        if (loader) {
            loader.remove();
        }
    }
};

// Menu API
const MenuAPI = {
    async getMenu() {
        return await Utils.fetchAPI('/api/menu');
    },

    async sendContactMessage(data) {
        return await Utils.fetchAPI('/api/contact', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};

// Navigation handler
class NavigationHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupActiveLinks();
    }

    setupMobileMenu() {
        const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.contains('show');
                
                if (isOpen) {
                    mobileMenu.classList.remove('show');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                } else {
                    mobileMenu.classList.add('show');
                    mobileMenuButton.setAttribute('aria-expanded', 'true');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('show');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    Utils.smoothScrollTo(target);
                }
            });
        });
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-50px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
}

// Contact form handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.setupValidation();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', Utils.debounce(() => this.validateField(input), 300));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                isValid = Utils.isValidEmail(value);
                message = isValid ? '' : 'Podaj prawidłowy adres email';
                break;
            case 'tel':
                isValid = value === '' || Utils.isValidPhone(value);
                message = isValid ? '' : 'Podaj prawidłowy numer telefonu';
                break;
            default:
                if (field.required) {
                    isValid = value !== '';
                    message = isValid ? '' : 'To pole jest wymagane';
                }
        }

        this.showFieldValidation(field, isValid, message);
        return isValid;
    }

    showFieldValidation(field, isValid, message) {
        const errorElement = field.parentElement.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }

        if (!isValid && message) {
            const error = document.createElement('div');
            error.className = 'field-error text-red-600 text-sm mt-1';
            error.textContent = message;
            field.parentElement.appendChild(error);
            field.classList.add('border-red-300');
        } else {
            field.classList.remove('border-red-300');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };

        // Walidacja
        let isFormValid = true;
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            Utils.showNotification('Popraw błędy w formularzu', 'error');
            return;
        }

        try {
            LoadingManager.show();
            await MenuAPI.sendContactMessage(data);
            
            Utils.showNotification('Wiadomość została wysłana pomyślnie!', 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('Error sending message:', error);
            Utils.showNotification('Wystąpił błąd podczas wysyłania wiadomości', 'error');
        } finally {
            LoadingManager.hide();
        }
    }
}

// Scroll to top button
class ScrollToTopButton {
    constructor() {
        this.button = document.getElementById('scroll-to-top');
        if (this.button) {
            this.init();
        }
    }

    init() {
        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', Utils.debounce(() => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        }, 100));
    }
}

// Performance monitoring
const Performance = {
    measurePageLoad() {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    },

    measureAPI() {
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            const start = performance.now();
            return originalFetch(...args).then(response => {
                const end = performance.now();
                console.log(`API Call to ${args[0]} took ${end - start} ms`);
                return response;
            });
        };
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🍽️ Aragac App Initialized');
    
    // Initialize components
    new NavigationHandler();
    new ContactFormHandler();
    new ScrollToTopButton();
    
    // Initialize utilities
    Utils.initLazyLoading();
    
    // Performance monitoring (only in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        Performance.measurePageLoad();
        Performance.measureAPI();
    }
    
    // Global error handler
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        Utils.showNotification('Wystąpił nieoczekiwany błąd', 'error');
    });
});

// Expose utilities globally for React components
window.ArgeacUtils = Utils;
window.MenuAPI = MenuAPI;
window.LoadingManager = LoadingManager;