// Komponent Nowości i Promocje
const PromotionsSection = () => {
    const promotions = [
        {
            id: 1,
            title: "Lunch Biznesowy",
            subtitle: "Każdy dzień roboczy 12:00-15:00",
            description: "Zupa dnia + Danie główne + Napój",
            price: "75 zł",
            badge: "PROMOCJA",
            badgeColor: "bg-red-500",
            icon: "fa-business-time",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
        },
        {
            id: 2,
            title: "Nowość: Khachapuri po ajarsku",
            subtitle: "Tradycyjny gruziński chlebek",
            description: "Ciasto z serem, masłem i żółtkiem - prawdziwy smak Gruzji!",
            price: "37 zł",
            badge: "NOWOŚĆ",
            badgeColor: "bg-green-500",
            icon: "fa-star",
            image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800&q=80"
        },
        {
            id: 3,
            title: "Happy Hour: Lemoniady",
            subtitle: "Codziennie 16:00-18:00",
            description: "Wszystkie lemoniady domowe -20%",
            price: "12 zł zamiast 15 zł",
            badge: "HAPPY HOUR",
            badgeColor: "bg-pastel-orange",
            icon: "fa-glass-citrus",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80"
        },
        {
            id: 4,
            title: "Voucher Prezentowy",
            subtitle: "Idealny pomysł na prezent",
            description: "Kup voucher na posiłek w Aragac - od 50 zł do 200 zł",
            price: "Od 50 zł",
            badge: "VOUCHER",
            badgeColor: "bg-golden",
            icon: "fa-gift",
            image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80"
        }
    ];

    return (
        <section id="promocje" className="py-16 bg-gradient-to-br from-warm-beige/30 to-soft-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 fade-in">
                    <div className="inline-block bg-pastel-orange/20 text-pastel-orange px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i className="fas fa-sparkles mr-2"></i>
                        AKTUALNE OFERTY
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-warm-brown mb-4">
                        Nowości i Promocje
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Sprawdź nasze aktualne promocje i nowości w menu! 
                        Prawdziwe smaki Armenii i Gruzji w świetnych cenach.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-pastel-orange to-golden mx-auto mt-6"></div>
                </div>

                {/* Grid promocji */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {promotions.map((promo, index) => (
                        <article 
                            key={promo.id}
                            className="bg-white rounded-xl shadow-warm overflow-hidden card-hover fade-in group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Obrazek z badge */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={promo.image}
                                    alt={promo.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                {/* Badge */}
                                <div className={`absolute top-4 right-4 ${promo.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                                    {promo.badge}
                                </div>
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            </div>

                            {/* Treść */}
                            <div className="p-5">
                                {/* Ikona */}
                                <div className="flex items-center justify-center w-12 h-12 bg-pastel-orange/20 rounded-full mb-4">
                                    <i className={`fas ${promo.icon} text-2xl text-pastel-orange`}></i>
                                </div>

                                {/* Tytuł */}
                                <h3 className="text-xl font-display font-bold text-warm-brown mb-2">
                                    {promo.title}
                                </h3>

                                {/* Subtitle */}
                                <p className="text-sm text-pastel-orange font-semibold mb-3">
                                    {promo.subtitle}
                                </p>

                                {/* Opis */}
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {promo.description}
                                </p>

                                {/* Cena */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <span className="text-2xl font-bold text-pastel-orange">
                                        {promo.price}
                                    </span>
                                    <a 
                                        href="tel:+48501839411"
                                        className="inline-flex items-center text-warm-brown hover:text-pastel-orange transition-colors text-sm font-semibold"
                                    >
                                        <span>Zamów</span>
                                        <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-6">
                        Masz pytania o promocje? Zadzwoń do nas!
                    </p>
                    <a 
                        href="tel:+48501839411"
                        className="inline-flex items-center btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
                    >
                        <i className="fas fa-phone-alt mr-3"></i>
                        <span>501 839 411</span>
                    </a>
                </div>
            </div>
        </section>
    );
};
