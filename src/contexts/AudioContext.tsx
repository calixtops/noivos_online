import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  isHydrated: boolean;
  nextTrack: () => void;
  previousTrack: () => void;
  currentTrackIndex: number;
  currentTrackName: string;
  isLoading: boolean;
  musicCount: number;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [musicList, setMusicList] = useState<Array<{ file: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Carrega a lista de músicas da API
  useEffect(() => {
    const loadMusicList = async () => {
      try {
        const response = await fetch('/api/music');
        const data = await response.json();
        
        if (data.length > 0) {
          setMusicList(data);
          // Seleciona uma música aleatória para começar
          setCurrentTrackIndex(Math.floor(Math.random() * data.length));
        } else {
          // Fallback para lista hardcoded se não encontrar arquivos
          const fallbackList = [
            { file: '/audio/Andança - Beth Carvalho.mp3', name: 'Andança - Beth Carvalho' },
            { file: '/audio/Grupo Revelação - Trilha Do Amor.mp3', name: 'Trilha Do Amor - Grupo Revelação' },
            { file: '/audio/Já é - Jorge Aragão.mp3', name: 'Já é - Jorge Aragão' },
            { file: '/audio/Mais Feliz - Zeca Pagodinho.mp3', name: 'Mais Feliz - Zeca Pagodinho' },
            { file: '/audio/Temporal - Art Popular.mp3', name: 'Temporal - Art Popular' }
          ];
          setMusicList(fallbackList);
          setCurrentTrackIndex(Math.floor(Math.random() * fallbackList.length));
        }
      } catch (error) {
        console.error('Erro ao carregar lista de músicas:', error);
        // Fallback em caso de erro
        const fallbackList = [
          { file: '/audio/Mais Feliz - Zeca Pagodinho.mp3', name: 'Mais Feliz - Zeca Pagodinho' }
        ];
        setMusicList(fallbackList);
        setCurrentTrackIndex(0);
      } finally {
        setIsLoading(false);
        setIsHydrated(true);
      }
    };

    loadMusicList();
  }, []);

  const loadTrack = (index: number) => {
    if (musicList.length === 0) return;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    audioRef.current = new Audio(musicList[index].file);
    audioRef.current.volume = 0.7;
    audioRef.current.loop = true;
    
    // Auto-play se estava tocando
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log('Autoplay blocked:', error);
      });
    }
  };

  const togglePlay = () => {
    if (musicList.length === 0 || isLoading) return;
    
    if (!audioRef.current) {
      loadTrack(currentTrackIndex);
    }
    
    if (audioRef.current!.paused) {
      audioRef.current!.play().catch((error) => {
        console.log('Autoplay blocked:', error);
      });
      setIsPlaying(true);
    } else {
      audioRef.current!.pause();
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    if (musicList.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % musicList.length;
    setCurrentTrackIndex(nextIndex);
    loadTrack(nextIndex);
  };

  const previousTrack = () => {
    if (musicList.length === 0) return;
    const prevIndex = currentTrackIndex === 0 ? musicList.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    loadTrack(prevIndex);
  };

  return (
    <AudioContext.Provider value={{ 
      isPlaying, 
      togglePlay, 
      isHydrated, 
      nextTrack, 
      previousTrack, 
      currentTrackIndex, 
      currentTrackName: musicList[currentTrackIndex]?.name || '',
      isLoading,
      musicCount: musicList.length
    }}>
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
