import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Dados das fotos (ajuste para os nomes reais)
const galleryPhotos = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/images/historia/${i + 1}.jpg`,
  alt: `Foto ${i + 1}`
}));

const Historia = () => {
  const [current, setCurrent] = useState(0);

  const prevPhoto = () => setCurrent((current - 1 + galleryPhotos.length) % galleryPhotos.length);
  const nextPhoto = () => setCurrent((current + 1) % galleryPhotos.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [galleryPhotos.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Nossa História - Pedro & Geórgia</title>
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <motion.h1 
          className="text-4xl font-serif text-center text-rose-700 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Nossa História
        </motion.h1>
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="prose prose-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p>
              Tudo começou em uma tarde de outono, em 2018, quando nos conhecemos em um café no centro da cidade. 
              Pedro estava lendo seu livro favorito e Geórgia estava estudando para uma prova. 
              Uma xícara de café derramada foi o início de tudo...
            </p>
            <p>
              Desde então, compartilhamos inúmeras aventuras. Viajamos juntos para a praia, montanhas, 
              exploramos novas culinárias e criamos memórias inesquecíveis. 
              Cada momento ao lado do outro foi especial e nos aproximou cada vez mais.
            </p>
            <p>
              Em 2023, durante um jantar romântico sob as estrelas, Pedro surpreendeu Geórgia com um pedido de casamento. 
              Com lágrimas nos olhos e um sorriso no rosto, ela disse "sim" sem hesitar. 
              Agora, estamos contando os dias para o nosso grande dia e mal podemos esperar para compartilhar essa alegria com você.
            </p>
          </motion.div>
          <motion.h2 
            className="text-2xl font-serif text-rose-700 mt-16 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Nossos Momentos
          </motion.h2>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl h-[32rem] flex items-center justify-center">
              <button
                onClick={prevPhoto}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-rose-100 transition"
                aria-label="Foto anterior"
              >
                <svg className="h-6 w-6 text-rose-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-full h-[32rem] flex items-center justify-center bg-black rounded-lg shadow">
                <Image
                  src={galleryPhotos[current].src}
                  alt=""
                  width={900}
                  height={900}
                  className="object-contain w-full h-full rounded-lg"
                  priority={true}
                />
              </div>
              <button
                onClick={nextPhoto}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-rose-100 transition"
                aria-label="Próxima foto"
              >
                <svg className="h-6 w-6 text-rose-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {galleryPhotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${current === idx ? 'bg-rose-700' : 'bg-gray-300'} transition`}
                  aria-label={`Ir para foto ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Historia;