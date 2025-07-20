import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaHeart, FaChevronLeft, FaChevronRight, FaExpand, FaTimes, FaPlay, FaPause } from 'react-icons/fa';

// Dados das fotos com mais contexto
const galleryPhotos = Array.from({ length: 70 }, (_, i) => ({
  id: i + 1,
  src: `/images/historia/${i + 1}.jpg`,
  alt: `Momento especial ${i + 1}`,
  caption: [
    "10 de junho de 2017 - Nosso primeiro encontro",
    "Primeira temporada - Momentos de alegria",
    "Praias e viagens da primeira temporada",
    "Reencontro - Segunda temporada começa",
    "Reunindo famílias e amigos",
    "O pedido sob a lua cheia - Praia do Poço da Draga",
    "Noivos - Rumo à terceira temporada"
  ][i] || `Foto ${i + 1}`
}));

// Timeline dos momentos
const timeline = [
  {
    year: "2017",
    title: "Primeira Temporada",
    description: "10 de junho - nos conhecemos em uma ensolarada tarde de sábado. Praias, viagens, festas e shows marcaram esse período especial.",
    emoji: "🌅"
  },
  {
    year: "2018", 
    title: "Caminhos Diferentes",
    description: "Decidimos seguir caminhos diferentes, sem saber que era apenas um 'até logo'.",
    emoji: "🛤️"
  },
  {
    year: "2023",
    title: "Segunda Temporada",
    description: "5 anos depois, nos reencontramos mais maduros e decididos. Reunimos famílias, amigos e pets.",
    emoji: "💫"
  },
  {
    year: "2025",
    title: "O Pedido Especial",
    description: "No nosso simbólico junho, noivamos sob a luz da lua cheia ao som de reggae, indo de bicicleta à praia do poço da draga.",
    emoji: "�‍♀️"
  },
  {
    year: "2026",
    title: "Terceira Temporada",
    description: "Junho de 2026 - enfim casados! O início de nossa terceira e mais especial temporada.",
    emoji: "💒"
  }
];

const Historia = () => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false); // Iniciar parado para evitar hidratação
  const [visibleThumbnails, setVisibleThumbnails] = useState({ start: 0, end: 10 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const thumbnailsPerPage = 10;

  const prevPhoto = () => setCurrent((current - 1 + galleryPhotos.length) % galleryPhotos.length);
  const nextPhoto = () => setCurrent((current + 1) % galleryPhotos.length);
  
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const toggleAutoplay = () => setIsAutoplay(!isAutoplay);

  // Função para navegar pelos thumbnails
  const goToThumbnailPage = (direction: 'prev' | 'next') => {
    if (direction === 'next' && visibleThumbnails.end < galleryPhotos.length) {
      setVisibleThumbnails({
        start: visibleThumbnails.start + thumbnailsPerPage,
        end: Math.min(visibleThumbnails.end + thumbnailsPerPage, galleryPhotos.length)
      });
    } else if (direction === 'prev' && visibleThumbnails.start > 0) {
      setVisibleThumbnails({
        start: Math.max(visibleThumbnails.start - thumbnailsPerPage, 0),
        end: visibleThumbnails.start
      });
    }
  };

  // Atualizar thumbnails visíveis baseado na foto atual
  useEffect(() => {
    if (current < visibleThumbnails.start || current >= visibleThumbnails.end) {
      const newStart = Math.floor(current / thumbnailsPerPage) * thumbnailsPerPage;
      setVisibleThumbnails({
        start: newStart,
        end: Math.min(newStart + thumbnailsPerPage, galleryPhotos.length)
      });
    }
  }, [current]);

  useEffect(() => {
    setIsHydrated(true);
    setIsAutoplay(true); // Ativar autoplay apenas após hidratação
  }, []);

  useEffect(() => {
    if (!isHydrated || !isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryPhotos.length);
    }, 6000); // Mudado de 4000ms para 6000ms (6 segundos)
    return () => clearInterval(interval);
  }, [isHydrated, isAutoplay]);

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
            {isHydrated ? (
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-800 mb-6">
                    Nossa História em Temporadas
                  </h2>
                  <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                    <p>
                      <span className="font-semibold text-olive-700">Primeira Temporada:</span> O que chamamos de nossa primeira temporada começou em uma ensolarada tarde de sábado do dia 10 de junho de 2017, quando nos conhecemos. A partir daí, vivemos muitos momentos felizes: praias, viagens, festas, shows, comemoramos o aniversário do Pedro e até passamos o reveillon juntos.
                    </p>
                    <p>
                      Mas logo após, resolvemos seguir caminhos diferentes. Mal a gente sabia que seria apenas um "até logo"...
                    </p>
                    <p>
                      <span className="font-semibold text-olive-700">Segunda Temporada:</span> 5 anos depois, nos reencontraríamos, só que desta vez mais maduros e decididos. Reunimos famílias, amigos, pets e, no mesmo junho que nos conhecemos, noivamos sob a luz da lua cheia ao som de reggae no passeio favorito da Geórgia: indo de bicicleta à praia do poço da draga.
                    </p>
                    <p>
                      <span className="font-semibold text-olive-700">Terceira Temporada:</span> No nosso simbólico junho, em 2026, começará nossa terceira temporada: enfim casados! E vocês estão convidados a testemunhar e celebrar esse momento de muito amor, emoção e felicidade.
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
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-800 mb-6">
                    Nossa História em Temporadas
                  </h2>
                  <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                    <p>
                      <span className="font-semibold text-olive-700">Primeira Temporada:</span> O que chamamos de nossa primeira temporada começou em uma ensolarada tarde de sábado do dia 10 de junho de 2017, quando nos conhecemos. A partir daí, vivemos muitos momentos felizes: praias, viagens, festas, shows, comemoramos o aniversário do Pedro e até passamos o reveillon juntos.
                    </p>
                    <p>
                      Mas logo após, resolvemos seguir caminhos diferentes. Mal a gente sabia que seria apenas um "até logo"...
                    </p>
                    <p>
                      <span className="font-semibold text-olive-700">Segunda Temporada:</span> 5 anos depois, nos reencontraríamos, só que desta vez mais maduros e decididos. Reunimos famílias, amigos, pets e, no mesmo junho que nos conhecemos, noivamos sob a luz da lua cheia ao som de reggae no passeio favorito da Geórgia: indo de bicicleta à praia do poço da draga.
                    </p>
                    <p>
                      <span className="font-semibold text-olive-700">Terceira Temporada:</span> No nosso simbólico junho, em 2026, começará nossa terceira temporada: enfim casados! E vocês estão convidados a testemunhar e celebrar esse momento de muito amor, emoção e felicidade.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
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
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Timeline */}
        <section 
          ref={sectionRef}
          className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-50 to-cream-100"
        >
          <div className="max-w-6xl mx-auto">
            {isHydrated ? (
              <motion.h2 
                className="text-3xl sm:text-4xl font-serif font-bold text-center text-stone-800 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                Nossa Linha do Tempo
              </motion.h2>
            ) : (
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-stone-800 mb-16">
                Nossa Linha do Tempo
              </h2>
            )}

            <div className="relative">
              {/* Linha central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-olive-200 via-sage-400 to-olive-600 hidden lg:block"></div>

              <div className="space-y-8 lg:space-y-16">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                      {isHydrated ? (
                        <motion.div
                          className="bg-cream rounded-2xl p-6 sm:p-8 shadow-lg border border-olive-200"
                          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                          animate={isVisible ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.2, duration: 0.8 }}
                          whileHover={{ y: -5, scale: 1.02 }}
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
                      ) : (
                        <div className="bg-cream rounded-2xl p-6 sm:p-8 shadow-lg border border-olive-200">
                          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-olive-500 to-sage-600 rounded-full flex items-center justify-center text-white shadow-lg text-2xl">
                              {item.emoji}
                            </div>
                            <span className="text-2xl sm:text-3xl font-bold text-stone-800">{item.year}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-800 mb-3">
                            {item.title}
                          </h3>
                          <p className="text-stone-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Ponto central na timeline */}
                    {isHydrated ? (
                      <motion.div
                        className="hidden lg:flex w-6 h-6 bg-cream border-4 border-olive-500 rounded-full z-10 shadow-lg"
                        initial={{ scale: 0 }}
                        animate={isVisible ? { scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.4, duration: 0.4 }}
                      />
                    ) : (
                      <div className="hidden lg:flex w-6 h-6 bg-cream border-4 border-olive-500 rounded-full z-10 shadow-lg" />
                    )}

                    <div className="flex-1 hidden lg:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Galeria de Fotos Otimizada */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {isHydrated ? (
              <motion.h2 
                className="text-3xl sm:text-4xl font-serif font-bold text-center text-stone-800 mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Nossos Momentos Especiais
              </motion.h2>
            ) : (
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-stone-800 mb-16">
                Nossos Momentos Especiais
              </h2>
            )}

            <div className="flex flex-col items-center">
              {/* Carrossel Principal */}
              {isHydrated ? (
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
                      transition={{ duration: 0.8 }} // Mudado de 0.5s para 0.8s para transição mais suave
                    >
                      <Image
                        src={galleryPhotos[current].src}
                        alt={galleryPhotos[current].alt}
                        fill
                        className="object-cover"
                        priority={current < 3}
                        quality={85}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHBE//EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      
                      {/* Overlay com controles */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-stone-900/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={toggleAutoplay}
                            className="w-10 h-10 bg-stone-900/60 hover:bg-stone-900/80 text-white rounded-full flex items-center justify-center transition-colors"
                            aria-label={isAutoplay ? 'Pausar slideshow' : 'Iniciar slideshow'}
                          >
                            {isAutoplay ? <FaPause className="text-sm" /> : <FaPlay className="text-sm" />}
                          </button>
                          <button
                            onClick={toggleFullscreen}
                            className="w-10 h-10 bg-stone-900/60 hover:bg-stone-900/80 text-white rounded-full flex items-center justify-center transition-colors"
                            aria-label="Tela cheia"
                          >
                            <FaExpand className="text-sm" />
                          </button>
                        </div>
                        
                        {/* Contador de fotos */}
                        <div className="absolute bottom-4 left-4 bg-stone-900/60 text-white px-3 py-1 rounded-full text-sm">
                          {current + 1} / {galleryPhotos.length}
                        </div>
                      </div>
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
              ) : (
                <div className="relative w-full max-w-4xl h-[400px] sm:h-[500px] lg:h-[600px] mb-8">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-olive-200">
                    <Image
                      src={galleryPhotos[current].src}
                      alt={galleryPhotos[current].alt}
                      fill
                      className="object-cover"
                      priority={current < 3}
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHBE//EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>

                  {/* Controles de Navegação */}
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/90 hover:bg-cream rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-olive-200"
                    aria-label="Foto anterior"
                  >
                    <FaChevronLeft className="text-stone-800 text-lg" />
                  </button>

                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/90 hover:bg-cream rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-olive-200"
                    aria-label="Próxima foto"
                  >
                    <FaChevronRight className="text-stone-800 text-lg" />
                  </button>
                </div>
              )}

              {/* Thumbnails Paginados */}
              {isHydrated ? (
                <motion.div 
                  className="w-full max-w-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <button
                      onClick={() => goToThumbnailPage('prev')}
                      disabled={visibleThumbnails.start === 0}
                      className={`p-3 rounded-lg transition-colors ${
                        visibleThumbnails.start === 0 
                          ? 'text-stone-300 cursor-not-allowed' 
                          : 'text-stone-600 hover:text-olive-600 hover:bg-olive-50'
                      }`}
                      aria-label="Página anterior de thumbnails"
                    >
                      <FaChevronLeft />
                    </button>
                    
                    <div className="mx-6 flex space-x-2">
                      {Array.from({ length: Math.ceil(galleryPhotos.length / thumbnailsPerPage) }, (_, i) => {
                        const isActive = i === Math.floor(visibleThumbnails.start / thumbnailsPerPage);
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              const newStart = i * thumbnailsPerPage;
                              setVisibleThumbnails({
                                start: newStart,
                                end: Math.min(newStart + thumbnailsPerPage, galleryPhotos.length)
                              });
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              isActive ? 'bg-olive-600 scale-125' : 'bg-stone-300 hover:bg-olive-300'
                            }`}
                            aria-label={`Página ${i + 1} de thumbnails`}
                          />
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => goToThumbnailPage('next')}
                      disabled={visibleThumbnails.end >= galleryPhotos.length}
                      className={`p-3 rounded-lg transition-colors ${
                        visibleThumbnails.end >= galleryPhotos.length 
                          ? 'text-stone-300 cursor-not-allowed' 
                          : 'text-stone-600 hover:text-olive-600 hover:bg-olive-50'
                      }`}
                      aria-label="Próxima página de thumbnails"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                  
                  <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                    {galleryPhotos.slice(visibleThumbnails.start, visibleThumbnails.end).map((photo, idx) => {
                      const actualIdx = visibleThumbnails.start + idx;
                      return (
                        <motion.button
                          key={photo.id}
                          onClick={() => setCurrent(actualIdx)}
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            current === actualIdx 
                              ? 'border-olive-500 scale-110 shadow-lg' 
                              : 'border-stone-200 hover:border-olive-300 hover:scale-105'
                          }`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Ir para foto ${actualIdx + 1}`}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover"
                            sizes="80px"
                            quality={75}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          />
                          {current === actualIdx && (
                            <div className="absolute inset-0 bg-olive-500/20" />
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-stone-900/60 text-white text-xs text-center py-1">
                            {actualIdx + 1}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <div className="w-full max-w-4xl">
                  <div className="flex items-center justify-center mb-4">
                    <button
                      onClick={() => goToThumbnailPage('prev')}
                      disabled={visibleThumbnails.start === 0}
                      className={`p-3 rounded-lg transition-colors ${
                        visibleThumbnails.start === 0 
                          ? 'text-stone-300 cursor-not-allowed' 
                          : 'text-stone-600 hover:text-olive-600 hover:bg-olive-50'
                      }`}
                      aria-label="Página anterior de thumbnails"
                    >
                      <FaChevronLeft />
                    </button>
                    
                    <div className="mx-6 flex space-x-2">
                      {Array.from({ length: Math.ceil(galleryPhotos.length / thumbnailsPerPage) }, (_, i) => {
                        const isActive = i === Math.floor(visibleThumbnails.start / thumbnailsPerPage);
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              const newStart = i * thumbnailsPerPage;
                              setVisibleThumbnails({
                                start: newStart,
                                end: Math.min(newStart + thumbnailsPerPage, galleryPhotos.length)
                              });
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              isActive ? 'bg-olive-600 scale-125' : 'bg-stone-300 hover:bg-olive-300'
                            }`}
                            aria-label={`Página ${i + 1} de thumbnails`}
                          />
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => goToThumbnailPage('next')}
                      disabled={visibleThumbnails.end >= galleryPhotos.length}
                      className={`p-3 rounded-lg transition-colors ${
                        visibleThumbnails.end >= galleryPhotos.length 
                          ? 'text-stone-300 cursor-not-allowed' 
                          : 'text-stone-600 hover:text-olive-600 hover:bg-olive-50'
                      }`}
                      aria-label="Próxima página de thumbnails"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                  
                  <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                    {galleryPhotos.slice(visibleThumbnails.start, visibleThumbnails.end).map((photo, idx) => {
                      const actualIdx = visibleThumbnails.start + idx;
                      return (
                        <button
                          key={photo.id}
                          onClick={() => setCurrent(actualIdx)}
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            current === actualIdx 
                              ? 'border-olive-500 scale-110 shadow-lg' 
                              : 'border-stone-200 hover:border-olive-300 hover:scale-105'
                          }`}
                          aria-label={`Ir para foto ${actualIdx + 1}`}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover"
                            sizes="80px"
                            quality={75}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          />
                          {current === actualIdx && (
                            <div className="absolute inset-0 bg-olive-500/20" />
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-stone-900/60 text-white text-xs text-center py-1">
                            {actualIdx + 1}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Barra de Progresso */}
              {isHydrated ? (
                <motion.div 
                  className="w-full max-w-2xl mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-2 bg-stone-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-olive-500 to-sage-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((current + 1) / galleryPhotos.length) * 100}%` }}
                      transition={{ duration: 0.6 }} // Mudado de 0.3s para 0.6s para acompanhar o ritmo
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-stone-500">
                    <span>Início</span>
                    <span className="font-medium text-olive-600">{current + 1} de {galleryPhotos.length}</span>
                    <span>Fim</span>
                  </div>
                </motion.div>
              ) : (
                <div className="w-full max-w-2xl mt-6">
                  <div className="relative h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-olive-500 to-sage-600 rounded-full transition-all duration-300"
                      style={{ width: `${((current + 1) / galleryPhotos.length) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-stone-500">
                    <span>Início</span>
                    <span className="font-medium text-olive-600">{current + 1} de {galleryPhotos.length}</span>
                    <span>Fim</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Modal Fullscreen */}
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  className="relative max-w-7xl max-h-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }} // Mudado de 0.3s para 0.5s para transição mais suave
                >
                  <Image
                    src={galleryPhotos[current].src}
                    alt={galleryPhotos[current].alt}
                    width={1200}
                    height={800}
                    className="object-contain max-w-full max-h-full rounded-lg"
                    priority
                    quality={90}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </motion.div>
              </AnimatePresence>

              {/* Controles Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 w-12 h-12 bg-stone-900/60 hover:bg-stone-900/80 text-white rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Fechar tela cheia"
              >
                <FaTimes className="text-lg" />
              </button>

              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-stone-900/60 hover:bg-stone-900/80 text-white rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Foto anterior"
              >
                <FaChevronLeft className="text-xl" />
              </button>

              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-stone-900/60 hover:bg-stone-900/80 text-white rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Próxima foto"
              >
                <FaChevronRight className="text-xl" />
              </button>

              {/* Info da foto */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-stone-900/60 text-white px-4 py-2 rounded-full text-sm">
                {current + 1} de {galleryPhotos.length}
              </div>
            </div>
          </div>
        )}

        {/* Seção Final - Call to Action */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-olive-600 to-sage-700">
          <div className="max-w-4xl mx-auto text-center">
            {isHydrated ? (
              <>
                <motion.h2 
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Agora é a Sua Vez de Fazer Parte da Nossa História
                </motion.h2>
                
                <motion.p 
                  className="text-xl text-white mb-8 leading-relaxed"
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
                    className="bg-white hover:bg-cream text-olive-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Programação
                  </motion.a>
                  <motion.a
                    href="/contato"
                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-olive-700 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Confirmar Presença
                  </motion.a>
                </motion.div>
              </>
            ) : (
              <>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                  Agora é a Sua Vez de Fazer Parte da Nossa História
                </h2>
                
                <p className="text-xl text-white mb-8 leading-relaxed">
                  Queremos você ao nosso lado neste momento único. Sua presença tornará nosso dia ainda mais especial!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/programacao"
                    className="bg-white hover:bg-cream text-olive-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg"
                  >
                    Ver Programação
                  </a>
                  <a
                    href="/contato"
                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-olive-700 transition-all duration-300"
                  >
                    Confirmar Presença
                  </a>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Historia;