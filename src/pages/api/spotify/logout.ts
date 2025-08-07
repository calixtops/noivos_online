import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Limpar cookies de autenticação
  res.setHeader('Set-Cookie', [
    'spotify_access_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
    'spotify_refresh_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
    'spotify_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
  ]);

  return res.status(200).json({ success: true, message: 'Logout realizado com sucesso' });
} 