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

  console.log('🎼 AudioProvider renderizado:', { isClient, isLoading, musicListLength: musicList.length });

  // Memoizar a lista de músicas para evitar re-renderizações
  const memoizedMusicList = useMemo(() => musicList, [musicList]);

  // Carrega a lista de músicas da API - só executa no cliente
  useEffect(() => {
    console.log('🎵 useEffect AudioProvider executado:', { isClient });
    let mounted = true;
    
    // Este useEffect apenas configura a cleanup function
    return () => {
      mounted = false;
    };
  }, []); // Voltar para array vazio
  
  // useEffect separado para reagir a mudanças no isClient
  useEffect(() => {
    if (!isClient || musicList.length > 0) return; // Não recarregar se já temos músicas
    
    console.log('🚀 isClient mudou para true, carregando músicas...');
    
    const loadMusicList = async () => {
      try {
        console.log('🎼 Iniciando carregamento de músicas...');
        const response = await fetch('/api/music');
        const data = await response.json();
        
        if (data.length > 0) {
          console.log('🎼 Músicas carregadas da API:', data.length);
          setMusicList(data);
          setCurrentTrackIndex(Math.floor(Math.random() * data.length));
        } else {
          console.log('📭 API retornou lista vazia, usando fallback');
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
    console.log('🎵 togglePlay chamado', { musicCount: memoizedMusicList.length, isLoading, currentTrackIndex });
    
    if (memoizedMusicList.length === 0 || isLoading) {
      console.log('❌ Não é possível tocar: lista vazia ou carregando');
      return;
    }
    
    if (!audioRef.current) {
      console.log('🎧 Carregando track:', currentTrackIndex);
      loadTrack(currentTrackIndex);
    }
    
    if (audioRef.current!.paused) {
      console.log('▶️ Tocando música');
      audioRef.current!.play().catch((error) => {
        console.log('🚫 Autoplay blocked:', error);
      });
      setIsPlaying(true);
    } else {
      console.log('⏸️ Pausando música');
      audioRef.current!.pause();
      setIsPlaying(false);
    }
  }, [memoizedMusicList, isLoading, currentTrackIndex, loadTrack]);

  const nextTrack = useCallback(() => {
    console.log('⏭️ nextTrack chamado', { musicCount: memoizedMusicList.length, currentIndex: currentTrackIndex });
    if (memoizedMusicList.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % memoizedMusicList.length;
    console.log('🎵 Mudando para próxima:', nextIndex);
    setCurrentTrackIndex(nextIndex);
    loadTrack(nextIndex);
  }, [memoizedMusicList, currentTrackIndex, loadTrack]);

  const previousTrack = useCallback(() => {
    console.log('⏮️ previousTrack chamado', { musicCount: memoizedMusicList.length, currentIndex: currentTrackIndex });
    if (memoizedMusicList.length === 0) return;
    const prevIndex = currentTrackIndex === 0 ? memoizedMusicList.length - 1 : currentTrackIndex - 1;
    console.log('🎵 Mudando para anterior:', prevIndex);
    setCurrentTrackIndex(prevIndex);
    loadTrack(prevIndex);
  }, [memoizedMusicList, currentTrackIndex, loadTrack]);

  // Memoizar valores do contexto para evitar re-renderizações
  const contextValue = useMemo(() => ({
    isPlaying,
    togglePlay,
    isHydrated: isClient,
    nextTrack,
    previousTrack,
    currentTrackIndex,
    currentTrackName: memoizedMusicList[currentTrackIndex]?.name || '',
    isLoading,
    musicCount: memoizedMusicList.length
  }), [
    isPlaying,
    togglePlay,
    isClient,
    nextTrack,
    previousTrack,
    currentTrackIndex,
    memoizedMusicList,
    isLoading
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
