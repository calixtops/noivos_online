import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Adiciona detecção de primeira interação
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
        // Remove os event listeners após a primeira interação
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
      {/* Audio Button - Now only rendered here */}
      <button
        onClick={togglePlay}
        className="fixed bottom-4 right-4 z-50 bg-sky-400 text-white p-3 rounded-full shadow-lg hover:bg-sky-500 transition-all"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 15.536L2.404 2.404M2.404 15.536L15.536 2.404" />
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