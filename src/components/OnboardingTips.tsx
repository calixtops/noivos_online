import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaMusic, FaPalette, FaGift, FaCamera, FaEnvelope, FaChartBar, FaMobile, FaHeart, FaQuestion } from 'react-icons/fa';
import { useThemeColors } from '../hooks/useThemeColors';

interface Tip {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  targetSelector: string;
  preferredPosition: 'top' | 'bottom' | 'left' | 'right' | 'center';
  offset?: { x: number; y: number };
}

const OnboardingTips: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showHelpButton, setShowHelpButton] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const colors = useThemeColors();

  const tips: Tip[] = [
    {
      id: 'music-player',
      title: '🎵 Player de Música',
      description: 'Reproduza músicas românticas enquanto navega pelo site. Clique no ícone de música para controlar a reprodução.',
      icon: <FaMusic className="text-2xl" />,
      targetSelector: '.minimal-music-player',
      preferredPosition: 'top',
      offset: { x: 0, y: -20 }
    },
    {
      id: 'theme-selector',
      title: '🎨 Temas Personalizáveis',
      description: 'Escolha entre 4 temas elegantes: Verde, Azul, Roxo ou Rosa. Cada tema tem sua própria paleta de cores.',
      icon: <FaPalette className="text-2xl" />,
      targetSelector: '.theme-selector button',
      preferredPosition: 'top',
      offset: { x: 0, y: -20 }
    },
    {
      id: 'gift-list',
      title: '💝 Lista de Presentes',
      description: 'Os convidados podem escolher presentes da lista e contribuir para a realização dos sonhos do casal.',
      icon: <FaGift className="text-2xl" />,
      targetSelector: 'a[href="/presentes"]',
      preferredPosition: 'bottom',
      offset: { x: 0, y: 20 }
    },
    {
      id: 'photo-gallery',
      title: '📸 Galeria de Fotos',
      description: 'Reviva momentos especiais na página "Nossa História" com uma galeria interativa e carrossel de fotos.',
      icon: <FaCamera className="text-2xl" />,
      targetSelector: 'a[href="/historia"]',
      preferredPosition: 'bottom',
      offset: { x: 0, y: 20 }
    },
    {
      id: 'rsvp-form',
      title: '📞 Confirmação de Presença',
      description: 'Formulário completo para os convidados confirmarem presença, número de acompanhantes e deixarem mensagens.',
      icon: <FaEnvelope className="text-2xl" />,
      targetSelector: 'a[href="/contato"]',
      preferredPosition: 'bottom',
      offset: { x: 0, y: 20 }
    },
    {
      id: 'admin-panel',
      title: '📊 Painel Administrativo',
      description: 'Acompanhe confirmações, estatísticas e gerencie a lista de convidados em tempo real.',
      icon: <FaChartBar className="text-2xl" />,
      targetSelector: 'a[href="/admin/confirmacoes"]',
      preferredPosition: 'bottom',
      offset: { x: 0, y: 20 }
    },
    {
      id: 'responsive-design',
      title: '📱 Design Responsivo',
      description: 'Site otimizado para todos os dispositivos: celular, tablet e desktop. Experimente redimensionar a janela!',
      icon: <FaMobile className="text-2xl" />,
      targetSelector: 'body',
      preferredPosition: 'center',
      offset: { x: 0, y: 0 }
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    
    // Verificar se é a primeira visita
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    
    if (!hasSeenOnboarding) {
      // Iniciar onboarding após um pequeno delay para garantir que os elementos estejam renderizados
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Mostrar botão de ajuda após alguns segundos
      setTimeout(() => {
        setShowHelpButton(true);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Aguardar um pouco para garantir que os elementos estejam renderizados
      const timer = setTimeout(() => {
        updateTargetElement();
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, currentTip]);

  const updateTargetElement = () => {
    const currentTipData = tips[currentTip];
    const element = document.querySelector(currentTipData.targetSelector) as HTMLElement;
    
    if (element) {
      setTargetElement(element);
    } else {
      // Se não encontrar o elemento, usar fallback
      console.log(`Elemento não encontrado: ${currentTipData.targetSelector}`);
      setTargetElement(null);
    }
  };

  const getOptimalPosition = (rect: DOMRect, preferredPosition: string) => {
    const tipWidth = 320;
    const tipHeight = 280;
    const margin = 20;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Tentar posição preferida primeiro
    let position = preferredPosition;
    let top, left, transform;

    const tryPosition = (pos: string) => {
      switch (pos) {
        case 'top':
          top = rect.top - tipHeight - 20;
          left = rect.left + rect.width / 2 - tipWidth / 2;
          transform = 'translate(0, 0)';
          return top >= margin && left >= margin && left + tipWidth <= viewportWidth - margin;
        
        case 'bottom':
          top = rect.bottom + 20;
          left = rect.left + rect.width / 2 - tipWidth / 2;
          transform = 'translate(0, 0)';
          return top + tipHeight <= viewportHeight - margin && left >= margin && left + tipWidth <= viewportWidth - margin;
        
        case 'left':
          top = rect.top + rect.height / 2 - tipHeight / 2;
          left = rect.left - tipWidth - 20;
          transform = 'translate(0, 0)';
          return top >= margin && top + tipHeight <= viewportHeight - margin && left >= margin;
        
        case 'right':
          top = rect.top + rect.height / 2 - tipHeight / 2;
          left = rect.right + 20;
          transform = 'translate(0, 0)';
          return top >= margin && top + tipHeight <= viewportHeight - margin && left + tipWidth <= viewportWidth - margin;
        
        default:
          return false;
      }
    };

    // Tentar posição preferida
    if (tryPosition(preferredPosition)) {
      return { top, left, transform, position };
    }

    // Se não couber, tentar outras posições
    const positions = ['top', 'bottom', 'left', 'right', 'center'];
    for (const pos of positions) {
      if (pos !== preferredPosition && tryPosition(pos)) {
        return { top, left, transform, position: pos };
      }
    }

    // Fallback: centralizar na tela
    return {
      top: (viewportHeight - tipHeight) / 2,
      left: (viewportWidth - tipWidth) / 2,
      transform: 'translate(0, 0)',
      position: 'center'
    };
  };

  const getTipPosition = () => {
    if (!targetElement) {
      return { 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        position: 'center'
      };
    }

    const rect = targetElement.getBoundingClientRect();
    const currentTipData = tips[currentTip];
    const offset = currentTipData.offset || { x: 0, y: 0 };

    const optimal = getOptimalPosition(rect, currentTipData.preferredPosition);
    
    return {
      top: `${optimal.top + offset.y}px`,
      left: `${optimal.left + offset.x}px`,
      transform: optimal.transform,
      position: optimal.position
    };
  };

  const handleNext = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentTip > 0) {
      setCurrentTip(currentTip - 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowHelpButton(true);
  };

  const handleSkip = () => {
    handleClose();
  };

  const handleRestartOnboarding = () => {
    setCurrentTip(0);
    setIsVisible(true);
    setShowHelpButton(false);
  };

  if (!isMounted) return null;

  const currentTipData = tips[currentTip];
  const tipPosition = getTipPosition();

  return (
    <>
      {/* Help Button */}
      <AnimatePresence>
        {showHelpButton && !isVisible && (
          <motion.button
            onClick={handleRestartOnboarding}
            className={`fixed bottom-20 right-4 z-40 w-12 h-12 ${colors.gradientPrimary} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Ver dicas do site"
          >
            <FaQuestion className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Onboarding Tips */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Highlight Target Element */}
            {targetElement && (
              <motion.div
                key={`highlight-${currentTip}`}
                className="fixed z-40 pointer-events-none"
                style={{
                  top: targetElement.offsetTop,
                  left: targetElement.offsetLeft,
                  width: targetElement.offsetWidth,
                  height: targetElement.offsetHeight
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full border-4 border-white shadow-2xl rounded-lg bg-white/10 backdrop-blur-sm" />
              </motion.div>
            )}

            {/* Tip Card */}
            <motion.div
              key={`tip-${currentTip}`}
              className="fixed z-50 max-w-sm w-full"
              style={{
                top: tipPosition.top,
                left: tipPosition.left,
                transform: tipPosition.transform
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`${colors.bgCream} rounded-2xl shadow-2xl border ${colors.borderPrimary} p-6 relative mx-4`}>
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className={`absolute top-3 right-3 p-2 rounded-full ${colors.bgSecondary} ${colors.textSecondary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
                >
                  <FaTimes className="text-sm" />
                </button>

                {/* Icon */}
                <div className={`w-16 h-16 ${colors.gradientPrimary} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                  {currentTipData.icon}
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-serif font-bold ${colors.textPrimary} mb-2`}>
                    {currentTipData.title}
                  </h3>
                  <p className={`${colors.textSecondary} leading-relaxed`}>
                    {currentTipData.description}
                  </p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {tips.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTip ? colors.bgPrimary : colors.borderPrimary
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleSkip}
                    className={`text-sm ${colors.textSecondary} hover:${colors.textPrimary} transition-colors`}
                  >
                    Pular
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevious}
                      disabled={currentTip === 0}
                      className={`p-2 rounded-full ${colors.bgSecondary} ${colors.textSecondary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <FaChevronLeft className="text-sm" />
                    </button>

                    <span className={`text-sm ${colors.textSecondary}`}>
                      {currentTip + 1} de {tips.length}
                    </span>

                    <button
                      onClick={handleNext}
                      className={`p-2 rounded-full ${colors.bgSecondary} ${colors.textSecondary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
                    >
                      <FaChevronRight className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Arrow pointing to element */}
              {targetElement && tipPosition.position !== 'center' && (
                <motion.div
                  key={`arrow-${currentTip}`}
                  className="absolute w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-cream-100"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: tipPosition.position === 'bottom' ? '-8px' : 'auto',
                    bottom: tipPosition.position === 'top' ? '-8px' : 'auto'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default OnboardingTips;
