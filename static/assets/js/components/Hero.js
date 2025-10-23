const Hero = ({ heroData }) => {
    return (
        <section id="home" className="relative bg-gradient-to-br from-warm-beige to-soft-white min-h-screen flex items-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="fade-in">
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-warm-brown mb-6 leading-tight">
                            {heroData?.title || "Witamy w świecie smaków Armenii i Gruzji"}
                        </h1>
                        <h2 className="text-xl md:text-2xl text-pastel-orange mb-6 font-medium">
                            {heroData?.subtitle || "Kuchnia Ormiańsko-Gruzińska"}
                        </h2>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            {heroData?.description || "Odkryj aromatyczne khinkali, soczyste kebaby i bogactwo ormiańskich chaczapuri"}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#dania-prosto-z-ognia" className="btn-primary text-white px-8 py-3 rounded-lg font-medium text-center">
                                <i className="fas fa-fire mr-2"></i>
                                Zobacz Menu
                            </a>
                            <a href="#kontakt" className="border-2 border-warm-brown text-warm-brown px-8 py-3 rounded-lg font-medium text-center hover:bg-warm-brown hover:text-white transition-all">
                                <i className="fas fa-phone mr-2"></i>
                                Kontakt
                            </a>
                        </div>
                    </div>
                    
                    {/* Hero Image */}
                    <div className="slide-in-left">
                        <div className="relative">
                            <img 
                                src="/static/assets/images/banner.jpg" 
                                alt="Aragac - Kuchnia Ormiańsko-Gruzińska"
                                className="img-responsive rounded-2xl shadow-warm-lg w-full h-96 object-cover"
                            />
                            
                            {/* Floating Cards */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-warm hidden md:block">
                                <div className="flex items-center">
                                    <i className="fas fa-star text-golden text-xl mr-2"></i>
                                    <div>
                                        <p className="font-semibold text-warm-brown">100% Autentyczne</p>
                                        <p className="text-sm text-gray-600">Rodzinne receptury</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-warm hidden md:block">
                                <div className="flex items-center">
                                    <i className="fas fa-clock text-pastel-orange text-xl mr-2"></i>
                                    <div>
                                        <p className="font-semibold text-warm-brown">Codziennie otwarte</p>
                                        <p className="text-sm text-gray-600">10:00 - 21:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};