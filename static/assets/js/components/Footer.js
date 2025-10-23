const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-warm-brown text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo & Description */}
                    <div>
                        <h3 className="text-2xl font-display font-bold mb-4">Aragac</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Restauracja kuchni ormiańsko-gruzińskiej w Kartuzach. 
                            Autentyczne smaki Kaukazu - jedzenie na miejscu i na wynos.
                        </p>
                        <div className="flex space-x-4">
                            <a 
                                href="https://www.facebook.com/profile.php?id=61563066510136" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-pastel-orange hover:bg-golden p-3 rounded-lg transition-colors"
                            >
                                <i className="fab fa-facebook-f text-xl"></i>
                            </a>
                            <a 
                                href="https://www.instagram.com/aragac_arm" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-pastel-orange hover:bg-golden p-3 rounded-lg transition-colors"
                            >
                                <i className="fab fa-instagram text-xl"></i>
                            </a>
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Szybkie linki</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#home" className="text-gray-300 hover:text-white transition-colors">
                                    Strona główna
                                </a>
                            </li>
                            <li>
                                <a href="#menu" className="text-gray-300 hover:text-white transition-colors">
                                    Menu
                                </a>
                            </li>
                            <li>
                                <a href="#promocje" className="text-gray-300 hover:text-white transition-colors">
                                    <i className="fas fa-tag mr-2"></i> Promocje
                                </a>
                            </li>
                            <li>
                                <a href="#galeria" className="text-gray-300 hover:text-white transition-colors">
                                    <i className="fas fa-images mr-2"></i> Galeria
                                </a>
                            </li>
                            <li>
                                <a href="/o-nas" className="text-gray-300 hover:text-white transition-colors">
                                    O nas
                                </a>
                            </li>
                            <li>
                                <a href="#kontakt" className="text-gray-300 hover:text-white transition-colors">
                                    Kontakt
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
                        <div className="space-y-3 text-gray-300">
                            <div className="flex items-start">
                                <i className="fas fa-map-marker-alt mr-3 text-pastel-orange mt-1"></i>
                                <div>
                                    <div>ul. Kościuszki 27</div>
                                    <div>83-300 Kartuzy</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-phone mr-3 text-pastel-orange"></i>
                                <a href="tel:+48501839411" className="hover:text-white transition-colors">501 839 411</a>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-envelope mr-3 text-pastel-orange"></i>
                                <a href="mailto:aragac.arm@gmail.com" className="hover:text-white transition-colors">aragac.arm@gmail.com</a>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-clock mr-3 text-pastel-orange mt-1"></i>
                                <div>
                                    <div className="font-semibold">Codziennie</div>
                                    <div>10:00 - 21:00</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-globe mr-3 text-pastel-orange"></i>
                                <a href="https://aragac.pl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">aragac.pl</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Google Maps Section */}
                <div className="mt-12 pt-8 border-t border-gray-600">
                    <h4 className="text-lg font-semibold mb-6 text-center">Jak do nas dojechać?</h4>
                    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2322.8!2d18.1941!3d54.3383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd0b1e0e0e0e0e%3A0x0!2zS2_Fm2NpdXN6a2kgMjcsIDgzLTMwMCBLYXJ0dXp5!5e0!3m2!1spl!2spl!4v1234567890" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }}
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa dojazdu - Aragac Kartuzy"
                        ></iframe>
                    </div>
                    <div className="text-center mt-4">
                        <a 
                            href="https://www.google.com/maps/place/Ko%C5%9Bciuszki+27,+83-300+Kartuzy" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-pastel-orange hover:text-golden transition-colors text-sm"
                        >
                            <i className="fas fa-external-link-alt mr-2"></i>
                            Otwórz w Google Maps
                        </a>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="border-t border-gray-600 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-300 text-sm">
                            © {currentYear} Aragac.pl - Wszystkie prawa zastrzeżone
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                                Polityka prywatności
                            </a>
                            <a href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                                Regulamin
                            </a>
                            <a href="/cookies" className="text-gray-300 hover:text-white text-sm transition-colors">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Scroll to top button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 bg-pastel-orange hover:bg-golden text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-50"
                title="Powrót do góry"
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        </footer>
    );
};