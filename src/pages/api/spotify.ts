import { NextApiRequest, NextApiResponse } from 'next';

// Configurações do Spotify
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '2bb471bbbeee452a8700265cf181ba7d';
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '860c75d6f6584ea7871274b2e8ade0e0';
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/spotify/callback';

// Função para obter token de acesso
async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  return data.access_token;
}

// Função para fazer requisições à API do Spotify
async function fetchSpotifyApi(endpoint: string, method: string = 'GET', body?: any) {
  const token = await getAccessToken();
  
  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status}`);
  }

  return await res.json();
}

// Função para formatar duração de milissegundos para mm:ss
function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  try {
    switch (method) {
      case 'GET':
        // Teste de conexão
        if (query.test) {
          try {
            const token = await getAccessToken();
            return res.status(200).json({ 
              success: true, 
              message: 'Conexão com Spotify OK',
              token: token.substring(0, 20) + '...' // Mostra apenas parte do token
            });
          } catch (error) {
            return res.status(500).json({ 
              error: 'Erro ao conectar com Spotify',
              details: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        }

        // Buscar músicas no Spotify
        if (query.search) {
          const searchQuery = query.search as string;
          const searchResults = await fetchSpotifyApi(`search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10`);
          
          const tracks = searchResults.tracks.items.map((track: any) => ({
            uri: track.uri,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            image: track.album.images[0]?.url || '/images/audio/default-album.jpg',
            duration: formatDuration(track.duration_ms),
          }));

          return res.status(200).json({ tracks });
        }

        // Buscar playlist específica
        if (query.playlist) {
          const playlistId = query.playlist as string;
          const playlist = await fetchSpotifyApi(`playlists/${playlistId}`);
          
          // Verificar se a playlist tem tracks
          const tracks = playlist.tracks?.items?.map((item: any) => {
            if (!item.track) return null;
            
            return {
              uri: item.track.uri,
              name: item.track.name,
              artist: item.track.artists?.[0]?.name || 'Artista desconhecido',
              album: item.track.album?.name || 'Álbum desconhecido',
              image: item.track.album?.images?.[0]?.url || '/images/audio/default-album.jpg',
              duration: formatDuration(item.track.duration_ms || 0),
            };
          }).filter(Boolean) || [];

          return res.status(200).json({ 
            playlist: {
              id: playlist.id,
              name: playlist.name,
              description: playlist.description,
              image: playlist.images?.[0]?.url,
              tracks,
            }
          });
        }

        return res.status(400).json({ error: 'Missing search or playlist parameter' });

      case 'POST':
        // Adicionar música à playlist
        if (body.playlistId && body.trackUri) {
          const { playlistId, trackUri } = body;
          
          try {
            // Verificar se temos token de usuário
            const userToken = req.cookies.spotify_access_token;
            
            if (!userToken) {
              return res.status(401).json({ 
                error: 'Autenticação necessária',
                details: 'É necessário fazer login com o Spotify para adicionar músicas'
              });
            }

            // Usar token do usuário para adicionar música
            const addResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uris: [trackUri]
              }),
            });

            if (!addResponse.ok) {
              throw new Error(`Spotify API error: ${addResponse.status}`);
            }

            return res.status(200).json({ success: true, message: 'Música adicionada com sucesso!' });
          } catch (error) {
            console.error('Erro ao adicionar música:', error);
            return res.status(500).json({ 
              error: 'Erro ao adicionar música à playlist',
              details: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        }

        // Criar nova playlist
        if (body.name) {
          // Primeiro, buscar o ID do usuário
          const user = await fetchSpotifyApi('me');
          
          // Criar a playlist
          const playlist = await fetchSpotifyApi(
            `users/${user.id}/playlists`,
            'POST',
            {
              name: body.name,
              description: body.description || 'Playlist colaborativa do casamento',
              public: true,
              collaborative: true, // Permite colaboração
            }
          );

          // Se houver músicas iniciais, adicioná-las
          if (body.tracks && body.tracks.length > 0) {
            await fetchSpotifyApi(
              `playlists/${playlist.id}/tracks`,
              'POST',
              {
                uris: body.tracks
              }
            );
          }

          return res.status(200).json({ 
            success: true, 
            playlist: {
              id: playlist.id,
              name: playlist.name,
              url: playlist.external_urls.spotify,
            }
          });
        }

        return res.status(400).json({ error: 'Missing required parameters' });

      case 'DELETE':
        // Remover música da playlist
        if (query.playlistId && query.trackUri) {
          const { playlistId, trackUri } = query;
          
          await fetchSpotifyApi(
            `playlists/${playlistId}/tracks`,
            'DELETE',
            {
              tracks: [{ uri: trackUri }]
            }
          );

          return res.status(200).json({ success: true, message: 'Música removida com sucesso!' });
        }

        return res.status(400).json({ error: 'Missing playlistId or trackUri parameter' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('Spotify API Error:', error);
    return res.status(500).json({ 
      error: 'Erro ao conectar com o Spotify',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 