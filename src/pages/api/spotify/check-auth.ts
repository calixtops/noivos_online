import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accessToken = req.cookies.spotify_access_token;
  
  console.log('🔍 check-auth - cookies recebidos:', {
    hasSpotifyToken: !!accessToken,
    allCookies: Object.keys(req.cookies),
    tokenLength: accessToken ? accessToken.length : 0
  });
  
  if (!accessToken) {
    console.log('❌ Nenhum token encontrado nos cookies');
    return res.status(200).json({ authenticated: false });
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
      return res.status(200).json({ authenticated: false });
    }
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return res.status(200).json({ authenticated: false });
  }
} 