const ContactForm = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitMessage, setSubmitMessage] = React.useState('');
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');
        
        try {
            const response = await fetch('http://127.0.0.1:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                setSubmitMessage('Dziękujemy! Wiadomość została wysłana pomyślnie.');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setSubmitMessage(result.error || 'Wystąpił błąd. Spróbuj ponownie.');
            }
        } catch (error) {
            setSubmitMessage('Błąd połączenia. Sprawdź połączenie internetowe.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <section id="kontakt" className="py-16 bg-gradient-to-br from-warm-beige to-soft-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="fade-in">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-warm-brown mb-6">
                            Skontaktuj się z nami
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Masz pytania o nasze dania? Chcesz zarezerwować stolik? 
                            Napisz do nas lub zadzwoń - chętnie Ci pomożemy!
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <div className="bg-pastel-orange p-3 rounded-lg mr-4">
                                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-warm-brown">Adres</h3>
                                    <p className="text-gray-600">ul. Kościuszki 27, 83-300 Kartuzy</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <div className="bg-golden p-3 rounded-lg mr-4">
                                    <i className="fas fa-phone text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-warm-brown">Telefon</h3>
                                    <a href="tel:+48501839411" className="text-gray-600 hover:text-warm-brown transition-colors">501 839 411</a>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <div className="bg-warm-brown p-3 rounded-lg mr-4">
                                    <i className="fas fa-envelope text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-warm-brown">Email</h3>
                                    <a href="mailto:aragac.arm@gmail.com" className="text-gray-600 hover:text-warm-brown transition-colors">aragac.arm@gmail.com</a>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <div className="bg-pastel-orange p-3 rounded-lg mr-4">
                                    <i className="fas fa-clock text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-warm-brown">Godziny otwarcia</h3>
                                    <p className="text-gray-600">
                                        Codziennie: 10:00 - 21:00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Form */}
                    <div className="slide-in-left">
                        <div className="bg-white p-8 rounded-xl shadow-warm-lg">
                            <h3 className="text-2xl font-display font-semibold text-warm-brown mb-6">
                                Napisz do nas
                            </h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Imię i nazwisko *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                                        placeholder="Twoje imię i nazwisko"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                                        placeholder="twoj@email.com"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                                        placeholder="+48 123 456 789"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Wiadomość *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                                        placeholder="Twoja wiadomość..."
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full btn-primary text-white py-3 px-6 rounded-lg font-medium transition-all ${
                                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="spinner inline-block mr-2"></div>
                                            Wysyłanie...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-paper-plane mr-2"></i>
                                            Wyślij wiadomość
                                        </>
                                    )}
                                </button>
                                
                                {submitMessage && (
                                    <div className={`p-4 rounded-lg ${
                                        submitMessage.includes('Dziękujemy') 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};