import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import MinimalMusicPlayer from './MinimalMusicPlayer';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/historia', label: 'Nossa História', icon: '💕' },
    { path: '/programacao', label: 'Programação', icon: '📅' },
    { path: '/presentes', label: 'Presentes', icon: '🎁' },
    { path: '/contato', label: 'Contato', icon: '📞' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Marcar como montado após hidratação
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Detectar scroll para mudar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile quando trocar de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  // Prevenir scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <motion.header 
      className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-olive-100/50 shadow-lg shadow-olive-100/20"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-olive-400 to-olive-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-olive-300/30 group-hover:shadow-xl group-hover:shadow-olive-300/40 transition-all duration-300">
                  <FaHeart className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-forum font-bold bg-gradient-to-r from-olive-600 to-olive-800 bg-clip-text text-transparent">
                    João & Maria
                  </h1>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="h-px bg-gradient-to-r from-olive-400 to-olive-600 flex-1"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    <p className="text-sm text-olive-600/80 font-medium px-2">
                      15 de dezembro, 2024
                    </p>
                    <motion.div 
                      className="h-px bg-gradient-to-r from-olive-600 to-olive-400 flex-1"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.li 
                  key={item.path}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link 
                    href={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                      router.pathname === item.path 
                        ? 'bg-olive-100 text-olive-700 shadow-md' 
                        : 'text-olive-600 hover:bg-olive-50 hover:text-olive-700'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Desktop Music Player */}
          <div className="hidden lg:block flex-shrink-0 flex items-center gap-2">
            {isMounted && <MinimalMusicPlayer isMobile={false} />}
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Music Player */}
            {isMounted && <MinimalMusicPlayer isMobile={true} />}
            
            {/* Mobile Menu Button */}
            <motion.button
              className="relative z-50 p-2 rounded-lg bg-olive-50 text-olive-600 hover:bg-olive-100 transition-colors"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md border-b border-olive-100 shadow-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="py-6">
                <ul className="space-y-2 px-4">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        href={item.path}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                          router.pathname === item.path 
                            ? 'bg-olive-100 text-olive-700 shadow-lg' 
                            : 'text-olive-600 hover:bg-olive-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {router.pathname === item.path && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-white rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
