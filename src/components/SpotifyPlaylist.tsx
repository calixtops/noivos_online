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
  const [errorMessage, setErrorMessage] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
      
      if (!authData.authenticated) {
        setIsAuthenticated(false);
        setErrorMessage('Sessão expirada. Faça login novamente com o Spotify');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
      
      // Atualizar estado de autenticação
      setIsAuthenticated(true);
    } catch (error) {
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
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Verificar autenticação
  const checkAuth = async () => {
    if (!isClient) return;
    
    try {
      const response = await fetch('/api/spotify/check-auth');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
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
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          window.history.replaceState({}, '', '/playlist');
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
            <span>Operação realizada com sucesso!</span>
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
                    <div className={`w-3 h-3 rounded-full animate-pulse ${isAuthenticated ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className={`font-semibold text-sm ${isAuthenticated ? 'text-green-700' : 'text-yellow-700'}`}>
                      {isAuthenticated ? '🎵 Conectado ao Spotify' : '🔗 Conecte-se ao Spotify'}
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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Nossa Playlist
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {playlistTracks.length} músicas
                  </span>
                </div>
              </div>
              
              {playlistTracks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {playlistTracks.slice(0, isExpanded ? playlistTracks.length : 6).map((track, index) => (
                    <motion.div
                      key={track.uri}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group relative"
                    >
                      {/* Número da música */}
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                      
                      {/* Imagem do álbum */}
                      <div className="relative mb-3">
                        <img
                          src={track.image}
                          alt={track.album}
                          className="w-full h-32 rounded-lg object-cover shadow-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/audio/default-album.jpg';
                          }}
                        />
                      </div>
                      
                      {/* Informações da música */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
                          {track.name}
                        </h4>
                        <p className="text-xs text-gray-600 font-medium">
                          {track.artist}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {track.album}
                        </p>
                        
                        {/* Duração */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {track.duration}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaMusic className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma música adicionada ainda.</p>
                  <p className="text-gray-400 text-sm">Use a busca acima para adicionar músicas!</p>
                </div>
              )}

              {/* Botão Ver Mais */}
              {playlistTracks.length > 6 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="px-6 py-2 bg-olive-500 hover:bg-olive-600 text-white rounded-full transition-colors"
                  >
                    {isExpanded ? 'Ver Menos' : `Ver Mais (${playlistTracks.length - 6})`}
                  </button>
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