import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Countdown from '../components/Countdown';
import ThemeSelector from '../components/ThemeSelector';
import { useThemeColors } from '../hooks/useThemeColors';
import { useCoupleData } from '../hooks/useCoupleData';
import { FaHeart, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
  const colors = useThemeColors();
  const { coupleData, isLoading } = useCoupleData();
  
  // Se ainda está carregando, mostrar um loading simples
  if (isLoading || !coupleData) {
    return (
      <div className={`min-h-screen flex flex-col ${colors.gradientBackground}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={`${colors.textSecondary}`}>Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${colors.gradientBackground}`}>
      <Head>
        <title>{coupleData.names} - {coupleData.formattedDate}</title>
        <meta name="description" content={`Convite de casamento de ${coupleData.names} - ${coupleData.formattedDate}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className={`relative py-16 sm:py-24 ${colors.gradientBackground} min-h-[80vh] flex items-center`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* Desktop - Layout Profissional */}
              <div className="hidden sm:block">
                <div className="flex flex-col items-center justify-center space-y-2">
                  {/* Primeiro Nome */}
                  <h1 className={`font-forum text-5xl sm:text-6xl lg:text-7xl xl:text-8xl ${colors.textPrimary} leading-none tracking-wide`}>
                    {coupleData.names.split(' e ')[0]}
                  </h1>
                  
                  {/* Separador Elegante */}
                  <div className="flex items-center justify-center gap-3 my-2">
                    <div className={`h-px ${colors.borderSecondary} w-16 sm:w-20`}></div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <FaHeart className={`${colors.textAccent} text-lg sm:text-xl`} />
                    </motion.div>
                    <div className={`h-px ${colors.borderSecondary} w-16 sm:w-20`}></div>
                  </div>
                  
                  {/* Segundo Nome */}
                  <h1 className={`font-forum text-5xl sm:text-6xl lg:text-7xl xl:text-8xl ${colors.textPrimary} leading-none tracking-wide`}>
                    {coupleData.names.split(' e ')[1]}
                  </h1>
                </div>
              </div>
              
              {/* Mobile - Layout Otimizado */}
              <div className="sm:hidden">
                <div className="flex flex-col items-center justify-center space-y-1">
                  {/* Primeiro Nome */}
                  <h1 className={`font-forum text-3xl sm:text-4xl ${colors.textPrimary} leading-tight tracking-wide`}>
                    {coupleData.names.split(' e ')[0]}
                  </h1>
                  
                  {/* Separador Mobile */}
                  <div className="flex items-center justify-center gap-2 my-1">
                    <div className={`h-px ${colors.borderSecondary} w-12`}></div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <FaHeart className={`${colors.textAccent} text-base`} />
                    </motion.div>
                    <div className={`h-px ${colors.borderSecondary} w-12`}></div>
                  </div>
                  
                  {/* Segundo Nome */}
                  <h1 className={`font-forum text-3xl sm:text-4xl ${colors.textPrimary} leading-tight tracking-wide`}>
                    {coupleData.names.split(' e ')[1]}
                  </h1>
                </div>
              </div>
            </motion.div>

            {/* Linha Decorativa Central */}
            <motion.div 
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className={`h-px ${colors.borderSecondary} w-24 sm:w-32 lg:w-40`}></div>
              <div className={`w-2 h-2 ${colors.bgPrimary} rounded-full`}></div>
              <div className={`h-px ${colors.borderSecondary} w-24 sm:w-32 lg:w-40`}></div>
            </motion.div>

            <motion.p 
              className={`text-lg sm:text-xl ${colors.textSecondary} mb-8 max-w-3xl mx-auto leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Com imenso carinho, convidam você para celebrar o início de nossa jornada como família
            </motion.p>

            <motion.div 
              className={`inline-block ${colors.bgSecondary} border-2 ${colors.borderSecondary} rounded-xl px-6 py-4 sm:px-10 sm:py-5 shadow-lg mb-8`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className={`flex items-center gap-3 sm:gap-4 ${colors.textPrimary}`}>
                <FaCalendarAlt className={`${colors.textSecondary} text-lg sm:text-xl`} />
                <span className="font-serif text-xl sm:text-2xl font-semibold">{coupleData.formattedDate}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <h3 className={`font-serif text-lg sm:text-xl ${colors.textSecondary} mb-4`}>
                Faltam apenas:
              </h3>
              <Countdown targetDate={`${coupleData.date}T16:00:00`} />
            </motion.div>
          </div>
        </section>

        {/* Detalhes da Celebração */}
        <section className={`py-16 sm:py-20 ${colors.gradientBackground}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`font-serif text-3xl sm:text-4xl ${colors.textPrimary} mb-4`}>
                Detalhes da Celebração
              </h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className={`w-8 h-px ${colors.borderSecondary}`}></div>
                <FaHeart className={`${colors.textAccent} text-sm`} />
                <div className={`w-8 h-px ${colors.borderSecondary}`}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Cerimônia */}
              <motion.div 
                className={`bg-white/60 border ${colors.borderPrimary} rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${colors.bgSecondary} to-${colors.bgSecondary.replace('100', '200')} rounded-full flex items-center justify-center mx-auto mb-6 shadow-md`}>
                  <div className="text-2xl">💒</div>
                </div>
                <h3 className={`font-serif text-2xl ${colors.textPrimary} mb-4`}>Cerimônia</h3>
                <div className="space-y-2">
                  <p className={`${colors.textSecondary} font-semibold text-lg`}>16:00h</p>
                  <p className="text-stone-600 font-medium">Espaço de Eventos</p>
                  <p className="text-stone-600">São Paulo - SP</p>
                </div>
              </motion.div>

              {/* Recepção */}
              <motion.div 
                className={`bg-white/60 border ${colors.borderPrimary} rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${colors.bgSecondary} to-${colors.bgSecondary.replace('100', '200')} rounded-full flex items-center justify-center mx-auto mb-6 shadow-md`}>
                  <div className="text-2xl">🎉</div>
                </div>
                <h3 className={`font-serif text-2xl ${colors.textPrimary} mb-4`}>Recepção</h3>
                <div className="space-y-2">
                  <p className={`${colors.textSecondary} font-semibold text-lg`}>18:00h</p>
                  <p className="text-stone-600 font-medium">Mesmo local</p>
                  <p className="text-stone-600">Jantar & Festa</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-20 ${colors.bgPrimary} text-cream-50`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl mb-6">
                Confirme sua Presença
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Sua presença é o presente mais valioso que podemos receber
              </p>
              <motion.a
                href="/contato"
                className={`${colors.bgCream} ${colors.textPrimary} px-8 py-4 rounded-full font-semibold hover:bg-cream-200 transition-colors duration-300 text-center shadow-lg`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirmar Presença
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <ThemeSelector />
      <Footer />
    </div>
  );
};

export default Home;
