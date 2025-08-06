import { motion } from 'framer-motion';
import { FaHeart, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaDownload, FaMobile, FaDesktop } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [platform, setPlatform] = useState<'mobile' | 'desktop' | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  // Detectar plataforma e capacidade de instalação
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/android|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent)) {
      setPlatform('mobile');
    } else {
      setPlatform('desktop');
    }

    // Listener para capturar o evento de instalação do PWA
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    // Listener para quando o app já foi instalado
    const handleAppInstalled = () => {
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt && canInstall) {
      // Mostrar o prompt de instalação
      deferredPrompt.prompt();
      
      // Aguardar a resposta do usuário
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('Usuário aceitou a instalação');
      } else {
        console.log('Usuário recusou a instalação');
      }
      
      setDeferredPrompt(null);
      setCanInstall(false);
    } else {
      // Fallback: instruções para instalação manual
      if (platform === 'mobile') {
        alert('Para adicionar à tela inicial:\n\nChrome: Menu → Adicionar à tela inicial\nSafari: Compartilhar → Adicionar à tela inicial');
      } else {
        alert('Para instalar o app:\n\nChrome: Clique no ícone de instalação na barra de endereços\nEdge: Menu → Aplicativos → Instalar este site');
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-rose-50 via-gray-50 to-rose-50 border-t border-rose-100">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Seção principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo/Título */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
              Geórgia & Pedro
            </h3>
            <p className="text-gray-600">06 de Junho de 2026</p>
            <motion.div 
              className="flex items-center justify-center md:justify-start mt-3"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <FaHeart className="text-rose-500 text-xl mx-2" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Links Rápidos */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Navegação</h4>
            <div className="space-y-2">
              {[
                { label: 'Nossa História', href: '/historia' },
                { label: 'Programação', href: '/programacao' },
                { label: 'Lista de Presentes', href: '/presentes' },
                { label: 'Pousadas', href: '/pousadas' },
                { label: 'Contato', href: '/contato' }
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block text-gray-600 hover:text-rose-600 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contato/Redes Sociais */}
          <motion.div 
            className="text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Fale Conosco</h4>
            <div className="space-y-3">
              {/* Redes Sociais */}
              <div className="flex justify-center md:justify-end gap-4">
                <motion.a
                  href="https://www.instagram.com/calixtops_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center text-white hover:from-rose-600 hover:to-rose-700 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="Siga no Instagram"
                >
                  <FaInstagram className="text-sm" />
                </motion.a>
                <motion.a
                  href="https://wa.me/qr/7VZA5YSZPPZ2A1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="Fale no WhatsApp"
                >
                  <FaWhatsapp className="text-sm" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Linha divisória */}
        <motion.div 
          className="border-t border-rose-200 pt-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.p 
              className="flex items-center text-gray-600 text-sm order-2 sm:order-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              © {currentYear} Geórgia & Pedro - Nosso Grande Dia
            </motion.p>
            
            <motion.p 
              className="flex items-center text-gray-700 font-medium order-1 sm:order-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Feito com 
              <motion.span
                className="mx-2"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <FaHeart className="text-rose-500" />
              </motion.span>
              para nosso amor
            </motion.p>
          </div>

          {/* Botão discreto para baixar o app */}
          {platform && (
            <motion.div 
              className="flex justify-center mt-4 sm:mt-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={handleInstallApp}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
                  canInstall 
                    ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={canInstall 
                  ? (platform === 'mobile' ? 'Adicionar à tela inicial' : 'Instalar aplicativo')
                  : 'Instruções de instalação'
                }
              >
                {platform === 'mobile' ? (
                  <FaMobile className="text-xs" />
                ) : (
                  <FaDesktop className="text-xs" />
                )}
                <FaDownload className="text-xs" />
                <span className="text-xs font-medium">
                  {canInstall 
                    ? (platform === 'mobile' ? 'Adicionar App' : 'Instalar App')
                    : 'Como Instalar'
                  }
                </span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;