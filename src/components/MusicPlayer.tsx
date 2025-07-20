import React, { useState, useRef } from 'react';
import { FaMusic, FaVolumeMute, FaStepBackward, FaStepForward, FaInfoCircle } from 'react-icons/fa';
import { useAudio } from '../contexts/AudioContext';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const { isPlaying, togglePlay, isHydrated, nextTrack, previousTrack, currentTrackName, isLoading, musicCount, currentTrackIndex } = useAudio();
  const [showControls, setShowControls] = useState(false);
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!isHydrated || isLoading) return null;

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    // Delay mais longo para dar tempo de navegar pelos controles
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      setShowTrackInfo(false);
    }, 1000); // 1 segundo de delay
  };

  const handleControlsMouseEnter = () => {
    // Cancela o timeout se o mouse entrar nos controles
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleControlsMouseLeave = () => {
    // Timeout menor quando sai dos controles
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      setShowTrackInfo(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Controles expandidos */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handleControlsMouseEnter}
            onMouseLeave={handleControlsMouseLeave}
            className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-2xl border border-olive-200 p-2"
          >
            <div className="flex items-center gap-1">
              {/* Música anterior */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={previousTrack}
                className="p-2 rounded-lg bg-olive-100 hover:bg-olive-200 text-olive-700 transition-colors"
                aria-label="Música anterior"
              >
                <FaStepBackward className="w-3 h-3" />
              </motion.button>

              {/* Info da música */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowTrackInfo(!showTrackInfo)}
                className="p-2 rounded-lg bg-olive-100 hover:bg-olive-200 text-olive-700 transition-colors"
                aria-label="Informações da música"
              >
                <FaInfoCircle className="w-3 h-3" />
              </motion.button>

              {/* Próxima música */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTrack}
                className="p-2 rounded-lg bg-olive-100 hover:bg-olive-200 text-olive-700 transition-colors"
                aria-label="Próxima música"
              >
                <FaStepForward className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Informação da música atual - Posicionada acima dos controles */}
      <AnimatePresence>
        {showTrackInfo && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handleControlsMouseEnter}
            onMouseLeave={handleControlsMouseLeave}
            className="absolute bottom-full right-0 mb-16 bg-olive-800 text-cream-100 px-3 py-2 rounded-lg shadow-xl max-w-xs"
          >
            <div className="text-xs font-medium text-center whitespace-nowrap">
              {currentTrackName}
            </div>
            <div className="text-xs text-cream-200 text-center mt-1">
              {musicCount > 1 && `${currentTrackIndex + 1} de ${musicCount} músicas`}
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-olive-800"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão principal */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-olive-600 hover:bg-olive-700 text-white rounded-full p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white group"
        aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
      >
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          {isPlaying ? (
            <FaMusic className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <FaVolumeMute className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </motion.div>

        {/* Indicador de controles disponíveis */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cream-200 rounded-full border border-olive-600 opacity-70 group-hover:opacity-100 transition-opacity">
          <div className="w-full h-full bg-olive-500 rounded-full animate-pulse"></div>
        </div>
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
