import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaBed, FaMapMarkerAlt, FaPhone, FaGlobe, FaWhatsapp, FaInstagram, FaFacebook, FaWifi, FaCar, FaSwimmingPool, FaUtensils, FaStar, FaHeart, FaFilter, FaTree, FaSnowflake, FaChild, FaWater } from 'react-icons/fa';

const pousadas = [
  {
    id: 1,
    name: "Hotel Don'Ana",
    address: "Av. Beira Mar, 900 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 99123-4567",
    site: "https://www.hoteldonana.com.br",
    description: "Hotel tradicional da região, com piscina, restaurante, quartos confortáveis e excelente localização à beira-mar.",
    rating: 4.5,
    priceRange: "R$ 200-350",
    amenities: ["wifi", "piscina", "restaurante", "estacionamento", "praia"],
    category: "hotel",
    featured: true
  },
  {
    id: 2,
    name: "Hotel Jangadeiro",
    address: "Av. Beira Mar, 1000 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 99234-5678",
    site: "https://www.hoteljangadeiro.com.br",
    description: "Hotel com estrutura completa, café da manhã incluso, área de lazer e fácil acesso à praia.",
    rating: 4.2,
    priceRange: "R$ 180-300",
    amenities: ["wifi", "piscina", "restaurante", "estacionamento", "cafeManha"],
    category: "hotel",
    featured: false
  },
  {
    id: 3,
    name: "Pousada Mar do Presídio",
    address: "Av. Beira Mar, 1200 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 99999-1234",
    site: "https://www.pousadamardopresidio.com.br",
    description: "Pousada à beira-mar com piscina, café da manhã incluso e quartos com vista para o mar.",
    rating: 4.4,
    priceRange: "R$ 150-250",
    amenities: ["wifi", "piscina", "cafeManha", "vistaMar"],
    category: "pousada",
    featured: true
  },
  {
    id: 4,
    name: "Pousada dos Coqueiros",
    address: "Rua dos Coqueiros, 45 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 98888-5678",
    site: "https://wa.me/5585988885678",
    description: "Ambiente familiar, área verde, estacionamento e fácil acesso à praia.",
    rating: 4.0,
    priceRange: "R$ 120-200",
    amenities: ["wifi", "estacionamento", "areaVerde"],
    category: "pousada",
    featured: false
  },
  {
    id: 5,
    name: "Pousada Sol e Mar",
    address: "Rua Sol Nascente, 200 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 99666-4321",
    site: "https://www.instagram.com/pousadasolemar",
    description: "Quartos climatizados, piscina, restaurante próprio e atendimento personalizado.",
    rating: 4.3,
    priceRange: "R$ 160-280",
    amenities: ["wifi", "piscina", "restaurante", "arCondicionado"],
    category: "pousada",
    featured: false
  },
  {
    id: 6,
    name: "Pousada Recanto do Presídio",
    address: "Av. Principal, 800 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 98765-4321",
    site: "https://wa.me/5585987654321",
    description: "Ótima opção para famílias, com área de lazer e café da manhã regional.",
    rating: 4.1,
    priceRange: "R$ 140-220",
    amenities: ["wifi", "cafeManha", "areaLazer", "familiar"],
    category: "pousada",
    featured: false
  },
  {
    id: 7,
    name: "Pousada Paraíso das Dunas",
    address: "Rua das Dunas, 99 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 99555-6789",
    site: "https://www.facebook.com/pousadaparaisodasdunas",
    description: "Local tranquilo, próximo às dunas e à praia, com estacionamento e wi-fi.",
    rating: 4.0,
    priceRange: "R$ 110-180",
    amenities: ["wifi", "estacionamento", "tranquilo"],
    category: "pousada",
    featured: false
  }
];

const amenityIcons = {
  wifi: { icon: FaWifi, label: "Wi-Fi" },
  piscina: { icon: FaSwimmingPool, label: "Piscina" },
  restaurante: { icon: FaUtensils, label: "Restaurante" },
  estacionamento: { icon: FaCar, label: "Estacionamento" },
  cafeManha: { icon: FaUtensils, label: "Café da Manhã" },
  vistaMar: { icon: FaWater, label: "Vista Mar" },
  areaVerde: { icon: FaTree, label: "Área Verde" },
  arCondicionado: { icon: FaSnowflake, label: "Ar Condicionado" },
  areaLazer: { icon: FaSwimmingPool, label: "Área de Lazer" },
  familiar: { icon: FaChild, label: "Familiar" },
  tranquilo: { icon: FaHeart, label: "Ambiente Tranquilo" },
  praia: { icon: FaWater, label: "Acesso à Praia" }
};

const Pousadas = () => {
  const [filter, setFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const filteredPousadas = filter === 'all' 
    ? pousadas 
    : filter === 'featured'
    ? pousadas.filter(p => p.featured)
    : pousadas.filter(p => p.category === filter);

  const getContactIcon = (url: string) => {
    if (url.includes('wa.me')) return FaWhatsapp;
    if (url.includes('instagram')) return FaInstagram;
    if (url.includes('facebook')) return FaFacebook;
    return FaGlobe;
  };

  const getContactColor = (url: string) => {
    if (url.includes('wa.me')) return 'from-green-500 to-green-600';
    if (url.includes('instagram')) return 'from-pink-500 to-purple-600';
    if (url.includes('facebook')) return 'from-blue-500 to-blue-600';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream-50 via-cream-25 to-olive-50">
      <Head>
        <title>Pousadas - Pedro & Geórgia</title>
        <meta name="description" content="Opções de hospedagem para o casamento de Pedro e Geórgia na Praia do Presídio, Aquiraz - CE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cream-100/50 to-olive-100/50"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-800 mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Onde se Hospedar
            </motion.h1>
            
            <motion.div 
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-olive-400 to-transparent flex-1 max-w-32"></div>
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaBed className="text-olive-500 text-3xl" />
              </motion.div>
              <div className="h-px bg-gradient-to-r from-transparent via-olive-400 to-transparent flex-1 max-w-32"></div>
            </motion.div>

            <motion.p 
              className="text-xl sm:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Selecionamos as melhores opções de hospedagem na Praia do Presídio para que você possa descansar com tranquilidade
            </motion.p>
          </div>
        </section>

        {/* Filtros */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {[
                { value: 'all', label: 'Todos', icon: FaBed },
                { value: 'featured', label: 'Recomendados', icon: FaStar },
                { value: 'hotel', label: 'Hotéis', icon: FaBed },
                { value: 'pousada', label: 'Pousadas', icon: FaHeart }
              ].map((filterOption) => (
                <motion.button
                  key={filterOption.value}
                  onClick={() => setFilter(filterOption.value)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    filter === filterOption.value
                      ? 'bg-gradient-to-r from-olive-500 to-sage-600 text-cream shadow-lg scale-105'
                      : 'bg-cream text-stone-600 hover:bg-olive-50 hover:text-olive-600 shadow-md border border-olive-200'
                  }`}
                  whileHover={{ scale: filter === filterOption.value ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <filterOption.icon className="text-lg" />
                  <span className="hidden sm:inline">{filterOption.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Lista de Pousadas */}
        <section 
          ref={sectionRef}
          className="py-8 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div 
                key={filter}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {filteredPousadas.map((pousada, index) => (
                  <motion.div
                    key={pousada.id}
                    className="bg-cream rounded-2xl shadow-xl p-6 sm:p-8 border border-olive-200 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Badge para recomendados */}
                    {pousada.featured && (
                      <motion.div
                        className="absolute top-4 right-4 bg-gradient-to-r from-olive-500 to-sage-600 text-cream px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <FaStar className="text-xs" />
                        Recomendado
                      </motion.div>
                    )}

                    {/* Cabeçalho */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 mb-2">
                            {pousada.name}
                          </h2>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i}
                                className={`text-sm ${
                                  i < Math.floor(pousada.rating) 
                                    ? 'text-olive-500' 
                                    : 'text-stone-300'
                                }`}
                              />
                            ))}
                            <span className="text-stone-600 ml-2 text-sm">
                              {pousada.rating}/5
                            </span>
                          </div>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          pousada.category === 'hotel' 
                            ? 'bg-olive-100 text-olive-700' 
                            : 'bg-sage-100 text-sage-700'
                        }`}>
                          {pousada.category === 'hotel' ? 'Hotel' : 'Pousada'}
                        </div>
                      </div>

                      <div className="text-lg font-semibold text-olive-600 mb-4">
                        {pousada.priceRange}/noite
                      </div>
                    </div>

                    {/* Endereço */}
                    <div className="flex items-start gap-3 mb-4">
                      <FaMapMarkerAlt className="text-olive-500 text-lg mt-1 flex-shrink-0" />
                      <p className="text-stone-600">{pousada.address}</p>
                    </div>

                    {/* Descrição */}
                    <p className="text-stone-700 leading-relaxed mb-6">
                      {pousada.description}
                    </p>

                    {/* Comodidades */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-stone-800 mb-3">Comodidades:</h4>
                      <div className="flex flex-wrap gap-2">
                        {pousada.amenities.slice(0, 4).map((amenity) => {
                          const amenityInfo = amenityIcons[amenity as keyof typeof amenityIcons];
                          if (!amenityInfo) return null;
                          
                          return (
                            <motion.div
                              key={amenity}
                              className="flex items-center gap-2 bg-olive-50 text-olive-700 px-3 py-1 rounded-full text-sm"
                              whileHover={{ scale: 1.05 }}
                            >
                              <amenityInfo.icon className="text-xs" />
                              <span>{amenityInfo.label}</span>
                            </motion.div>
                          );
                        })}
                        {pousada.amenities.length > 4 && (
                          <div className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-sm">
                            +{pousada.amenities.length - 4} mais
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.a
                        href={`tel:${pousada.phone}`}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-olive-500 to-sage-600 text-cream px-4 py-3 rounded-xl font-semibold hover:from-olive-600 hover:to-sage-700 transition-all duration-300 flex-1"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaPhone className="text-sm" />
                        <span className="hidden sm:inline">Ligar</span>
                        <span className="sm:hidden">{pousada.phone}</span>
                      </motion.a>

                      <motion.a
                        href={pousada.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 bg-gradient-to-r ${getContactColor(pousada.site)} text-white px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex-1`}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {(() => {
                          const IconComponent = getContactIcon(pousada.site);
                          return <IconComponent className="text-sm" />;
                        })()}
                        Reservar
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Dicas Importantes */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-50 to-olive-50">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl font-serif font-bold text-center text-stone-800 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              🌿 Dicas Importantes
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Reserve com Antecedência",
                  description: "A região é muito procurada, especialmente aos finais de semana. Reserve com pelo menos 30 dias de antecedência.",
                  color: "from-olive-500 to-sage-600"
                },
                {
                  title: "Transporte",
                  description: "A maioria das pousadas fica a 5-15 minutos do local da festa.",
                  color: "from-sage-500 to-olive-600"
                },
                {
                  title: "Check-in/Check-out",
                  description: "Informe que você estará no casamento para possível flexibilidade nos horários de check-in e check-out.",
                  color: "from-olive-600 to-stone-600"
                },
                {
                  title: "⚠️ Feriado Prolongado",
                  description: "A data do casamento coincide com um feriado prolongado! Reserve com ainda mais antecedência, pois a procura será maior e os preços podem aumentar.",
                  color: "from-red-500 to-orange-600"
                },
              ].map((tip, index) => (
                <motion.div
                  key={tip.title}
                  className="bg-cream rounded-2xl p-6 shadow-lg border border-olive-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${tip.color} rounded-full flex items-center justify-center mb-4`}>
                    <FaHeart className="text-cream text-xl animate-heartbeat" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-800 mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {tip.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-olive-700 text-cream-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Precisa de Ajuda com a Hospedagem?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-cream-200 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Entre em contato conosco! Ficaremos felizes em ajudar você a encontrar a melhor opção.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/contato"
                className="bg-cream-100 text-olive-800 px-8 py-3 rounded-lg font-medium hover:bg-cream-200 transition-colors duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Falar Conosco
              </motion.a>
              <motion.a
                href="/programacao"
                className="border border-cream-200 text-cream-100 px-8 py-3 rounded-lg font-medium hover:bg-cream-100 hover:text-olive-800 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Programação
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pousadas;