import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {
        // Silently handle autoplay restrictions
      });
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Otimizado - só adiciona listeners se necessário
  useEffect(() => {
    if (hasInteracted) return;

    const handleFirstInteraction = () => {
      setHasInteracted(true);
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {
          // Silently handle autoplay restrictions
        });
        setIsPlaying(true);
      }
    };

    // Usa passive listeners para melhor performance
    const options = { passive: true, once: true };
    document.addEventListener('click', handleFirstInteraction, options);
    document.addEventListener('touchstart', handleFirstInteraction, options);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
      {/* Audio Button - Now only rendered here */}
      <button
        onClick={togglePlay}
        className="fixed bottom-4 right-4 z-50 bg-olive-600 text-cream-50 p-3 rounded-full shadow-lg hover:bg-olive-700 transition-all duration-300 hover:scale-105 border border-olive-500"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h4v16H6zM14 4h4v16h-4z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        src="/audio/Mais Feliz.mp3"
        loop
      />
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);