import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accessToken = req.cookies.spotify_access_token;
  
  if (!accessToken) {
    return res.status(200).json({ 
      authenticated: false,
      reason: 'no_token',
      debug: {
        allCookies: Object.keys(req.cookies),
        hasSpotifyState: !!req.cookies.spotify_state
      }
    });
  }

  try {
    // Verificar se o token ainda é válido fazendo uma requisição para a API do Spotify
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return res.status(200).json({ 
        authenticated: true,
        user: {
          id: userData.id,
          display_name: userData.display_name,
          email: userData.email
        }
      });
    } else {
      // Token expirado ou inválido
      return res.status(200).json({ 
        authenticated: false,
        reason: 'invalid_token',
        debug: {
          spotifyStatus: response.status,
          tokenLength: accessToken.length
        }
      });
    }
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return res.status(200).json({ 
      authenticated: false,
      reason: 'api_error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 