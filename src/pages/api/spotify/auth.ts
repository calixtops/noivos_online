import { NextApiRequest, NextApiResponse } from 'next';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '2bb471bbbeee452a8700265cf181ba7d';

// Determinar a URI de redirecionamento baseada no ambiente
const getRedirectUri = () => {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
    return 'https://georgia-pedro.vercel.app/playlist';
  }
  return 'http://127.0.0.1:3000/playlist';
};

const REDIRECT_URI = getRedirectUri();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Gerar state para segurança
  const state = Math.random().toString(36).substring(7);
  
  // Armazenar state em cookie para verificação (melhorada)
  res.setHeader('Set-Cookie', [
    `spotify_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`,
    `spotify_state_debug=${state}; Path=/; SameSite=Lax; Max-Age=3600` // Cookie não-HttpOnly para debug
  ]);

  // Construir URL de autorização
  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: 'playlist-modify-public playlist-modify-private user-read-private',
    show_dialog: 'true'
  }).toString()}`;

  res.redirect(authUrl);
} 