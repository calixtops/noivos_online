import React, { useState, useEffect } from 'react';
import { FaSpotify, FaPlus, FaMusic, FaShare, FaLink, FaCheck, FaTimes, FaSearch, FaTimesCircle, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientOnly } from '../hooks/useClientOnly';

interface Track {
  uri: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  duration: string;
}

const SpotifyPlaylist = () => {
  const isClient = useClientOnly();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Mensagens de sucesso variadas e divertidas
  const getSuccessMessage = (action = 'default') => {
    const messages = {
      songAdded: [
        '🎵 Música adicionada com amor!',
        '💕 Sua música está na nossa playlist!',
        '🎶 Que escolha maravilhosa!',
        '✨ Música perfeita para nosso grande dia!',
        '💃 Essa vai animar a festa!',
        '🕺 Vai ser linda na nossa celebração!'
      ],
      playlist: [
        '📋 Playlist copiada para área de transferência!',
        '🔗 Link compartilhado com sucesso!',
        '💌 Playlist pronta para compartilhar!'
      ],
      login: [
        '🎉 Bem-vindo(a) à nossa playlist!',
        '💚 Login realizado com sucesso!',
        '🎵 Agora você pode adicionar músicas!'
      ],
      default: [
        '✨ Tudo certo por aqui!',
        '💕 Obrigado por participar!',
        '🎊 Sucesso total!'
      ]
    };
    
    const messageList = messages[action] || messages.default;
    return messageList[Math.floor(Math.random() * messageList.length)];
  };
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Playlist do casamento
  const PLAYLIST_ID = '4Oj7QSgRJ1IbwlNblrhcFu';
  const PLAYLIST_NAME = 'Geórgia & Pedro - Nosso Casamento';

  // Hook para busca dinâmica com debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    // Debounce - aguarda 500ms após parar de digitar
    const timeoutId = setTimeout(() => {
      searchSpotify(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, isClient]);

  // Buscar músicas no Spotify (versão otimizada para busca dinâmica)
  const searchSpotify = async (query: string) => {
    // Não busca se a query for muito curta ou se não estiver no cliente
    if (!query.trim() || query.trim().length < 2 || !isClient) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      const response = await fetch(`/api/spotify?search=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults(data.tracks || []);
      } else {
        setErrorMessage(data.error || 'Erro ao buscar músicas');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      // Não mostra erro para buscas automáticas
      console.error('Erro na busca:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Limpar busca
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  // Adicionar música à playlist
  const addToPlaylist = async (track: Track) => {
    if (!isClient) {
      setErrorMessage('Erro de inicialização');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Verificar autenticação em tempo real antes de adicionar
    try {
      const authCheck = await fetch('/api/spotify/check-auth');
      const authData = await authCheck.json();
      
      console.log('🔍 Pre-add auth check:', authData);
      
      if (!authData.authenticated) {
        setIsAuthenticated(false);
        let errorMsg = 'Sessão expirada. Faça login novamente com o Spotify';
        
        if (authData.reason === 'no_token') {
          errorMsg = 'Token não encontrado. Faça login com o Spotify';
        } else if (authData.reason === 'invalid_token') {
          errorMsg = 'Token expirado. Faça login novamente';
        }
        
        setErrorMessage(errorMsg);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
      
      // Atualizar estado de autenticação
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setErrorMessage('Erro ao verificar autenticação');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsAdding(true);
    
    try {
      const response = await fetch('/api/spotify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playlistId: PLAYLIST_ID,
          trackUri: track.uri,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setPlaylistTracks(prev => [...prev, track]);
        setSearchResults(prev => prev.filter(t => t.uri !== track.uri));
        setSuccessMessage(getSuccessMessage('songAdded'));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        // Se o erro for 401 (não autorizado), atualizar estado de autenticação
        if (response.status === 401) {
          setIsAuthenticated(false);
          setErrorMessage('Sessão expirada. Faça login novamente com o Spotify');
        } else {
          setErrorMessage(data.error || 'Erro ao adicionar música');
        }
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      setErrorMessage('Erro de conexão');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  // Carregar playlist
  const loadPlaylist = async () => {
    if (!isClient) return;
    
    try {
      const response = await fetch(`/api/spotify?playlist=${PLAYLIST_ID}`);
      const data = await response.json();
      
      if (response.ok) {
        const tracks = data.playlist?.tracks || [];
        setPlaylistTracks(tracks);
        setPlaylistUrl(data.playlist?.external_urls?.spotify || `https://open.spotify.com/playlist/${PLAYLIST_ID}`);
      }
    } catch (error) {
      console.error('Erro ao carregar playlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Compartilhar playlist
  const sharePlaylist = () => {
    if (!isClient || typeof window === 'undefined') return;
    
    const url = playlistUrl || `https://open.spotify.com/playlist/${PLAYLIST_ID}`;
    if (navigator.share) {
      navigator.share({
        title: PLAYLIST_NAME,
        text: 'Confira nossa playlist de casamento no Spotify!',
        url: url,
      });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setSuccessMessage(getSuccessMessage('playlist'));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Verificar autenticação
  const checkAuth = async () => {
    if (!isClient) return;
    
    try {
      setIsCheckingAuth(true);
      const response = await fetch('/api/spotify/check-auth');
      const data = await response.json();
      
      // Debug info no console
      console.log('🔍 Auth check result:', data);
      
      setIsAuthenticated(data.authenticated);
      
      // Se não autenticado, mostrar razão no console
      if (!data.authenticated && data.reason) {
        console.log('❌ Not authenticated:', data.reason, data.debug);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Login com Spotify
  const loginWithSpotify = () => {
    if (!isClient || typeof window === 'undefined') return;
    window.location.href = '/api/spotify/auth';
  };

  // Carregar playlist inicial e verificar autenticação
  useEffect(() => {
    if (isClient) {
      loadPlaylist();
      checkAuth();
      
      // Verificar se estamos no browser antes de usar window
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        const error = urlParams.get('error');
        
        if (success === 'authenticated') {
          setSuccessMessage(getSuccessMessage('login'));
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          window.history.replaceState({}, '', '/playlist');
          // Re-verificar autenticação após login bem-sucedido com delay maior
          setTimeout(() => {
            console.log('🔄 Re-checking auth after login...');
            checkAuth();
          }, 1500);
        }
        
        if (error) {
          let errorMsg = 'Erro desconhecido';
          switch (error) {
            case 'access_denied':
              errorMsg = 'Acesso negado pelo Spotify';
              break;
            case 'no_code':
              errorMsg = 'Erro na autenticação';
              break;
            case 'invalid_state':
              errorMsg = 'Erro de segurança na autenticação';
              break;
            case 'token_error':
              errorMsg = 'Erro ao obter token de acesso';
              break;
          }
          setErrorMessage(errorMsg);
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
          window.history.replaceState({}, '', '/playlist');
        }
      }
    }
  }, [isClient]);

  // Renderizar loading enquanto não está montado - evita hydration mismatch
  if (!isClient) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 via-olive-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <FaSpotify className="text-4xl text-green-500" />
                <h2 className="font-serif text-3xl sm:text-4xl text-olive-800">
                  Nossa Playlist Colaborativa
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Contribua com músicas para nossa playlist de casamento no Spotify! 
                Ajude-nos a criar a trilha sonora perfeita para nossa celebração.
              </p>
              
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Renderizar loading enquanto carrega dados - apenas após hydratação
  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 via-olive-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <FaSpotify className="text-4xl text-green-500" />
                <h2 className="font-serif text-3xl sm:text-4xl text-olive-800">
                  Nossa Playlist Colaborativa
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Carregando playlist...
              </p>
              
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <FaCheck className="w-4 h-4" />
            <span>{successMessage || getSuccessMessage()}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <FaTimes className="w-4 h-4" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-16 bg-gradient-to-br from-green-50 via-olive-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header da Seção */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <FaSpotify className="text-4xl text-green-500" />
                <h2 className="font-serif text-3xl sm:text-4xl text-olive-800">
                  Nossa Playlist Colaborativa
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Contribua com músicas para nossa playlist de casamento no Spotify! 
                Ajude-nos a criar a trilha sonora perfeita para nossa celebração.
              </p>
            </div>

            {/* Status Card */}
            <div className="bg-gradient-to-r from-green-50 to-olive-50 border-2 border-green-200 rounded-2xl p-6 mb-8 max-w-2xl mx-auto shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${isAuthenticated ? 'bg-green-500' : isCheckingAuth ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                    <span className={`font-semibold text-sm ${isAuthenticated ? 'text-green-700' : isCheckingAuth ? 'text-blue-700' : 'text-yellow-700'}`}>
                      {isCheckingAuth ? '🔄 Verificando...' : isAuthenticated ? '🎵 Conectado ao Spotify' : '🔗 Conecte-se ao Spotify'}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {isAuthenticated ? (
                      <>
                        <span className="text-green-600 font-medium">Perfeito!</span> Você está logado e pode adicionar músicas à nossa playlist colaborativa.
                      </>
                    ) : (
                      <>
                        Faça login com o Spotify para contribuir com músicas!
                      </>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        fetch('/api/spotify/logout', { method: 'POST' });
                        setIsAuthenticated(false);
                      }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      <FaSpotify className="w-4 h-4" />
                      Sair
                    </button>
                  ) : (
                    <button
                      onClick={loginWithSpotify}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      <FaSpotify className="w-4 h-4" />
                      Login Spotify
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={sharePlaylist}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaShare className="w-4 h-4" />
                <span>Compartilhar Playlist</span>
              </button>
              
              <a
                href={playlistUrl || `https://open.spotify.com/playlist/${PLAYLIST_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaLink className="w-4 h-4" />
                <span>Abrir no Spotify</span>
              </a>
            </div>

            {/* Busca de Músicas */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Buscar e Adicionar Músicas
              </h3>
              
              {/* Search Bar - Busca Dinâmica */}
              <div className="relative mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Digite o nome da música ou artista... (busca automática)"
                    className="w-full px-6 py-4 text-lg border-2 border-olive-200 rounded-full focus:border-green-500 focus:outline-none transition-colors pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Limpar busca"
                      >
                        <FaTimesCircle className="w-4 h-4" />
                      </button>
                    )}
                    <div className="p-3">
                      {isSearching ? (
                        <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <FaSearch className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Dica de busca dinâmica */}
                <p className="text-sm text-gray-500 mt-2 text-center">
                  ✨ A busca é feita automaticamente enquanto você digita
                  {searchQuery.length > 0 && searchQuery.length < 2 && (
                    <span className="text-orange-500"> - Digite pelo menos 2 caracteres</span>
                  )}
                </p>
              </div>

              {/* Search Results */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-700">Resultados da Busca</h4>
                      <span className="text-sm text-gray-500">{searchResults.length} músicas encontradas</span>
                    </div>
                    <div className="grid gap-4 max-h-96 overflow-y-auto">
                      {searchResults.map((track) => (
                        <motion.div
                          key={track.uri}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img
                                src={track.image}
                                alt={track.album}
                                className="w-16 h-16 rounded-lg object-cover shadow-md"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/audio/default-album.jpg';
                                }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300 flex items-center justify-center">
                                <FaPlus className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-800 text-lg">{track.name}</h5>
                              <p className="text-sm text-gray-600">{track.artist}</p>
                              <p className="text-xs text-gray-500">{track.album}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                  {track.duration}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => addToPlaylist(track)}
                              disabled={isAdding}
                              className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl"
                              title="Adicionar à playlist"
                            >
                              {isAdding ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <FaPlus className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty State */}
              {searchQuery && searchResults.length === 0 && !isSearching && (
                <div className="text-center py-8">
                  <FaMusic className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma música encontrada.</p>
                  <p className="text-gray-400 text-sm">Tente buscar por outro termo.</p>
                </div>
              )}
            </div>

            {/* Playlist Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                    Nossa Playlist
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Trilha sonora criada com amor pelos nossos convidados
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-olive-100 px-4 py-2 rounded-full">
                    <FaMusic className="text-green-600 text-sm" />
                    <span className="text-sm font-medium text-green-700">
                      {playlistTracks.length} {playlistTracks.length === 1 ? 'música' : 'músicas'}
                    </span>
                  </div>
                </div>
              </div>
              
              {playlistTracks.length > 0 ? (
                <div className="space-y-3">
                  {playlistTracks.slice(0, isExpanded ? playlistTracks.length : 8).map((track, index) => (
                    <motion.div
                      key={track.uri}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        {/* Número da faixa */}
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                          {index + 1}
                        </div>
                        
                        {/* Imagem do álbum */}
                        <div className="flex-shrink-0 relative">
                          <img
                            src={track.image}
                            alt={track.album}
                            className="w-16 h-16 rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/audio/default-album.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300"></div>
                        </div>
                        
                        {/* Informações da música */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-base leading-tight truncate group-hover:text-green-700 transition-colors">
                            {track.name}
                          </h4>
                          <p className="text-gray-600 text-sm font-medium mt-1">
                            {track.artist}
                          </p>
                          <p className="text-gray-500 text-xs mt-1 truncate">
                            {track.album}
                          </p>
                        </div>
                        
                        {/* Duração e ações */}
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full font-medium">
                            {track.duration}
                          </span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FaHeart className="text-green-500 text-sm cursor-pointer hover:text-green-600 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Gradiente fade no final se houver mais músicas */}
                  {!isExpanded && playlistTracks.length > 8 && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none h-16 -mt-8"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <FaMusic className="text-3xl text-gray-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">
                    A playlist está esperando por você!
                  </h4>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Seja o primeiro a adicionar uma música especial para nossa celebração. 
                    Use a busca acima para encontrar suas músicas favoritas.
                  </p>
                </div>
              )}

              {/* Botão Ver Mais/Menos */}
              {playlistTracks.length > 8 && (
                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-olive-500 to-olive-600 hover:from-olive-600 hover:to-olive-700 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                  >
                    <FaMusic className="text-sm" />
                    {isExpanded ? (
                      <span>Ver Menos</span>
                    ) : (
                      <span>Ver Todas ({playlistTracks.length} músicas)</span>
                    )}
                  </button>
                </div>
              )}

              {/* Estatísticas da playlist (se houver músicas) */}
              {playlistTracks.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {playlistTracks.length}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Músicas
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-olive-600">
                        {new Set(playlistTracks.map(t => t.artist)).size}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Artistas
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(playlistTracks.reduce((acc, track) => {
                          const [min, sec] = track.duration.split(':').map(Number);
                          return acc + (min * 60 + sec);
                        }, 0) / 60)}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Minutos
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-olive-600">
                        💕
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Com Amor
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpotifyPlaylist; 