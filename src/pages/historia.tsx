import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaHeart, FaChevronLeft, FaChevronRight, FaExpand, FaTimes, FaPlay, FaPause } from 'react-icons/fa';

// Interface para as fotos
interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

// Timeline dos momentos
const timeline = [
  {
    year: "2018",
    title: "Primeiro Encontro",
    description: "Um encontro casual em uma cafeteria no centro da cidade. Uma conversa que durou horas e mudou nossas vidas para sempre. Naquele dia, soubemos que algo especial estava acontecendo.",
    emoji: "☕"
  },
  {
    year: "2019", 
    title: "Primeiros Passos",
    description: "Começamos a nos conhecer melhor, compartilhando sonhos, risadas e momentos especiais. Cada encontro era uma nova descoberta sobre o outro.",
    emoji: "💕"
  },
  {
    year: "2020",
    title: "Superando Desafios",
    description: "Um ano de desafios que nos aproximou ainda mais. Aprendemos a valorizar cada momento juntos e a importância de estar presente na vida um do outro.",
    emoji: "🌟"
  },
  {
    year: "2021",
    title: "Primeira Viagem",
    description: "Nossa primeira viagem juntos! Descobrimos novos lugares, criamos memórias inesquecíveis e confirmamos que queremos compartilhar muitas aventuras.",
    emoji: "✈️"
  },
  {
    year: "2022",
    title: "Morando Juntos",
    description: "Decidimos dar o próximo passo e começamos a morar juntos. Aprendemos a conviver, a dividir responsabilidades e a construir nosso lar.",
    emoji: "🏠"
  },
  {
    year: "2023",
    title: "O Pedido de Casamento",
    description: "Em uma noite mágica, no local do nosso primeiro encontro, João fez o pedido mais importante de nossas vidas. Um momento perfeito que nunca esqueceremos.",
    emoji: "💍"
  },
  {
    year: "2024",
    title: "Nosso Grande Dia",
    description: "15 de dezembro de 2024 - enfim casados! O início de nossa jornada como família, celebrando o amor e a união de duas almas.",
    emoji: "💒"
  }
];

const Historia = () => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [visibleThumbnails, setVisibleThumbnails] = useState({ start: 0, end: 10 });
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const thumbnailsPerPage = 10;

  // Função para carregar fotos dinamicamente
  const loadPhotos = async () => {
    setIsLoadingPhotos(true);
    try {
      const fallbackPhotos: Photo[] = [];
      
      // Tenta carregar até 100 fotos com padrão "image (X).jpeg"
      for (let i = 1; i <= 100; i++) {
        const extensions = ['jpeg', 'jpg', 'png', 'webp'];
        let photoFound = false;
        
        for (const ext of extensions) {
          // Padrão: "image (1).jpeg", "image (2).jpeg", etc.
          const photoPath = `/images/historia/image (${i}).${ext}`;
          
          try {
            const response = await fetch(photoPath, { method: 'HEAD' });
            if (response.ok) {
              fallbackPhotos.push({
                id: i,
                src: photoPath,
                alt: `Momento especial ${i}`,
                caption: getPhotoCaption(i)
              });
              photoFound = true;
              break;
            }
          } catch {
            continue;
          }
        }
        
        // Se não encontrou foto por 5 números consecutivos, para a busca
        if (!photoFound) {
          let consecutiveNotFound = 0;
          for (let j = i; j < i + 5; j++) {
            let foundInRange = false;
            for (const ext of extensions) {
              try {
                const response = await fetch(`/images/historia/image (${j}).${ext}`, { method: 'HEAD' });
                if (response.ok) {
                  foundInRange = true;
                  break;
                }
              } catch {
                continue;
              }
            }
            if (!foundInRange) consecutiveNotFound++;
          }
          if (consecutiveNotFound >= 5) break;
        }
      }
      
      setGalleryPhotos(fallbackPhotos);
    } catch (error) {
      console.log('Erro ao carregar fotos, usando fallback básico');
      const basicPhotos: Photo[] = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        src: `/images/historia/image (${i + 1}).jpeg`,
        alt: `Momento especial ${i + 1}`,
        caption: getPhotoCaption(i + 1)
      }));
      setGalleryPhotos(basicPhotos);
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  // Função para gerar legendas baseadas no número da foto
  const getPhotoCaption = (photoNumber: number): string => {
    const captions = [
      "Nosso primeiro encontro - O início de tudo",
      "Primeiros momentos juntos - Descobrindo o amor", 
      "Momentos especiais - Construindo memórias",
      "Nossa primeira viagem - Aventuras juntos",
      "Celebrando conquistas - Cada passo importa",
      "Momentos em família - Unindo laços",
      "O pedido de casamento - Noite mágica",
      "Preparativos do casamento - Sonhos se realizando",
      "Ensaio fotográfico - Capturando momentos",
      "Celebração com amigos - Compartilhando alegria",
      "Momentos românticos - Amor em cada detalhe",
      "Aventuras e descobertas - Explorando o mundo juntos",
      "Construindo nosso lar - Sonhos se materializando",
      "Momentos de reflexão - Gratidão por tudo",
      "Celebrando o amor - Cada dia é especial"
    ];
    
    if (photoNumber <= captions.length) {
      return captions[photoNumber - 1];
    } else {
      const genericCaptions = [
        "Momentos especiais juntos",
        "Construindo nossa história",
        "Amor em cada detalhe",
        "Memórias inesquecíveis",
        "Sonhos se realizando",
        "Aventuras compartilhadas",
        "Momentos de felicidade",
        "Celebrando nossa união",
        "Cada dia é uma nova descoberta",
        "Amor que cresce a cada momento"
      ];
      
      const index = (photoNumber - captions.length - 1) % genericCaptions.length;
      return genericCaptions[index];
    }
  };

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
    if (galleryPhotos.length > 0 && (current < visibleThumbnails.start || current >= visibleThumbnails.end)) {
      const newStart = Math.floor(current / thumbnailsPerPage) * thumbnailsPerPage;
      setVisibleThumbnails({
        start: newStart,
        end: Math.min(newStart + thumbnailsPerPage, galleryPhotos.length)
      });
    }
  }, [current, galleryPhotos.length]);

  useEffect(() => {
    setIsHydrated(true);
    setIsAutoplay(true);
    loadPhotos();
  }, []);

  useEffect(() => {
    if (!isHydrated || !isAutoplay || galleryPhotos.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryPhotos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHydrated, isAutoplay, galleryPhotos.length]);

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
        <title>Nossa História - João & Maria</title>
        <meta name="description" content="A história de amor de João e Maria - Do primeiro encontro ao grande dia" />
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
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-800 mb-6">
                Nossa História de Amor
              </h2>
              <div className="space-y-6 text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto">
                <p>
                  <span className="font-semibold text-olive-700">Primeiro Encontro:</span> Nossa história começou em uma ensolarada tarde de março de 2018, quando nos conhecemos em uma cafeteria no centro da cidade. O que deveria ser apenas uma conversa rápida se transformou em horas de risadas, sonhos compartilhados e a certeza de que algo especial estava acontecendo.
                </p>
                <p>
                  Desde então, cada dia tem sido uma nova aventura. Aprendemos a nos conhecer, a nos apoiar e a crescer juntos. Nossa jornada tem sido marcada por momentos especiais, desafios superados e muito amor.
                </p>
                <p>
                  <span className="font-semibold text-olive-700">Nosso Grande Dia:</span> Em dezembro de 2024, celebramos o início de nossa jornada como família. E vocês estão convidados a testemunhar e celebrar esse momento de muito amor, emoção e felicidade.
                </p>
              </div>
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
                  <div
                    key={item.year}
                    className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
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
                    </div>

                    {/* Ponto central na timeline */}
                    <motion.div
                      className="hidden lg:flex w-6 h-6 bg-cream border-4 border-olive-500 rounded-full z-10 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={isVisible ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.4, duration: 0.4 }}
                    />

                    <div className="flex-1 hidden lg:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Galeria de Fotos */}
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
              {/* Loading state */}
              {isLoadingPhotos ? (
                <div className="relative w-full max-w-4xl h-[400px] sm:h-[500px] lg:h-[600px] mb-8 flex items-center justify-center">
                  <div className="bg-cream rounded-2xl border border-olive-200 w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        className="w-16 h-16 border-4 border-olive-500 border-t-transparent rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="text-olive-700 font-medium">Carregando nossas fotos...</p>
                    </div>
                  </div>
                </div>
              ) : galleryPhotos.length === 0 ? (
                <div className="relative w-full max-w-4xl h-[400px] sm:h-[500px] lg:h-[600px] mb-8 flex items-center justify-center">
                  <div className="bg-cream rounded-2xl border border-olive-200 w-full h-full flex items-center justify-center">
                    <p className="text-olive-700 font-medium">Nenhuma foto encontrada</p>
                  </div>
                </div>
              ) : (
                <>
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
                      transition={{ duration: 0.8 }}
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
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHBE//EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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

                {/* Thumbnails Paginados */}
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
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Barra de Progresso */}
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
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-stone-500">
                    <span>Início</span>
                    <span className="font-medium text-olive-600">{current + 1} de {galleryPhotos.length}</span>
                    <span>Fim</span>
                  </div>
                </motion.div>
                </>
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
                  transition={{ duration: 0.5 }}
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Historia;