import React, { useState, useRef } from 'react';
import { FaMusic, FaVolumeMute, FaStepBackward, FaStepForward, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useAudio } from '../contexts/AudioContext';

// Variável para controlar se o player deve ser renderizado
const ENABLE_MUSIC_PLAYER = true;

const MusicPlayer: React.FC = () => {
  const { isPlaying, togglePlay, isHydrated, nextTrack, previousTrack, currentTrackName, isLoading, musicCount, currentTrackIndex } = useAudio();
  const [showControls, setShowControls] = useState(false);
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Se o player estiver desabilitado, não renderiza nada
  if (!ENABLE_MUSIC_PLAYER || !isHydrated || isLoading) return null;

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      setShowTrackInfo(false);
    }, 1000);
  };

  const handleControlsMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleControlsMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      setShowTrackInfo(false);
    }, 500);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setShowControls(false);
    setShowTrackInfo(false);
  };

  // Se estiver minimizado, mostra apenas um pequeno indicador
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={toggleMinimize}
          className="bg-olive-600 hover:bg-olive-700 text-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white"
          aria-label="Mostrar player de música"
        >
          <FaMusic className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {/* Controles expandidos */}
      {showControls && (
        <div
          onMouseEnter={handleControlsMouseEnter}
          onMouseLeave={handleControlsMouseLeave}
          className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-2xl border border-olive-200 p-2 transition-all duration-200"
        >
          <div className="flex items-center gap-1">
            {/* Música anterior */}
            <button
              onClick={previousTrack}
              className="p-2 rounded-lg bg-olive-100 hover:bg-olive-200 text-olive-700 transition-colors hover:scale-105"
              aria-label="Música anterior"
            >
              <FaStepBackward className="w-3 h-3" />
            </button>

            {/* Info da música */}
            <button
              onClick={() => setShowTrackInfo(!showTrackInfo)}
              className="p-2 rounded-lg bg-olive-100 hover:bg-olive-200 text-olive-700 transition-colors hover:scale-105"
              aria-label="Informações da música"
            >
              <FaInfoCircle className="w-3 h-3" />
            </button>

            {/* Próxima música */}
            <button
              onClick={nextTrack}
              className="p-2 rounded-lg bg-olive-100 hover:bg-olive-200 text-olive-700 transition-colors hover:scale-105"
              aria-label="Próxima música"
            >
              <FaStepForward className="w-3 h-3" />
            </button>

            {/* Botão minimizar */}
            <button
              onClick={toggleMinimize}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors hover:scale-105"
              aria-label="Minimizar player"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Informação da música atual */}
      {showTrackInfo && (
        <div
          onMouseEnter={handleControlsMouseEnter}
          onMouseLeave={handleControlsMouseLeave}
          className="absolute bottom-full right-0 mb-16 bg-olive-800 text-cream-100 px-3 py-2 rounded-lg shadow-xl max-w-xs transition-all duration-200"
        >
          <div className="text-xs font-medium text-center whitespace-nowrap">
            {currentTrackName}
          </div>
          <div className="text-xs text-cream-200 text-center mt-1">
            {musicCount > 1 && `${currentTrackIndex + 1} de ${musicCount} músicas`}
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-olive-800"></div>
        </div>
      )}

      {/* Botão principal */}
      <button
        onClick={togglePlay}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-olive-600 hover:bg-olive-700 text-white rounded-full p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white group hover:scale-105"
        aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
      >
        <div
          className={`transition-transform duration-200 ${isPlaying ? 'animate-spin' : ''}`}
          style={{ animationDuration: '2s' }}
        >
          {isPlaying ? (
            <FaMusic className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <FaVolumeMute className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </div>

        {/* Indicador de controles disponíveis */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cream-200 rounded-full border border-olive-600 opacity-70 group-hover:opacity-100 transition-opacity">
          <div className="w-full h-full bg-olive-500 rounded-full animate-pulse"></div>
        </div>
      </button>
    </div>
  );
};

export default MusicPlayer;
