const App = () => {
    const [menuData, setMenuData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    
    // Pobieranie danych menu z API
    React.useEffect(() => {
        const fetchMenuData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://127.0.0.1:5000/api/menu');
                
                if (!response.ok) {
                    throw new Error('Błąd podczas pobierania danych menu');
                }
                
                const data = await response.json();
                setMenuData(data);
            } catch (err) {
                console.error('Błąd API:', err);
                setError(err.message);
                
                // Fallback - przykładowe dane gdy API nie działa
                setMenuData({
                    hero: {
                        title: "Aragac - Autentyczna Kuchnia Armeńska",
                        subtitle: "Odkryj smaki Armenii w sercu Polski",
                        description: "Tradycyjne dania przygotowywane z miłością według starych, rodzinnych receptur."
                    },
                    sections: [
                        {
                            id: "dania-z-grilla",
                            title: "Dania prosto z ognia",
                            description: "Aromatyczne mięsa i warzywa grillowane na węglu",
                            items: [
                                {
                                    name: "Khorovats",
                                    description: "Tradycyjny armeński szaszłyk z baraniny",
                                    price: "45 zł",
                                    image: "/api/static/khorovats.jpg"
                                },
                                {
                                    name: "Dolma",
                                    description: "Liście winogron nadziewane ryżem i mięsem",
                                    price: "32 zł",
                                    image: "/api/static/dolma.jpg"
                                }
                            ]
                        },
                        {
                            id: "wypieki",
                            title: "Wypieki / Lahmadżo",
                            description: "Świeże pieczywo i tradycyjne wypieki",
                            items: [
                                {
                                    name: "Lahmadżo",
                                    description: "Cienka placka z mięsem i warzywami",
                                    price: "28 zł",
                                    image: "/api/static/lahmadzo.jpg"
                                },
                                {
                                    name: "Lavash",
                                    description: "Tradycyjny armeński chleb",
                                    price: "12 zł",
                                    image: "/api/static/lavash.jpg"
                                }
                            ]
                        }
                    ]
                });
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchMenuData();
    }, []);
    
    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-soft-white">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Ładowanie strony...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-soft-white">
            {/* Header */}
            <Header />
            
            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <Hero heroData={menuData?.hero} />
                
                {/* Promotions Section */}
                <PromotionsSection />
                
                {/* Menu Sections */}
                <MenuSections menuData={menuData} />
                
                {/* Gallery Section */}
                <GallerySection />
                
                {/* Contact Form */}
                <ContactForm />
            </main>
            
            {/* Footer */}
            <Footer />
            
            {/* Error notification */}
            {error && (
                <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
                    <div className="flex items-center">
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        <span className="text-sm">Problemy z połączeniem API. Wyświetlane są przykładowe dane.</span>
                        <button 
                            onClick={() => setError(null)}
                            className="ml-4 text-red-500 hover:text-red-700"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Renderowanie aplikacji
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);