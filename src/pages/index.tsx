import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const weddingDate = new Date('2026-06-06T16:20:00'); // Data do casamento

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Geórgia & Pedro - Nosso Casamento</title>
        <meta name="description" content="Celebre conosco o dia mais especial de nossas vidas" />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>

      <Header />
      
      <main className="flex-grow">
        {/* Banner Principal */}
        <section 
          className="min-h-[60vh] md:min-h-screen flex items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: "url('/images/banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <motion.div 
            className="text-center z-10 text-white px-4 w-full max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-sans mb-4 break-words"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Geórgia & Pedro
            </motion.h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8">06 de Junho de 2026</p>
            
            {/* Contador Regressivo */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 sm:gap-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-white/20 rounded-lg p-2 sm:p-4 backdrop-blur-sm min-w-[70px]">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.days}</span>
                <p className="text-xs sm:text-base">Dias</p>
              </div>
              <div className="bg-white/20 rounded-lg p-2 sm:p-4 backdrop-blur-sm min-w-[70px]">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.hours}</span>
                <p className="text-xs sm:text-base">Horas</p>
              </div>
              <div className="bg-white/20 rounded-lg p-2 sm:p-4 backdrop-blur-sm min-w-[70px]">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.minutes}</span>
                <p className="text-xs sm:text-base">Minutos</p>
              </div>
              <div className="bg-white/20 rounded-lg p-2 sm:p-4 backdrop-blur-sm min-w-[70px]">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.seconds}</span>
                <p className="text-xs sm:text-base">Segundos</p>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;