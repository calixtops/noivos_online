import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const weddingDate = new Date('2026-06-06T16:20:00');

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
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

  // Componente de coração decorativo otimizado
  const HeartDecoration = ({ className = "", delay = 0 }) => (
    <motion.div 
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.3, y: 0 }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
    >
      <FaHeart className="text-olive-300 text-2xl transform rotate-12 animate-heartbeat" />
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream-50 via-cream-100 to-olive-50">
      <Head>
        <title>Geórgia & Pedro - 06 de Junho de 2026</title>
        <meta name="description" content="Celebrando o amor de Geórgia e Pedro em 06 de Junho de 2026" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section - Estilo Clássico e Discreto */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          {/* Decorações herbais sutis */}
          <HeartDecoration className="top-10 left-10" delay={0} />
          <HeartDecoration className="top-32 right-16" delay={1} />
          <HeartDecoration className="bottom-20 left-20" delay={2} />
          <HeartDecoration className="bottom-40 right-12" delay={3} />
          
          <div className="relative container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              {/* Nomes discretos e elegantes */}
              <h1 className="font-script text-4xl sm:text-6xl lg:text-7xl text-olive-700 mb-4">
                Geórgia & Pedro
              </h1>
              
              {/* Linha decorativa sutil */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-olive-400 to-transparent w-24"></div>
                <FaHeart className="text-olive-500 text-sm" />
                <div className="h-px bg-gradient-to-r from-transparent via-olive-400 to-transparent w-24"></div>
              </div>

              <motion.p 
                className="text-lg sm:text-xl text-stone-600 font-light mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Convidam você para celebrar sua união
              </motion.p>

              {/* Data elegante */}
              <motion.div
                className="inline-block bg-white/60 backdrop-blur-sm border border-olive-200 rounded-lg px-8 py-4 shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 text-olive-800">
                  <FaCalendarAlt className="text-olive-600" />
                  <span className="font-serif text-xl">06 de Junho de 2026</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contagem Regressiva - Estilo Minimalista */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-2xl sm:text-3xl text-olive-800 mb-3">
                Faltam apenas
              </h2>
              <div className="w-16 h-px bg-olive-300 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto">
              {[
                { label: 'Dias', value: timeLeft.days },
                { label: 'Horas', value: timeLeft.hours },
                { label: 'Minutos', value: timeLeft.minutes },
                { label: 'Segundos', value: timeLeft.seconds }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="bg-cream-100 border border-olive-200 rounded-lg p-4 text-center shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-olive-700 mb-1">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs sm:text-sm text-stone-600 uppercase tracking-wide">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detalhes do Evento - Layout Simples */}
        <section ref={sectionRef} className="py-20 bg-gradient-to-b from-cream-50 to-olive-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl sm:text-4xl text-olive-800 mb-4">
                Detalhes da Celebração
              </h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-px bg-olive-300"></div>
                <FaHeart className="text-olive-400 text-sm" />
                <div className="w-8 h-px bg-olive-300"></div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Cerimônia */}
              <motion.div
                className="bg-white/60 backdrop-blur-sm border border-olive-200 rounded-lg p-8 text-center shadow-sm"
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-olive-600 text-lg" />
                </div>
                <h3 className="font-serif text-xl text-olive-800 mb-3">Cerimônia</h3>
                <p className="text-stone-600 mb-2">16:00h</p>
                <p className="text-stone-600 text-sm">Casa Branca Eventos</p>
                <p className="text-stone-600 text-sm">Aquiraz - CE</p>
              </motion.div>

              {/* Recepção */}
              <motion.div
                className="bg-white/60 backdrop-blur-sm border border-olive-200 rounded-lg p-8 text-center shadow-sm"
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-olive-600 text-lg transform scale-x-[-1]" />
                </div>
                <h3 className="font-serif text-xl text-olive-800 mb-3">Recepção</h3>
                <p className="text-stone-600 mb-2">17:30h</p>
                <p className="text-stone-600 text-sm">Mesmo local</p>
                <p className="text-stone-600 text-sm">Jantar & Festa</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action - Estilo Discreto */}
        <section className="py-16 bg-olive-700 text-cream-50">
          <div className="container mx-auto px-6 text-center">
            <motion.h2 
              className="font-serif text-2xl sm:text-3xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Sua Presença é o Nosso Maior Presente
            </motion.h2>
            
            <motion.p 
              className="text-cream-200 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Estamos ansiosos para compartilhar este momento especial com você
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a
                href="/programacao"
                className="bg-cream-100 text-olive-800 px-8 py-3 rounded-lg font-medium hover:bg-cream-200 transition-colors duration-300 border border-cream-200"
              >
                Ver Programação
              </a>
              <a
                href="/contato"
                className="border border-cream-200 text-cream-100 px-8 py-3 rounded-lg font-medium hover:bg-cream-100 hover:text-olive-800 transition-all duration-300"
              >
                Confirmar Presença
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;