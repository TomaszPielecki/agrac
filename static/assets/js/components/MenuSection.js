// Komponent dla pojedynczej karty menu
const MenuCard = ({ section, index }) => {
    if (!section) return null;
    
    // Sprawdź czy to kategoria z obrazkiem menu (cena = 0)
    const isMenuCategory = section.items?.some(item => item.price === 0 || item.price === '0.00 zł');
    
    // Lazy loading dla obrazków
    const [imageLoaded, setImageLoaded] = React.useState(false);
    
    if (isMenuCategory && section.items?.[0]) {
        const item = section.items[0];
        
        return (
            <article 
                className="card-hover bg-white rounded-xl shadow-warm overflow-hidden group transition-all duration-300 hover:shadow-2xl fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <a 
                    href={`/menu/${section.id}`}
                    className="block"
                    aria-label={`Zobacz menu: ${section.title}`}
                >
                    {/* Obrazek kategorii */}
                    <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="spinner"></div>
                            </div>
                        )}
                        <img 
                            src={item.image} 
                            alt={`Menu kategorii: ${section.title}`}
                            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                            onError={(e) => {
                                e.target.src = '/static/assets/images/placeholder.jpg';
                                setImageLoaded(true);
                            }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        
                        {/* Nazwa kategorii na obrazku */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1 drop-shadow-lg">
                                {section.title}
                            </h3>
                        </div>
                        
                        {/* Ikona hover */}
                        <div className="absolute top-4 right-4 bg-white/90 rounded-full p-3 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                            <i className="fas fa-arrow-right text-pastel-orange text-lg" aria-hidden="true"></i>
                        </div>
                    </div>
                    
                    {/* Stopka karty */}
                    <div className="p-4 md:p-5 bg-gradient-to-br from-warm-beige/30 to-white">
                        <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2">
                            {section.description || 'Zobacz nasze specjały z tradycyjnej kuchni kaukaskiej'}
                        </p>
                        <div className="flex items-center text-pastel-orange font-semibold text-sm md:text-base group-hover:text-golden transition-colors">
                            <span>Zobacz menu</span>
                            <i className="fas fa-chevron-right ml-2 transform group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
                        </div>
                    </div>
                </a>
            </article>
        );
    }
    
    // Dla kategorii z listą pozycji (np. Napoje)
    return (
        <article 
            className="card-hover bg-white rounded-xl shadow-warm p-6 fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <h3 className="text-2xl font-display font-bold text-warm-brown mb-4">{section.title}</h3>
            <p className="text-gray-600 mb-4">{section.description}</p>
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {section.items?.map((item, itemIndex) => (
                    <div key={`${section.id}-item-${itemIndex}`} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                        <div className="flex-1">
                            <h4 className="font-semibold text-warm-brown">{item.name}</h4>
                            {item.description && (
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            )}
                        </div>
                        <span className="text-lg font-bold text-pastel-orange ml-4">{item.price}</span>
                    </div>
                ))}
            </div>
        </article>
    );
};

const MenuSection = ({ section }) => {
    if (!section) return null;
    
    // Sprawdź czy to kategoria z obrazkiem menu (cena = 0)
    const isMenuCategory = section.items?.some(item => item.price === 0 || item.price === '0.00 zł');
    
    return (
        <section id={section.id} className="py-16 bg-soft-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 fade-in">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-warm-brown mb-4">
                        {section.title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {section.description}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-pastel-orange to-golden mx-auto mt-6"></div>
                </div>
                
                {/* Menu Items - karty kategorii lub lista z cenami */}
                {isMenuCategory ? (
                    // Karty kategorii menu w gridzie
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {section.items?.map((item, index) => (
                            <a 
                                key={`menu-${index}`}
                                href={`/menu/${section.id}`}
                                className="card-hover bg-white rounded-xl shadow-warm overflow-hidden group transition-all duration-300 hover:shadow-2xl"
                            >
                                {/* Obrazek kategorii */}
                                <div className="relative h-48 md:h-56 overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                    
                                    {/* Nazwa kategorii na obrazku */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                                        <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1 drop-shadow-lg">
                                            {section.title}
                                        </h3>
                                    </div>
                                    
                                    {/* Ikona hover */}
                                    <div className="absolute top-4 right-4 bg-white/90 rounded-full p-3 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                                        <i className="fas fa-arrow-right text-pastel-orange text-lg"></i>
                                    </div>
                                </div>
                                
                                {/* Stopka karty */}
                                <div className="p-4 md:p-5 bg-gradient-to-br from-warm-beige/30 to-white">
                                    <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2">
                                        {section.description || 'Zobacz nasze specjały z tradycyjnej kuchni kaukaskiej'}
                                    </p>
                                    <div className="flex items-center text-pastel-orange font-semibold text-sm md:text-base group-hover:text-golden transition-colors">
                                        <span>Zobacz menu</span>
                                        <i className="fas fa-chevron-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    // Lista pozycji z cenami (dla Napoje) - responsywna
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-warm p-4 md:p-8">
                        <div className="space-y-2 md:space-y-3">
                            {section.items?.map((item, index) => (
                                <div key={`drink-${index}`} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-200 last:border-0 gap-2">
                                    <div className="flex-1">
                                        <h4 className="text-base md:text-lg font-semibold text-warm-brown">{item.name}</h4>
                                        {item.description && (
                                            <p className="text-xs md:text-sm text-gray-600 mt-1">{item.description}</p>
                                        )}
                                    </div>
                                    <span className="text-lg md:text-xl font-bold text-pastel-orange sm:ml-4">{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const MenuSections = ({ menuData }) => {
    if (!menuData?.sections) {
        return (
            <div className="py-16 text-center">
                <div className="spinner mx-auto mb-4"></div>
                <p className="text-gray-600">Ładowanie menu...</p>
            </div>
        );
    }
    
    return (
        <section className="py-16 bg-soft-white" id="menu">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Główny nagłówek sekcji menu */}
                <div className="text-center mb-12 fade-in">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-warm-brown mb-4">
                        Nasze Menu
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Odkryj autentyczne smaki kuchni ormiańsko-gruzińskiej. Każde danie przygotowywane jest ze świeżych składników według tradycyjnych receptur.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-pastel-orange to-golden mx-auto mt-6"></div>
                </div>
                
                {/* Grid kategorii menu - wszystkie obok siebie */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {menuData.sections.map((section, index) => (
                        <MenuCard key={section.id || `menu-${index}`} section={section} index={index} />
                    ))}
                </div>
                
                {/* CTA - Zachęta do zamówienia */}
                <div className="text-center mt-12 fade-in">
                    <p className="text-lg text-gray-600 mb-6">
                        Nie możesz się zdecydować? Zadzwoń do nas, a pomożemy wybrać idealne danie!
                    </p>
                    <a 
                        href="tel:+48501839411"
                        className="inline-flex items-center btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
                        aria-label="Zadzwoń do restauracji Aragac"
                    >
                        <i className="fas fa-phone-alt mr-3"></i>
                        <span>Zadzwoń: 501 839 411</span>
                    </a>
                </div>
            </div>
        </section>
    );
};