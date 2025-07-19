import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Dados das fotos com mais contexto
const galleryPhotos = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  src: `/images/historia/${i + 1}.jpg`,
  alt: `Momento especial ${i + 1}`,
  caption: [
    "Nosso primeiro encontro no café",
    "Primeira viagem juntos",
    "Aniversário de namoro",
    "Férias na praia",
    "Aventura na montanha",
    "O pedido de casamento",
    "Celebrando o noivado"
  ][i] || `Foto ${i + 1}`
}));

// Timeline dos momentos
const timeline = [
  {
    year: "2018",
    title: "O Primeiro Encontro",
    description: "Uma tarde de outono, um café derramado e o início de tudo...",
    emoji: "☕"
  },
  {
    year: "2019", 
    title: "Primeira Viagem",
    description: "Nossa primeira aventura juntos nas montanhas de Campos do Jordão",
    emoji: "🏔️"
  },
  {
    year: "2021",
    title: "Morando Juntos",
    description: "Decidimos dar o próximo passo e construir nosso lar",
    emoji: "🏡"
  },
  {
    year: "2023",
    title: "O Pedido",
    description: "Sob as estrelas, Pedro pediu Geórgia em casamento",
    emoji: "💍"
  },
  {
    year: "2026",
    title: "O Grande Dia",
    description: "Finalmente chegou o momento de oficializar nosso amor",
    emoji: "💒"
  }
];

const Historia = () => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const prevPhoto = () => setCurrent((current - 1 + galleryPhotos.length) % galleryPhotos.length);
  const nextPhoto = () => setCurrent((current + 1) % galleryPhotos.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream-50 via-cream-25 to-olive-50">
      <Head>
        <title>Nossa História - Pedro & Geórgia</title>
        <meta name="description" content="A história de amor de Pedro e Geórgia - Do primeiro encontro ao grande dia" />
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
              Nossa História de Amor
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
                <FaHeart className="text-olive-500 text-3xl animate-heartbeat" />
              </motion.div>
              <div className="h-px bg-gradient-to-r from-transparent via-olive-400 to-transparent flex-1 max-w-32"></div>
            </motion.div>

            <motion.p 
              className="text-xl sm:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Uma jornada de amor, cumplicidade e sonhos compartilhados que nos trouxe até aqui
            </motion.p>
          </div>
        </section>

        {/* Nossa História - Texto */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-800 mb-6">
                  Como Tudo Começou
                </h2>
                <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                  <p>
                    Tudo começou em uma tarde de outono de 2018, no café mais charmoso do centro da cidade. 
                    Pedro estava imerso em seu livro favorito quando uma xícara de café decidiu mudar o rumo de nossas vidas.
                  </p>
                  <p>
                    Geórgia, concentrada nos estudos, não viu a xícara escorregar. O acidente que poderia ter sido constrangedor 
                    se transformou no momento mais especial de nossas vidas - foi ali que nossos olhares se cruzaram pela primeira vez.
                  </p>
                  <p>
                    Desde então, cada dia ao lado do outro tem sido uma nova descoberta. Viajamos, sonhamos, 
                    rimos e construímos uma história única, repleta de amor e cumplicidade.
                  </p>
                </div>
              </div>
              
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-olive-200">
                  <Image
                    src="/images/historia/1.jpg"
                    alt="Nosso primeiro encontro"
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section 
          ref={sectionRef}
          className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-50 to-cream-100"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl font-serif font-bold text-center text-stone-800 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Nossa Linha do Tempo
            </motion.h2>

            <div className="relative">
              {/* Linha central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-olive-200 via-sage-400 to-olive-600 hidden lg:block"></div>

              <div className="space-y-8 lg:space-y-16">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                      <motion.div
                        className="bg-cream rounded-2xl p-6 sm:p-8 shadow-lg border border-olive-200"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                          <motion.div
                            className="w-12 h-12 bg-gradient-to-br from-olive-500 to-sage-600 rounded-full flex items-center justify-center text-white shadow-lg text-2xl"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {item.emoji}
                          </motion.div>
                          <span className="text-2xl sm:text-3xl font-bold text-stone-800">{item.year}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-800 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-stone-600 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Ponto central na timeline */}
                    <motion.div
                      className="hidden lg:flex w-6 h-6 bg-cream border-4 border-olive-500 rounded-full z-10 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={isVisible ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.4, duration: 0.4 }}
                    />

                    <div className="flex-1 hidden lg:block"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Galeria de Fotos Melhorada */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl font-serif font-bold text-center text-stone-800 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Nossos Momentos Especiais
            </motion.h2>

            <div className="flex flex-col items-center">
              {/* Carrossel Principal */}
              <motion.div 
                className="relative w-full max-w-4xl h-[400px] sm:h-[500px] lg:h-[600px] mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-olive-200"
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={galleryPhotos[current].src}
                      alt={galleryPhotos[current].alt}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
                    
                    {/* Caption */}
                    <motion.div 
                      className="absolute bottom-6 left-6 right-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-cream text-lg sm:text-xl font-medium bg-stone-900/40 backdrop-blur-sm rounded-lg px-4 py-2">
                        {galleryPhotos[current].caption}
                      </p>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Controles de Navegação */}
                <motion.button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/90 hover:bg-cream rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-olive-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Foto anterior"
                >
                  <FaChevronLeft className="text-stone-800 text-lg" />
                </motion.button>

                <motion.button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/90 hover:bg-cream rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-olive-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Próxima foto"
                >
                  <FaChevronRight className="text-stone-800 text-lg" />
                </motion.button>
              </motion.div>

              {/* Thumbnails */}
              <motion.div 
                className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {galleryPhotos.map((photo, idx) => (
                  <motion.button
                    key={photo.id}
                    onClick={() => setCurrent(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      current === idx 
                        ? 'border-olive-500 scale-110 shadow-lg' 
                        : 'border-stone-200 hover:border-olive-300 hover:scale-105'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                    />
                    {current === idx && (
                      <div className="absolute inset-0 bg-olive-500/20" />
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Indicadores */}
              <motion.div 
                className="flex justify-center gap-2 mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {galleryPhotos.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      current === idx ? 'bg-olive-600 scale-125' : 'bg-stone-300 hover:bg-olive-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    aria-label={`Ir para foto ${idx + 1}`}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Seção Final - Call to Action */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-olive-600 to-sage-700">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Agora é a Sua Vez de Fazer Parte da Nossa História
            </motion.h2>
            
            <motion.p 
              className="text-xl text-cream mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Queremos você ao nosso lado neste momento único. Sua presença tornará nosso dia ainda mais especial!
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/programacao"
                className="bg-cream text-olive-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-cream-50 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Programação
              </motion.a>
              <motion.a
                href="/contato"
                className="border-2 border-cream text-cream px-8 py-4 rounded-full font-semibold text-lg hover:bg-cream hover:text-olive-700 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirmar Presença
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Historia;