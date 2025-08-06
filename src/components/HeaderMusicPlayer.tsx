import React, { useState, useRef } from 'react';
import { FaMusic, FaVolumeMute, FaStepBackward, FaStepForward, FaInfoCircle, FaTimes, FaExpand } from 'react-icons/fa';
import { useAudio } from '../contexts/AudioContext';

const HeaderMusicPlayer: React.FC = () => {
  const { isPlaying, togglePlay, isHydrated, nextTrack, previousTrack, currentTrackName, isLoading, musicCount, currentTrackIndex } = useAudio();
  const [showControls, setShowControls] = useState(false);
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Se o player estiver desabilitado ou não hidratado, não renderiza nada
  if (!isHydrated || isLoading) return null;

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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    setShowControls(false);
    setShowTrackInfo(false);
  };

  // Versão compacta (padrão)
  if (!isExpanded) {
    return (
      <div className="relative">
        {/* Controles expandidos - posicionados para baixo */}
        {showControls && (
          <div
            onMouseEnter={handleControlsMouseEnter}
            onMouseLeave={handleControlsMouseLeave}
            className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-olive-200 p-2 transition-all duration-200 z-50"
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

              {/* Botão expandir */}
              <button
                onClick={toggleExpanded}
                className="p-2 rounded-lg bg-olive-100 hover:bg-olive-200 text-olive-700 transition-colors hover:scale-105"
                aria-label="Expandir player"
              >
                <FaExpand className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Informação da música atual - posicionada para baixo */}
        {showTrackInfo && (
          <div
            onMouseEnter={handleControlsMouseEnter}
            onMouseLeave={handleControlsMouseLeave}
            className="absolute top-full right-0 mt-16 bg-olive-800 text-cream-100 px-3 py-2 rounded-lg shadow-xl max-w-xs transition-all duration-200 z-50"
          >
            <div className="text-xs font-medium text-center whitespace-nowrap">
              {currentTrackName}
            </div>
            <div className="text-xs text-cream-200 text-center mt-1">
              {musicCount > 1 && `${currentTrackIndex + 1} de ${musicCount} músicas`}
            </div>
            <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-olive-800"></div>
          </div>
        )}

        {/* Botão principal compacto */}
        <button
          onClick={togglePlay}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative bg-gradient-to-r from-olive-500 to-olive-600 hover:from-olive-600 hover:to-olive-700 text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
          aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
        >
          <div
            className={`transition-transform duration-200 ${isPlaying ? 'animate-spin' : ''}`}
            style={{ animationDuration: '2s' }}
          >
            {isPlaying ? (
              <FaMusic className="w-4 h-4" />
            ) : (
              <FaVolumeMute className="w-4 h-4" />
            )}
          </div>

          {/* Indicador de controles disponíveis */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-cream-200 rounded-full border border-olive-600 opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="w-full h-full bg-olive-500 rounded-full animate-pulse"></div>
          </div>
        </button>
      </div>
    );
  }

  // Versão expandida - card horizontal
  return (
    <div className="relative">
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-olive-200 p-3 min-w-[320px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-olive-700">Música de Fundo</h3>
          <button
            onClick={toggleExpanded}
            className="p-1 rounded-lg bg-olive-100 hover:bg-olive-200 text-olive-700 transition-colors"
            aria-label="Minimizar player"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </div>

        {/* Layout horizontal para controles */}
        <div className="flex items-center gap-3">
          {/* Controles à esquerda */}
          <div className="flex items-center gap-2">
            <button
              onClick={previousTrack}
              className="p-2 rounded-lg bg-olive-100 hover:bg-olive-200 text-olive-700 transition-colors hover:scale-105"
              aria-label="Música anterior"
            >
              <FaStepBackward className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-gradient-to-r from-olive-500 to-olive-600 hover:from-olive-600 hover:to-olive-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
            >
              <div
                className={`transition-transform duration-200 ${isPlaying ? 'animate-spin' : ''}`}
                style={{ animationDuration: '2s' }}
              >
                {isPlaying ? (
                  <FaMusic className="w-5 h-5" />
                ) : (
                  <FaVolumeMute className="w-5 h-5" />
                )}
              </div>
            </button>

            <button
              onClick={nextTrack}
              className="p-2 rounded-lg bg-olive-100 hover:bg-olive-200 text-olive-700 transition-colors hover:scale-105"
              aria-label="Próxima música"
            >
              <FaStepForward className="w-4 h-4" />
            </button>
          </div>

          {/* Informações da música à direita */}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-800 truncate">
              {currentTrackName}
            </div>
            <div className="text-xs text-gray-500">
              {musicCount > 1 && `${currentTrackIndex + 1} de ${musicCount} músicas`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMusicPlayer; 