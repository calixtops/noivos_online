import React, { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

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
  const isClient = useClientOnly();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [musicList, setMusicList] = useState<Array<{ file: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Log removido para evitar quebrar Fast Refresh

  // Memoizar a lista de músicas para evitar re-renderizações
  const memoizedMusicList = useMemo(() => musicList, [musicList]);

  // Carrega a lista de músicas da API - só executa no cliente
  useEffect(() => {
    if (!isClient || musicList.length > 0) return; // Não recarregar se já temos músicas
    
    const loadMusicList = async () => {
      try {
        const response = await fetch('/api/music');
        const data = await response.json();
        
        if (data.length > 0) {
          setMusicList(data);
          setCurrentTrackIndex(Math.floor(Math.random() * data.length));
        } else {
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
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Erro ao carregar lista de músicas:', error);
        const fallbackList = [
          { file: '/audio/Mais Feliz - Zeca Pagodinho.mp3', name: 'Mais Feliz - Zeca Pagodinho' }
        ];
        setMusicList(fallbackList);
        setCurrentTrackIndex(0);
        setIsLoading(false);
      }
    };
    
    loadMusicList();
  }, [isClient]);

  const loadTrack = useCallback((index: number) => {
    if (memoizedMusicList.length === 0) return;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    audioRef.current = new Audio(memoizedMusicList[index].file);
    audioRef.current.volume = 0.7;
    audioRef.current.loop = true;
    
    // Auto-play se estava tocando
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log('Autoplay blocked:', error);
      });
    }
  }, [memoizedMusicList, isPlaying]);

  const togglePlay = useCallback(() => {
    if (memoizedMusicList.length === 0 || isLoading) {
      return;
    }
    
    if (!audioRef.current) {
      loadTrack(currentTrackIndex);
    }
    
    if (audioRef.current!.paused) {
      audioRef.current!.play().catch((error) => {
        console.log('🚫 Autoplay blocked:', error);
      });
      setIsPlaying(true);
    } else {
      audioRef.current!.pause();
      setIsPlaying(false);
    }
  }, [memoizedMusicList, isLoading, currentTrackIndex, loadTrack]);

  const nextTrack = useCallback(() => {
    if (memoizedMusicList.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % memoizedMusicList.length;
    setCurrentTrackIndex(nextIndex);
    loadTrack(nextIndex);
  }, [memoizedMusicList, currentTrackIndex, loadTrack]);

  const previousTrack = useCallback(() => {
    if (memoizedMusicList.length === 0) return;
    const prevIndex = currentTrackIndex === 0 ? memoizedMusicList.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    loadTrack(prevIndex);
  }, [memoizedMusicList, currentTrackIndex, loadTrack]);

  // Memoizar nome da música atual separadamente
  const currentTrackName = useMemo(() => {
    return memoizedMusicList[currentTrackIndex]?.name || '';
  }, [memoizedMusicList, currentTrackIndex]);

  // Memoizar valores do contexto para evitar re-renderizações
  const contextValue = useMemo(() => ({
    isPlaying,
    togglePlay,
    isHydrated: isClient,
    nextTrack,
    previousTrack,
    currentTrackIndex,
    currentTrackName,
    isLoading,
    musicCount: memoizedMusicList.length
  }), [
    isPlaying,
    togglePlay,
    isClient,
    nextTrack,
    previousTrack,
    currentTrackIndex,
    currentTrackName,
    isLoading,
    memoizedMusicList
  ]);

  return (
    <AudioContext.Provider value={contextValue}>
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
