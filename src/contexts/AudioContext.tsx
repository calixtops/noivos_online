import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  isHydrated: boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      // Cria o elemento audio na primeira interação
      audioRef.current = new Audio('/audio/Mais Feliz.mp3');
      audioRef.current.volume = 0.7;
      audioRef.current.loop = true;
    }
    
    if (audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.log('Autoplay blocked:', error);
      });
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, isHydrated }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
