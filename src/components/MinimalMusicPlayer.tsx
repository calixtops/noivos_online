import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaChevronDown, FaChevronUp, FaMusic, FaTimes } from 'react-icons/fa';
import { useAudio } from '../contexts/AudioContext';
import { useThemeColors } from '../hooks/useThemeColors';
import { motion } from 'framer-motion';

interface MinimalMusicPlayerProps {
  isMobile?: boolean;
}

const MinimalMusicPlayer: React.FC<MinimalMusicPlayerProps> = ({ isMobile = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const colors = useThemeColors();
  
  const { 
    isPlaying, 
    togglePlay, 
    isHydrated, 
    nextTrack, 
    previousTrack, 
    currentTrackName, 
    isLoading, 
    musicCount, 
    currentTrackIndex 
  } = useAudio();

  // useEffect para limpeza sempre executa
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Fechar com tecla ESC
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (isExpanded || isHovered)) {
        setIsExpanded(false);
        setIsHovered(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isExpanded, isHovered]);

  // Fechar clicando fora do componente
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isExpanded || isHovered) {
        const musicPlayer = (e.target as Element).closest('[data-music-player]');
        if (!musicPlayer) {
          setIsExpanded(false);
          setIsHovered(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, isHovered]);

  // Renderização condicional após todos os hooks
  if (!isHydrated || isLoading) {
    return null;
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 1500);
  };

  const handleCloseHover = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className="relative z-[60] minimal-music-player"
      data-music-player
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Player Compacto */}
      <div className="flex items-center gap-2">
        {/* Botão Principal */}
        <motion.button
          onClick={togglePlay}
          className="relative group"
          disabled={!isHydrated}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`w-10 h-10 ${colors.gradientPrimary} rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
            {isPlaying ? (
              <FaPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-4 h-4 ml-0.5" />
            )}
          </div>
          
          {/* Indicador de Música Tocando */}
          {isPlaying && (
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Controles Expandidos */}
        {(isExpanded || isHovered) && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className={`flex items-center gap-2 bg-white/95 backdrop-blur-md border ${colors.borderPrimary} rounded-full px-3 py-2 shadow-lg`}
          >
            {/* Botão Anterior */}
            <button
              onClick={previousTrack}
              className={`w-8 h-8 ${colors.bgSecondary} rounded-full flex items-center justify-center ${colors.textPrimary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
              disabled={!isHydrated}
            >
              <FaStepBackward className="w-3 h-3" />
            </button>

            {/* Nome da Música */}
            <div className="max-w-32 sm:max-w-40">
              <p className={`text-xs font-medium ${colors.textPrimary} truncate`}>
                {currentTrackName || 'Carregando...'}
              </p>
              <p className={`text-xs ${colors.textSecondary}`}>
                {currentTrackIndex + 1} de {musicCount}
              </p>
            </div>

            {/* Botão Próximo */}
            <button
              onClick={nextTrack}
              className={`w-8 h-8 ${colors.bgSecondary} rounded-full flex items-center justify-center ${colors.textPrimary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
              disabled={!isHydrated}
            >
              <FaStepForward className="w-3 h-3" />
            </button>

            {/* Botão Fechar */}
            <button
              onClick={handleCloseHover}
              className={`w-6 h-6 ${colors.bgSecondary} rounded-full flex items-center justify-center ${colors.textSecondary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </motion.div>
        )}

        {/* Botão Expandir/Recolher */}
        {!isExpanded && !isHovered && (
          <button
            onClick={toggleExpanded}
            className={`w-8 h-8 ${colors.bgSecondary} rounded-full flex items-center justify-center ${colors.textSecondary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
          >
            <FaChevronUp className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Player Expandido (Mobile) */}
      {isExpanded && isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md border ${colors.borderPrimary} rounded-xl p-4 shadow-xl`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaMusic className={`${colors.textAccent}`} />
              <span className={`font-medium ${colors.textPrimary}`}>Player de Música</span>
            </div>
            <button
              onClick={toggleExpanded}
              className={`w-6 h-6 ${colors.bgSecondary} rounded-full flex items-center justify-center ${colors.textSecondary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="text-center">
              <p className={`text-sm font-medium ${colors.textPrimary} truncate`}>
                {currentTrackName || 'Carregando...'}
              </p>
              <p className={`text-xs ${colors.textSecondary}`}>
                {currentTrackIndex + 1} de {musicCount}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={previousTrack}
                className={`w-10 h-10 ${colors.bgSecondary} rounded-full flex items-center justify-center ${colors.textPrimary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
                disabled={!isHydrated}
              >
                <FaStepBackward className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className={`w-12 h-12 ${colors.gradientPrimary} rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                disabled={!isHydrated}
              >
                {isPlaying ? (
                  <FaPause className="w-5 h-5" />
                ) : (
                  <FaPlay className="w-5 h-5 ml-0.5" />
                )}
              </button>

              <button
                onClick={nextTrack}
                className={`w-10 h-10 ${colors.bgSecondary} rounded-full flex items-center justify-center ${colors.textPrimary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
                disabled={!isHydrated}
              >
                <FaStepForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MinimalMusicPlayer;
