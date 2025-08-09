import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaChevronDown, FaChevronUp, FaMusic, FaTimes } from 'react-icons/fa';
import { useAudio } from '../contexts/AudioContext';
import { useClientOnly } from '../hooks/useClientOnly';

interface MinimalMusicPlayerProps {
  isMobile?: boolean;
}

const MinimalMusicPlayer: React.FC<MinimalMusicPlayerProps> = ({ isMobile = false }) => {
  const isClient = useClientOnly();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Todos os hooks devem vir antes de qualquer return condicional
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
    const handleEscKey = (e) => {
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
    const handleClickOutside = (e) => {
      if (isExpanded || isHovered) {
        const musicPlayer = e.target.closest('[data-music-player]');
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
  if (!isClient || isLoading) {
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
      className="relative z-[60]"
      data-music-player
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Estado Minimalista - Apenas o botão principal */}
      {!isExpanded && (
        <div className="relative">
          {/* Botão principal - mais visível */}
          <button
            onClick={togglePlay}
            className={`
              relative w-12 h-12 rounded-full transition-all duration-300 ease-out shadow-lg
              ${isPlaying 
                ? 'bg-gradient-to-br from-olive-400 to-olive-600 shadow-olive-300' 
                : 'bg-gradient-to-br from-stone-500 to-stone-700 shadow-stone-300'
              }
              hover:scale-110 hover:shadow-xl active:scale-95
              ${isHovered ? 'ring-3 ring-white/60' : ''}
              border-2 border-white/20
            `}
            aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
          >
            <div className="flex items-center justify-center text-white">
              {isPlaying ? (
                <FaPause className="w-5 h-5" />
              ) : (
                <FaPlay className="w-5 h-5 ml-0.5" />
              )}
            </div>
            
            {/* Indicador visual mais chamativo quando tocando */}
            {isPlaying && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping"></div>
                <div className="absolute -inset-1 rounded-full border border-olive-300/50 animate-pulse"></div>
              </>
            )}
          </button>

          {/* Controles rápidos aparecem no hover - mais visíveis */}
          {isHovered && (
            <div className="absolute top-14 right-0 bg-white/98 backdrop-blur-md rounded-xl shadow-2xl border-2 border-stone-200 p-3 transform transition-all duration-200 opacity-100 translate-y-0 min-w-[140px]">
              {/* Botão de fechar */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseHover();
                  }}
                  className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
                  aria-label="Fechar"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    previousTrack();
                  }}
                  className="p-2 rounded-lg hover:bg-olive-100 text-olive-600 transition-colors active:scale-95"
                  aria-label="Anterior"
                >
                  <FaStepBackward className="w-4 h-4" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextTrack();
                  }}
                  className="p-2 rounded-lg hover:bg-olive-100 text-olive-600 transition-colors active:scale-95"
                  aria-label="Próxima"
                >
                  <FaStepForward className="w-4 h-4" />
                </button>
                
                <div className="w-px h-5 bg-stone-300 mx-1"></div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded();
                  }}
                  className="p-2 rounded-lg hover:bg-olive-100 text-olive-600 transition-colors active:scale-95"
                  aria-label="Expandir"
                >
                  <FaChevronDown className="w-4 h-4" />
                </button>
              </div>
              
              {/* Mostrar nome da música atual */}
              {currentTrackName && (
                <div className="mt-2 pt-2 border-t border-stone-200">
                  <div className="text-xs text-stone-600 text-center truncate max-w-[120px]">
                    {currentTrackName}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Estado Expandido - Card completo */}
      {isExpanded && (
        <div className="absolute top-0 right-0 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200 p-4 min-w-[280px] transform transition-all duration-300 opacity-100 translate-y-0">
          {/* Header do card */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaMusic className="w-4 h-4 text-olive-500" />
              <span className="text-sm font-medium text-olive-700">Música Ambiente</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleExpanded}
                className="p-1.5 rounded-lg hover:bg-olive-100 text-olive-500 transition-colors"
                aria-label="Recolher"
              >
                <FaChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={toggleExpanded}
                className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                aria-label="Fechar"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Informações da música */}
          <div className="mb-4 p-3 bg-olive-50 rounded-xl">
            <div className="text-sm font-medium text-olive-800 truncate mb-1">
              {currentTrackName || 'Música Desconhecida'}
            </div>
            <div className="text-xs text-olive-600">
              {musicCount > 0 && `${currentTrackIndex + 1} de ${musicCount}`}
            </div>
            
            {/* Barra de progresso visual simples */}
            <div className="mt-2 w-full bg-stone-200 rounded-full h-1">
              <div 
                className={`h-1 rounded-full transition-all duration-1000 ${
                  isPlaying ? 'bg-olive-500' : 'bg-stone-400'
                }`}
                style={{ 
                  width: musicCount > 0 ? `${((currentTrackIndex + 1) / musicCount) * 100}%` : '0%' 
                }}
              ></div>
            </div>
          </div>

          {/* Controles principais */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={previousTrack}
              className="p-3 rounded-full hover:bg-olive-100 text-olive-600 transition-all hover:scale-105"
              aria-label="Música anterior"
            >
              <FaStepBackward className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className={`
                p-4 rounded-full transition-all duration-300 hover:scale-105
                ${isPlaying 
                  ? 'bg-gradient-to-br from-olive-400 to-olive-600 text-white shadow-lg shadow-olive-200' 
                  : 'bg-gradient-to-br from-stone-400 to-stone-600 text-white shadow-lg shadow-stone-200'
                }
              `}
              aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
            >
              {isPlaying ? (
                <FaPause className="w-5 h-5" />
              ) : (
                <FaPlay className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-3 rounded-full hover:bg-olive-100 text-olive-600 transition-all hover:scale-105"
              aria-label="Próxima música"
            >
              <FaStepForward className="w-4 h-4" />
            </button>
          </div>

          {/* Footer com ações extras */}
          <div className="mt-4 pt-3 border-t border-stone-200">
            <div className="flex items-center justify-center">
              <div className="text-xs text-stone-500 text-center">
                {isPlaying ? '🎵 Tocando música ambiente' : '⏸️ Música pausada'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalMusicPlayer;
