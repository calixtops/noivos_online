import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Countdown from '../components/Countdown';
import { FaHeart, FaCalendarAlt, FaSpotify, FaMusic, FaUsers, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream-50 via-cream-100 to-olive-50">
      <Head>
        <title>Geórgia & Pedro - 06 de Junho de 2026</title>
        <meta name="description" content="Celebrando o amor de Geórgia e Pedro em 06 de Junho de 2026" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        <section className="relative py-16 sm:py-24 bg-gradient-to-br from-cream-50 via-sage-50 to-olive-50 min-h-[80vh] flex items-center">
          {/* Arte de fundo sutil */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{ backgroundImage: 'url(/images/auxiliares/arte_rai.jpg)' }}
          ></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative max-w-4xl mx-auto">
              {/* Container com decorações */}
              <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg border border-white/30">
                {/* Nomes principais - Responsivo */}
                <div className="mb-8">
                  {/* Versão Desktop */}
                  <h1 className="hidden sm:block font-script text-6xl sm:text-7xl lg:text-8xl text-olive-800 leading-tight">
                    Geórgia & Pedro
                  </h1>
                  
                  {/* Versão Mobile */}
                  <div className="block sm:hidden text-center">
                    <h1 className="font-script text-4xl text-olive-800 leading-tight">
                      Geórgia
                    </h1>
                    <div className="font-script text-3xl text-olive-600 my-2">
                      &
                    </div>
                    <h1 className="font-script text-4xl text-olive-800 leading-tight">
                      Pedro
                    </h1>
                  </div>
                </div>
                
                {/* Linha decorativa */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-olive-300 w-32"></div>
                  <FaHeart className="text-olive-600 text-lg" />
                  <div className="h-px bg-olive-300 w-32"></div>
                </div>
                
                {/* Convite */}
                <p className="text-lg text-olive-700 mb-8 max-w-2xl mx-auto">
                  Com imenso carinho, convidam você para celebrar o início de nossa jornada como família
                </p>

                {/* Data */}
                <div className="inline-block bg-olive-100 border-2 border-olive-300 rounded-xl px-6 py-4 sm:px-10 sm:py-5 shadow-lg mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 text-olive-800">
                    <FaCalendarAlt className="text-olive-600 text-lg sm:text-xl" />
                    <span className="font-serif text-xl sm:text-2xl font-semibold">06 de Junho de 2026</span>
                  </div>
                </div>

                {/* Contagem Regressiva */}
                <div className="mt-8">
                  <h3 className="font-serif text-lg sm:text-xl text-olive-700 mb-4">
                    Faltam apenas:
                  </h3>
                  <Countdown targetDate="2026-06-06T16:00:00" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detalhes do Evento */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-cream-50 to-olive-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl text-olive-800 mb-4">
                Detalhes da Celebração
              </h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-px bg-olive-300"></div>
                <FaHeart className="text-olive-400 text-sm" />
                <div className="w-8 h-px bg-olive-300"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Cerimônia */}
              <div className="bg-white/60 border border-olive-200 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-olive-100 to-olive-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <div className="text-2xl">💒</div>
                </div>
                <h3 className="font-serif text-2xl text-olive-800 mb-4">Cerimônia</h3>
                <div className="space-y-2">
                  <p className="text-olive-700 font-semibold text-lg">16:00h</p>
                  <p className="text-stone-600 font-medium">Casa Branca Eventos</p>
                  <p className="text-stone-600">Aquiraz - CE</p>
                  <div className="mt-4 pt-4 border-t border-olive-200">
                    <p className="text-stone-500 text-sm">União das almas</p>
                  </div>
                </div>
              </div>

              {/* Recepção */}
              <div className="bg-white/60 border border-olive-200 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-olive-100 to-olive-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <div className="text-2xl">🎉</div>
                </div>
                <h3 className="font-serif text-2xl text-olive-800 mb-4">Recepção</h3>
                <div className="space-y-2">
                  <p className="text-olive-700 font-semibold text-lg">18:00h</p>
                  <p className="text-stone-600 font-medium">Mesmo local</p>
                  <p className="text-stone-600">Jantar & Festa</p>
                  <div className="mt-4 pt-4 border-t border-olive-200">
                    <p className="text-stone-500 text-sm">Celebração da vida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-olive-700 text-cream-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl mb-4">
                Sua Presença é o Nosso Maior Presente
              </h2>
              
              <p className="text-cream-200 text-lg max-w-2xl mx-auto leading-relaxed">
                Estamos ansiosos para compartilhar este momento especial com você. 
                Explore todas as informações do nosso grande dia!
              </p>
            </div>
            
            {/* Grid de Links Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <a
                href="/programacao"
                className="group bg-cream-100/10 backdrop-blur-sm border border-cream-200/30 text-cream-100 px-6 py-4 rounded-xl hover:bg-cream-100 hover:text-olive-800 transition-all duration-300 text-center"
              >
                <div className="text-2xl mb-2">📅</div>
                <div className="font-semibold">Programação</div>
                <div className="text-sm opacity-75 group-hover:opacity-100">Horários do evento</div>
              </a>
              
              <a
                href="/presentes"
                className="group bg-cream-100/10 backdrop-blur-sm border border-cream-200/30 text-cream-100 px-6 py-4 rounded-xl hover:bg-cream-100 hover:text-olive-800 transition-all duration-300 text-center"
              >
                <div className="text-2xl mb-2">🎁</div>
                <div className="font-semibold">Lista de Presentes</div>
                <div className="text-sm opacity-75 group-hover:opacity-100">Presentear os noivos</div>
              </a>
              
              <a
                href="/pousadas"
                className="group bg-cream-100/10 backdrop-blur-sm border border-cream-200/30 text-cream-100 px-6 py-4 rounded-xl hover:bg-cream-100 hover:text-olive-800 transition-all duration-300 text-center"
              >
                <div className="text-2xl mb-2">🏨</div>
                <div className="font-semibold">Hospedagem</div>
                <div className="text-sm opacity-75 group-hover:opacity-100">Onde se hospedar</div>
              </a>
              
              <a
                href="/historia"
                className="group bg-cream-100/10 backdrop-blur-sm border border-cream-200/30 text-cream-100 px-6 py-4 rounded-xl hover:bg-cream-100 hover:text-olive-800 transition-all duration-300 text-center"
              >
                <div className="text-2xl mb-2">💕</div>
                <div className="font-semibold">Nossa História</div>
                <div className="text-sm opacity-75 group-hover:opacity-100">Como tudo começou</div>
              </a>
            </div>
            
            {/* Botões de Ação Principais */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="bg-cream-100 text-olive-800 px-8 py-4 rounded-full font-semibold hover:bg-cream-200 transition-colors duration-300 text-center shadow-lg"
              >
                🤝 Confirmar Presença
              </a>
              <a
                href="/playlist"
                className="border-2 border-cream-200 text-cream-100 px-8 py-4 rounded-full font-semibold hover:bg-cream-100 hover:text-olive-800 transition-all duration-300 text-center"
              >
                🎵 Contribuir na Playlist
              </a>
            </div>
          </div>
        </section>

        {/* Playlist Colaborativa Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-olive-50 to-green-50 relative overflow-hidden">
          {/* Elementos decorativos de fundo */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-olive-400 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-300 rounded-full blur-2xl"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto">
              {/* Header da Seção */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="relative">
                    <FaSpotify className="text-5xl text-green-500" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <h2 className="font-serif text-4xl sm:text-5xl text-olive-800">
                    Nossa Playlist Colaborativa
                  </h2>
                </div>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Ajude-nos a criar a trilha sonora perfeita para nossa celebração! 
                  Contribua com suas músicas favoritas e faça parte da nossa playlist especial.
                </p>
              </motion.div>

              {/* Cards de Benefícios */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUsers className="text-2xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Colaboração</h3>
                  <p className="text-gray-600">
                    Todos podem contribuir com suas músicas favoritas para criar uma playlist única
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaMusic className="text-2xl text-olive-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Diversidade</h3>
                  <p className="text-gray-600">
                    Músicas de diferentes estilos e épocas para agradar a todos os convidados
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaSpotify className="text-2xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Spotify</h3>
                  <p className="text-gray-600">
                    Integração completa com o Spotify para uma experiência musical perfeita
                  </p>
                </motion.div>
              </div>

              {/* Call to Action Principal */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-gradient-to-r from-green-500 to-olive-600 rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Faça Parte da Nossa História Musical
                  </h3>
                  <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                    Conecte-se com o Spotify e adicione suas músicas favoritas à nossa playlist colaborativa. 
                    Cada música será uma lembrança especial de quem você é para nós.
                  </p>
                  
                  <Link href="/playlist">
                    <motion.button
                      className="group bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaSpotify className="text-xl" />
                      <span>Participar da Playlist</span>
                      <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Transição elegante para o footer */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white/30 pointer-events-none"></div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
