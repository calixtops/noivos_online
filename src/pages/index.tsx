import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Countdown from '../components/Countdown';
import { FaHeart, FaCalendarAlt } from 'react-icons/fa';

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
                {/* Ramos decorativos - Simplificados */}
                <img 
                  src="/images/auxiliares/rama.png" 
                  alt="Ramo decorativo"
                  className="absolute top-2 left-2 sm:top-4 sm:left-4 w-12 sm:w-16 lg:w-20 h-auto opacity-50"
                />
                <img 
                  src="/images/auxiliares/rama.png" 
                  alt="Ramo decorativo"
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 w-12 sm:w-16 lg:w-20 h-auto opacity-50 scale-x-[-1]"
                />
                
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
                    <div className="text-3xl text-olive-600 my-2">
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
              <div className="bg-white/60 border border-olive-200 rounded-lg p-8 text-center">
                <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-olive-600 text-lg" />
                </div>
                <h3 className="font-serif text-xl text-olive-800 mb-3">Cerimônia</h3>
                <p className="text-stone-600 mb-2">16:00h</p>
                <p className="text-stone-600 text-sm">Casa Branca Eventos</p>
                <p className="text-stone-600 text-sm">Aquiraz - CE</p>
              </div>

              {/* Recepção */}
              <div className="bg-white/60 border border-olive-200 rounded-lg p-8 text-center">
                <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-olive-600 text-lg" />
                </div>
                <h3 className="font-serif text-xl text-olive-800 mb-3">Recepção</h3>
                <p className="text-stone-600 mb-2">17:30h</p>
                <p className="text-stone-600 text-sm">Mesmo local</p>
                <p className="text-stone-600 text-sm">Jantar & Festa</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-olive-700 text-cream-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              Sua Presença é o Nosso Maior Presente
            </h2>
            
            <p className="text-cream-200 mb-8 max-w-2xl mx-auto">
              Estamos ansiosos para compartilhar este momento especial com você
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/programacao"
                className="bg-cream-100 text-olive-800 px-8 py-3 rounded-lg font-medium hover:bg-cream-200 transition-colors duration-300"
              >
                Ver Programação
              </a>
              <a
                href="/contato"
                className="border border-cream-200 text-cream-100 px-8 py-3 rounded-lg font-medium hover:bg-cream-100 hover:text-olive-800 transition-all duration-300"
              >
                Confirmar Presença
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
