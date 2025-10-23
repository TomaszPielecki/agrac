const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    
    return (
        <header className="bg-soft-white shadow-warm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#home">
                            <img 
                                src="/static/assets/images/logo.jpg" 
                                alt="Aragac - Kuchnia Ormiańsko-Gruzińska" 
                                className="h-12 w-auto rounded-lg"
                                style={{ maxHeight: '48px' }}
                            />
                        </a>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="#home" className="text-warm-brown hover:text-pastel-orange transition-colors px-3 py-2 rounded-md text-sm font-medium">
                                Strona główna
                            </a>
                            <a href="#menu" className="text-warm-brown hover:text-pastel-orange transition-colors px-3 py-2 rounded-md text-sm font-medium">
                                Menu
                            </a>
                            <a href="#promocje" className="text-warm-brown hover:text-pastel-orange transition-colors px-3 py-2 rounded-md text-sm font-medium">
                                <i className="fas fa-tag mr-1"></i> Promocje
                            </a>
                            <a href="#galeria" className="text-warm-brown hover:text-pastel-orange transition-colors px-3 py-2 rounded-md text-sm font-medium">
                                <i className="fas fa-images mr-1"></i> Galeria
                            </a>
                            <a href="/o-nas" className="text-warm-brown hover:text-pastel-orange transition-colors px-3 py-2 rounded-md text-sm font-medium">
                                O nas
                            </a>
                            <a href="#kontakt" className="text-warm-brown hover:text-pastel-orange transition-colors px-3 py-2 rounded-md text-sm font-medium">
                                Kontakt
                            </a>
                        </div>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-warm-brown hover:text-pastel-orange p-2"
                        >
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-warm-beige rounded-lg mt-2">
                            <a href="#home" className="block text-warm-brown hover:text-pastel-orange px-3 py-2 rounded-md text-base font-medium">
                                Strona główna
                            </a>
                            <a href="#menu" className="block text-warm-brown hover:text-pastel-orange px-3 py-2 rounded-md text-base font-medium">
                                Menu
                            </a>
                            <a href="#promocje" className="block text-warm-brown hover:text-pastel-orange px-3 py-2 rounded-md text-base font-medium">
                                <i className="fas fa-tag mr-2"></i> Promocje
                            </a>
                            <a href="#galeria" className="block text-warm-brown hover:text-pastel-orange px-3 py-2 rounded-md text-base font-medium">
                                <i className="fas fa-images mr-2"></i> Galeria
                            </a>
                            <a href="/o-nas" className="block text-warm-brown hover:text-pastel-orange px-3 py-2 rounded-md text-base font-medium">
                                O nas
                            </a>
                            <a href="#kontakt" className="block text-warm-brown hover:text-pastel-orange px-3 py-2 rounded-md text-base font-medium">
                                Kontakt
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};