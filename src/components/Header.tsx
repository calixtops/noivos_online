import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHeart } from 'react-icons/fa';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/historia', label: 'Nossa História', icon: '💕' },
    { path: '/programacao', label: 'Programação', icon: '📅' },
    { path: '/presentes', label: 'Presentes', icon: '🎁' },
    { path: '/contato', label: 'Contato', icon: '📞' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
          >
            <Link href="/" className="group">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-olive-600 font-bold tracking-tight">
                    Geórgia & Pedro
                  </h1>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-olive-400 to-olive-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 opacity-75 group-hover:opacity-100 transition-opacity">
                06 de Junho de 2026
              </p>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link href={item.path}>
                    <motion.div
                      className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        router.pathname === item.path 
                          ? 'bg-olive-50 text-olive-600 shadow-md' 
                          : 'text-gray-700 hover:text-olive-600 hover:bg-olive-50/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="font-medium text-sm xl:text-base">{item.label}</span>
                      {router.pathname === item.path && (
                        <motion.div
                          className="w-2 h-2 bg-olive-400 rounded-full"
                          layoutId="activeTab"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden relative z-50 p-2 rounded-lg bg-olive-50 text-olive-600 hover:bg-olive-100 transition-colors"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
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
                  <FaTimes className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-olive-100 shadow-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="px-4 py-6">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={item.path} onClick={() => setIsMenuOpen(false)}>
                        <motion.div
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            router.pathname === item.path 
                              ? 'bg-gradient-to-r from-olive-500 to-olive-600 text-white shadow-lg' 
                              : 'text-gray-700 hover:bg-olive-50 hover:text-olive-600'
                          }`}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                          {router.pathname === item.path && (
                            <motion.div
                              className="ml-auto w-2 h-2 bg-white rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            />
                          )}
                        </motion.div>
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
