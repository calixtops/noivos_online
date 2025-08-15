import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaBed, FaMapMarkerAlt, FaPhone, FaGlobe, FaWhatsapp, FaInstagram, FaFacebook, FaWifi, FaCar, FaSwimmingPool, FaUtensils, FaStar, FaHeart, FaFilter, FaTree, FaSnowflake, FaChild, FaWater } from 'react-icons/fa';
import { useThemeColors } from '../hooks/useThemeColors';

const pousadas = [
  {
    id: 1,
    name: "Hotel Central",
    address: "Rua Principal, 100 - Centro, São Paulo - SP",
    phone: "(11) 99999-9999",
    site: "https://www.hotelcentral.com.br",
    description: "Hotel tradicional da região, com piscina, restaurante, quartos confortáveis e excelente localização.",
    rating: 4.5,
    priceRange: "R$ 200-350",
    amenities: ["wifi", "piscina", "restaurante", "estacionamento"],
    category: "hotel",
    featured: true
  },
  {
    id: 2,
    name: "Hotel Jardim",
    address: "Av. das Flores, 200 - Jardim, São Paulo - SP",
    phone: "(11) 88888-8888",
    site: "https://www.hoteljardim.com.br",
    description: "Hotel com estrutura completa, café da manhã incluso, área de lazer e fácil acesso.",
    rating: 4.2,
    priceRange: "R$ 180-300",
    amenities: ["wifi", "piscina", "restaurante", "estacionamento", "cafeManha"],
    category: "hotel",
    featured: false
  },
  {
    id: 3,
    name: "Pousada Tranquila",
    address: "Rua da Paz, 50 - Bairro Tranquilo, São Paulo - SP",
    phone: "(11) 77777-7777",
    site: "https://www.pousadatranquila.com.br",
    description: "Pousada com ambiente familiar, piscina, café da manhã incluso e quartos confortáveis.",
    rating: 4.4,
    priceRange: "R$ 150-250",
    amenities: ["wifi", "piscina", "cafeManha"],
    category: "pousada",
    featured: true
  },
  {
    id: 4,
    name: "Pousada dos Sonhos",
    address: "Av. dos Sonhos, 300 - Centro, São Paulo - SP",
    phone: "(11) 66666-6666",
    site: "https://wa.me/5511666666666",
    description: "Ambiente familiar, área verde, estacionamento e localização privilegiada.",
    rating: 4.0,
    priceRange: "R$ 120-200",
    amenities: ["wifi", "estacionamento", "areaVerde"],
    category: "pousada",
    featured: false
  },
  {
    id: 5,
    name: "Pousada Sol e Lua",
    address: "Rua das Estrelas, 150 - Jardim, São Paulo - SP",
    phone: "(11) 55555-5555",
    site: "https://www.instagram.com/pousadasolelua",
    description: "Quartos climatizados, piscina, restaurante próprio e atendimento personalizado.",
    rating: 4.3,
    priceRange: "R$ 160-280",
    amenities: ["wifi", "piscina", "restaurante", "arCondicionado"],
    category: "pousada",
    featured: false
  },
  {
    id: 6,
    name: "Pousada Recanto",
    address: "Av. da Tranquilidade, 80 - Centro, São Paulo - SP",
    phone: "(11) 44444-4444",
    site: "https://wa.me/5511444444444",
    description: "Ótima opção para famílias, com área de lazer e café da manhã regional.",
    rating: 4.1,
    priceRange: "R$ 140-220",
    amenities: ["wifi", "cafeManha", "areaLazer", "familiar"],
    category: "pousada",
    featured: false
  },
  {
    id: 7,
    name: "Pousada Paraíso",
    address: "Rua do Paraíso, 99 - Jardim, São Paulo - SP",
    phone: "(11) 33333-3333",
    site: "https://www.facebook.com/pousadaparaiso",
    description: "Local tranquilo, com estacionamento e wi-fi, ideal para descanso.",
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
  const colors = useThemeColors();

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
    <div className={`min-h-screen flex flex-col ${colors.gradientBackground}`}>
      <Head>
        <title>Hospedagem - João & Maria</title>
        <meta name="description" content="Sugestões de hospedagem para o casamento de João e Maria" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${colors.bgCream}/50 to-${colors.bgSecondary}/50`}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className={`text-4xl sm:text-5xl lg:text-6xl font-serif font-bold ${colors.textPrimary} mb-6`}
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
              <div className={`h-px bg-gradient-to-r from-transparent via-${colors.textSecondary} to-transparent flex-1 max-w-32`}></div>
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
                <FaBed className={`${colors.textAccent} text-3xl`} />
              </motion.div>
              <div className={`h-px bg-gradient-to-r from-transparent via-${colors.textSecondary} to-transparent flex-1 max-w-32`}></div>
            </motion.div>

            <motion.p 
              className={`text-xl sm:text-2xl ${colors.textSecondary} max-w-3xl mx-auto leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Selecionamos as melhores opções de hospedagem na Praia do Presídio para que você possa descansar com tranquilidade
            </motion.p>
          </div>
        </section>

        {/* Filtros */}
        <section className="py-8 bg-white/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { key: 'all', label: 'Todas', icon: FaBed },
                { key: 'featured', label: 'Destaques', icon: FaStar },
                { key: 'hotel', label: 'Hotéis', icon: FaBed },
                { key: 'pousada', label: 'Pousadas', icon: FaTree }
              ].map(({ key, label, icon: Icon }) => (
                <motion.button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === key
                      ? `${colors.bgPrimary} text-cream-100 shadow-md`
                      : `${colors.bgCream} ${colors.textPrimary} hover:${colors.bgSecondary} border ${colors.borderPrimary}`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="text-sm" />
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Lista de Pousadas */}
        <section 
          ref={sectionRef}
          className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${colors.gradientBackground}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className={`text-3xl sm:text-4xl font-serif font-bold text-center ${colors.textPrimary} mb-16`}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Opções de Hospedagem
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPousadas.map((pousada, index) => (
                <motion.div
                  key={pousada.id}
                  className={`${colors.bgCream} rounded-2xl shadow-lg border ${colors.borderPrimary} overflow-hidden hover:shadow-xl transition-all duration-300`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Header do Card */}
                  <div className={`p-6 ${colors.bgSecondary} border-b ${colors.borderPrimary}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={`text-xl font-serif font-bold ${colors.textPrimary} leading-tight`}>
                        {pousada.name}
                      </h3>
                      {pousada.featured && (
                        <span className={`px-2 py-1 ${colors.bgPrimary} text-cream-100 text-xs font-medium rounded-full`}>
                          Destaque
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <FaMapMarkerAlt className={`${colors.textSecondary} text-sm`} />
                      <p className={`text-sm ${colors.textSecondary}`}>
                        {pousada.address}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500 text-sm" />
                        <span className={`text-sm font-medium ${colors.textPrimary}`}>
                          {pousada.rating}
                        </span>
                      </div>
                      <span className={`text-sm font-medium ${colors.textSecondary}`}>
                        {pousada.priceRange}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="p-6">
                    <p className={`text-sm ${colors.textSecondary} mb-4 leading-relaxed`}>
                      {pousada.description}
                    </p>
                    
                    {/* Amenidades */}
                    <div className="mb-6">
                      <h4 className={`text-sm font-semibold ${colors.textPrimary} mb-2`}>
                        Amenidades:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pousada.amenities.map((amenity) => {
                          const amenityIcons = {
                            wifi: FaWifi,
                            piscina: FaSwimmingPool,
                            restaurante: FaUtensils,
                            estacionamento: FaCar,
                            cafeManha: FaUtensils,
                            areaVerde: FaTree,
                            arCondicionado: FaSnowflake,
                            areaLazer: FaChild,
                            familiar: FaHeart,
                            tranquilo: FaWater
                          };
                          const Icon = amenityIcons[amenity] || FaBed;
                          return (
                            <span
                              key={amenity}
                              className={`px-2 py-1 ${colors.bgSecondary} ${colors.textPrimary} text-xs rounded-full flex items-center gap-1`}
                            >
                              <Icon className="text-xs" />
                              {amenity.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Contatos */}
                    <div className="space-y-3">
                      <a
                        href={`tel:${pousada.phone}`}
                        className={`flex items-center gap-2 p-2 ${colors.bgSecondary} ${colors.textPrimary} rounded-lg hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
                      >
                        <FaPhone className="text-sm" />
                        <span className="text-sm">{pousada.phone}</span>
                      </a>
                      
                      <a
                        href={pousada.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 p-2 ${colors.bgSecondary} ${colors.textPrimary} rounded-lg hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
                      >
                        {(() => {
                          const IconComponent = getContactIcon(pousada.site);
                          return React.createElement(IconComponent, { className: "text-sm" });
                        })()}
                        <span className="text-sm">
                          {pousada.site.includes('wa.me') ? 'WhatsApp' :
                           pousada.site.includes('instagram') ? 'Instagram' :
                           pousada.site.includes('facebook') ? 'Facebook' : 'Site'}
                        </span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredPousadas.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FaBed className={`${colors.textSecondary} text-4xl mx-auto mb-4`} />
                <p className={`text-lg ${colors.textSecondary}`}>
                  Nenhuma opção encontrada para o filtro selecionado.
                </p>
              </motion.div>
            )}
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