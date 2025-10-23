// Komponent Galeria Dań
const GallerySection = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [filter, setFilter] = React.useState('all');

    const dishes = [
        {
            id: 1,
            name: "Khorovats",
            description: "Tradycyjny ormiański szaszłyk z baraniny grillowany na węglu",
            category: "ormianskie",
            image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80"
        },
        {
            id: 2,
            name: "Khinkali",
            description: "Gruzińskie pierożki z mięsem i aromatycznym sosem",
            category: "gruzinskie",
            image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80"
        },
        {
            id: 3,
            name: "Dolma",
            description: "Liście winogron nadziewane ryżem, mięsem i ziołami",
            category: "ormianskie",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
        },
        {
            id: 4,
            name: "Khachapuri Ajaruli",
            description: "Gruziński chlebek w kształcie łódki z serem suluguni i jajkiem",
            category: "gruzinskie",
            image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800&q=80"
        },
        {
            id: 5,
            name: "Lahmadżo",
            description: "Ormiańska cienka pizza z mięsem, warzywami i przyprawami",
            category: "ormianskie",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
        },
        {
            id: 6,
            name: "Chaczapuri po Imeruli",
            description: "Tradycyjny gruziński placek nadziewany serem",
            category: "gruzinskie",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
        },
        {
            id: 7,
            name: "Tolma",
            description: "Gołąbki po ormiańsku w liściach winogron z mięsem",
            category: "ormianskie",
            image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80"
        },
        {
            id: 8,
            name: "Lobio",
            description: "Gruzińska potrawa z czerwonej fasoli z orzechami i przyprawami",
            category: "gruzinskie",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
        },
        {
            id: 9,
            name: "Baklava",
            description: "Słodki deser z ciasta filo, orzechów włoskich i miodu",
            category: "ormianskie",
            image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&q=80"
        },
        {
            id: 10,
            name: "Pchali",
            description: "Gruzińska przekąska ze szpinaku z orzechami włoskimi",
            category: "gruzinskie",
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80"
        },
        {
            id: 11,
            name: "Basturma",
            description: "Suszone, przyprawione mięso wołowe - ormiańska wędlina",
            category: "ormianskie",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80"
        },
        {
            id: 12,
            name: "Chaczapuri Megruli",
            description: "Gruziński chlebek z serem wewnątrz i na wierzchu",
            category: "gruzinskie",
            image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=80"
        },
        {
            id: 13,
            name: "Kufta",
            description: "Ormiańskie klopsiki z mięsa wołowego z bulgurem",
            category: "ormianskie",
            image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80"
        },
        {
            id: 14,
            name: "Satsivi",
            description: "Gruzińska potrawa z kurczaka w sosie orzechowym",
            category: "gruzinskie",
            image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80"
        },
        {
            id: 15,
            name: "Gata",
            description: "Ormiańskie słodkie ciasto z masłem i nadzieniem",
            category: "ormianskie",
            image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80"
        },
    ];

    const filteredDishes = filter === 'all' 
        ? dishes 
        : dishes.filter(dish => dish.category === filter);

    return (
        <section id="galeria" className="py-16 bg-soft-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 fade-in">
                    <div className="inline-block bg-golden/20 text-golden px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i className="fas fa-camera mr-2"></i>
                        NASZE DANIA
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-warm-brown mb-4">
                        Galeria Smaku
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Odkryj wizualnie nasze dania kuchni ormiańskiej i gruzińskiej. 
                        Każde zdjęcie to autentyczny smak Kaukazu!
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-pastel-orange to-golden mx-auto mt-6"></div>
                </div>

                {/* Filtry */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            filter === 'all'
                                ? 'bg-pastel-orange text-white shadow-lg scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <i className="fas fa-th mr-2"></i>
                        Wszystkie ({dishes.length})
                    </button>
                    <button
                        onClick={() => setFilter('ormianskie')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            filter === 'ormianskie'
                                ? 'bg-pastel-orange text-white shadow-lg scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <i className="fas fa-flag mr-2"></i>
                        Ormiańskie ({dishes.filter(d => d.category === 'ormianskie').length})
                    </button>
                    <button
                        onClick={() => setFilter('gruzinskie')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            filter === 'gruzinskie'
                                ? 'bg-pastel-orange text-white shadow-lg scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <i className="fas fa-flag mr-2"></i>
                        Gruzińskie ({dishes.filter(d => d.category === 'gruzinskie').length})
                    </button>
                </div>

                {/* Grid galerii */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDishes.map((dish, index) => (
                        <article
                            key={dish.id}
                            className="group relative bg-white rounded-xl shadow-warm overflow-hidden cursor-pointer card-hover fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                            onClick={() => setSelectedImage(dish)}
                        >
                            {/* Obrazek */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                {/* Overlay hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                                        <i className="fas fa-search-plus text-4xl mb-2"></i>
                                        <p className="text-sm font-semibold">Kliknij aby powiększyć</p>
                                    </div>
                                </div>
                                {/* Badge kategorii */}
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                                    dish.category === 'ormianskie' ? 'bg-red-500' : 'bg-blue-500'
                                }`}>
                                    {dish.category === 'ormianskie' ? '🇦🇲 Ormiańskie' : '🇬🇪 Gruzińskie'}
                                </div>
                            </div>

                            {/* Opis */}
                            <div className="p-5">
                                <h3 className="text-xl font-display font-bold text-warm-brown mb-2">
                                    {dish.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {dish.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 fade-in"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white text-4xl hover:text-pastel-orange transition-colors z-10"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Zamknij"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                        
                        <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.name}
                                className="w-full h-auto rounded-lg shadow-2xl"
                            />
                            <div className="bg-white rounded-b-lg p-6 text-center">
                                <h3 className="text-2xl font-display font-bold text-warm-brown mb-2">
                                    {selectedImage.name}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {selectedImage.description}
                                </p>
                                <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold text-white ${
                                    selectedImage.category === 'ormianskie' ? 'bg-red-500' : 'bg-blue-500'
                                }`}>
                                    {selectedImage.category === 'ormianskie' ? '🇦🇲 Kuchnia Ormiańska' : '🇬🇪 Kuchnia Gruzińska'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-6 text-lg">
                        Zachęcamy do odwiedzenia restauracji i spróbowania tych wspaniałych dań!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+48501839411"
                            className="inline-flex items-center justify-center btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
                        >
                            <i className="fas fa-phone-alt mr-3"></i>
                            <span>Zamów telefonicznie</span>
                        </a>
                        <a
                            href="#menu"
                            className="inline-flex items-center justify-center btn-secondary px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
                        >
                            <i className="fas fa-book-open mr-3"></i>
                            <span>Zobacz pełne menu</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
