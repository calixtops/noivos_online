import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaHeart, FaBed, FaRoute, FaUmbrella, FaCar, FaSun } from 'react-icons/fa';
import { useThemeColors } from '../hooks/useThemeColors';

const Programacao = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const colors = useThemeColors();

  const tabs = [
    { label: "Local", icon: FaMapMarkerAlt },
    { label: "Hospedagem", icon: FaBed }
  ];

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

  return (
    <div className={`min-h-screen flex flex-col ${colors.gradientBackground}`}>
      <Head>
        <title>Programação - João & Maria</title>
        <meta name="description" content="Cronograma completo do casamento de João e Maria - 15 de Dezembro de 2024" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section - Estilo Clássico */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="relative container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl ${colors.textPrimary} mb-6`}>
                Programação do Grande Dia
              </h1>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className={`h-px bg-gradient-to-r from-transparent via-${colors.textSecondary} to-transparent w-24`}></div>
                <div className={`${colors.bgSecondary} border ${colors.borderSecondary} ${colors.textPrimary} px-6 py-2 rounded-lg`}>
                  <FaCalendarAlt className="inline mr-2" />
                  15 de Dezembro de 2024
                </div>
                <div className={`h-px bg-gradient-to-r from-transparent via-${colors.textSecondary} to-transparent w-24`}></div>
              </div>

              <p className={`text-lg sm:text-xl ${colors.textSecondary} max-w-2xl mx-auto leading-relaxed`}>
                Um dia repleto de amor, alegria e momentos inesquecíveis
              </p>
            </motion.div>
          </div>
        </section>

        {/* Navegação por Tabs - Estilo Minimalista */}
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {tabs.map((tab, index) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === index
                      ? `${colors.bgPrimary} text-cream-100 shadow-md`
                      : `${colors.bgCream} ${colors.textPrimary} hover:${colors.bgSecondary} border ${colors.borderPrimary}`
                  }`}
                >
                  <tab.icon className="text-lg" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Conteúdo das Tabs */}
        <section ref={sectionRef} className="py-8 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div
                  key="local"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-serif text-2xl sm:text-3xl text-center text-olive-800 mb-12">
                    Local da Celebração
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Informações do Local */}
                    <div className="bg-white/60 backdrop-blur-sm border border-olive-200 rounded-lg p-8 shadow-sm">
                      <h3 className="font-serif text-xl text-olive-800 mb-6">
                        Casa Branca Eventos
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <FaMapMarkerAlt className="text-olive-600 text-lg mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-olive-800">Endereço</p>
                            <p className="text-stone-600">R. Do Jangadeiro, 190 - Jacaúna</p>
                            <p className="text-stone-600">Aquiraz - CE</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <FaMapMarkerAlt className="text-olive-600 text-lg mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-olive-800">Horário</p>
                            <p className="text-stone-600">Das 16:00 às 22:00</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <FaCar className="text-olive-600 text-lg mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-olive-800">Distância</p>
                            <p className="text-stone-600">50 minutos de Fortaleza</p>
                            <p className="text-stone-500 text-sm">Considere hospedagem na região</p>
                          </div>
                        </div>

                        <div className="pt-4">
                          <a
                            href="https://maps.app.goo.gl/jWucTajJeoit49hY8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-olive-700 text-cream-100 px-6 py-3 rounded-lg font-medium hover:bg-olive-800 transition-colors duration-300"
                          >
                            <FaRoute />
                            Como Chegar
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Mapa */}
                    <div className="bg-white/60 backdrop-blur-sm border border-olive-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="h-80 lg:h-full min-h-[300px] relative">
                        <iframe 
                          src="https://www.google.com/maps?q=-3.933929728985562,-38.30905682311235&z=16&output=embed"
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div
                  key="hospedagem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-serif text-2xl sm:text-3xl text-center text-olive-800 mb-12">
                    Opções de Hospedagem
                  </h2>

                  <div className="bg-cream-100 border border-olive-200 rounded-lg p-8 text-center shadow-sm max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-olive-100 border border-olive-300 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaBed className="text-olive-600 text-xl" />
                    </div>
                    
                    <h3 className="font-serif text-xl text-olive-800 mb-4">
                      Guia de Hospedagem
                    </h3>
                    <p className="text-stone-600 mb-6 leading-relaxed">
                      Preparamos uma lista especial de pousadas e hotéis próximos ao local 
                      da festa para que você possa descansar com tranquilidade.
                    </p>
                    
                    <a
                      href="/pousadas"
                      className="inline-flex items-center gap-2 bg-olive-700 text-cream-100 px-8 py-3 rounded-lg font-medium hover:bg-olive-800 transition-colors duration-300"
                    >
                      <FaBed />
                      Ver Opções de Hospedagem
                    </a>
                  </div>
                </motion.div>
              )}


            </AnimatePresence>
          </div>
        </section>

        {/* 
        DICAS SUTIS PARA O EVENTO - COMENTADO TEMPORARIAMENTE
        
        <section className="py-12 px-6 bg-gradient-to-br from-cream-50 to-olive-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="font-serif text-xl sm:text-2xl text-olive-800 mb-3">
                Dicas para o Grande Dia
              </h2>
              <div className="w-16 h-0.5 bg-olive-400 rounded mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/50 backdrop-blur-sm border border-olive-100 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUmbrella className="text-blue-600 text-xl" />
                </div>
                <h3 className="font-medium text-olive-800 mb-3">Evento na Praia</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Roupas leves e calçados confortáveis são recomendados. 
                  Não esqueça do protetor solar! 🌊
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/50 backdrop-blur-sm border border-olive-100 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSun className="text-amber-600 text-xl" />
                </div>
                <h3 className="font-medium text-olive-800 mb-3">Final de Tarde</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Traga uma pashmina para a brisa do mar. 
                  O pôr do sol será inesquecível! 🌅
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white/50 backdrop-blur-sm border border-olive-100 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCar className="text-green-600 text-xl" />
                </div>
                <h3 className="font-medium text-olive-800 mb-3">Chegada</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Estacionamento disponível no local. 
                  Chegue 15 minutos antes para acomodação. 🚗
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        */}

        {/* Call to Action - Estilo Clássico */}
        <section className="py-16 bg-olive-700 text-cream-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              Sua Presença é o Nosso Maior Presente
            </h2>
            
            <p className="text-cream-200 mb-8 max-w-2xl mx-auto">
              Mal podemos esperar para celebrar este momento especial com você
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="bg-cream-100 text-olive-800 px-8 py-3 rounded-lg font-medium hover:bg-cream-200 transition-colors duration-300"
              >
                Confirmar Presença
              </a>
              <a
                href="/presentes"
                className="border border-cream-200 text-cream-100 px-8 py-3 rounded-lg font-medium hover:bg-cream-100 hover:text-olive-800 transition-all duration-300"
              >
                Lista de Presentes
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Programacao;
