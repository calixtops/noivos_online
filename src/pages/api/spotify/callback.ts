import { NextApiRequest, NextApiResponse } from 'next';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '2bb471bbbeee452a8700265cf181ba7d';
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '860c75d6f6584ea7871274b2e8ade0e0';

// Determinar a URI de redirecionamento baseada no ambiente
const getRedirectUri = () => {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
    return 'https://georgia-pedro.vercel.app/api/spotify/callback';
  }
  return 'http://127.0.0.1:3000/api/spotify/callback';
};

const REDIRECT_URI = getRedirectUri();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🚀 CALLBACK CHAMADO!', {
    method: req.method,
    query: req.query,
    url: req.url,
    hasCode: !!req.query.code,
    hasState: !!req.query.state,
    error: req.query.error
  });

  if (req.method !== 'GET' && req.method !== 'POST') {
    console.log('❌ Método não permitido:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let code: string | undefined;
  let state: string | undefined;
  let error: string | undefined;

  if (req.method === 'GET') {
    const query = req.query;
    code = query.code as string;
    state = query.state as string;
    error = query.error as string;
  } else {
    const body = req.body;
    code = body.code;
    state = body.state;
    error = body.error;
  }

  // Verificar se houve erro
  if (error) {
    console.log('❌ Erro do Spotify:', error);
    if (req.method === 'GET') {
      return res.redirect('/playlist?error=access_denied');
    }
    return res.status(400).json({ error: 'Acesso negado pelo Spotify' });
  }

  // Verificar se temos o código de autorização
  if (!code || typeof code !== 'string') {
    console.log('❌ Código ausente');
    if (req.method === 'GET') {
      return res.redirect('/playlist?error=no_code');
    }
    return res.status(400).json({ error: 'Código de autorização não fornecido' });
  }

  console.log('🎯 Parâmetros válidos:', {
    codeLength: code.length,
    hasState: !!state
  });

  // Verificar state para segurança
  const savedState = req.cookies.spotify_state;
  console.log('🔐 Verificando state:', {
    received: state,
    stored: savedState,
    match: state === savedState
  });
  
  if (!state || state !== savedState) {
    console.log('❌ State inválido');
    if (req.method === 'GET') {
      return res.redirect('/playlist?error=invalid_state');
    }
    return res.status(400).json({ error: 'State inválido' });
  }

  try {
    console.log('🔄 Trocando code por token...');
    // Trocar código por token de acesso
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }).toString(),
    });

    console.log('📡 Resposta do token:', {
      status: tokenResponse.status,
      ok: tokenResponse.ok
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.log('❌ Erro ao obter token:', errorText);
      throw new Error('Failed to get access token');
    }

    const tokenData = await tokenResponse.json();
    
    console.log('🎯 Token recebido:', { 
      hasAccessToken: !!tokenData.access_token, 
      hasRefreshToken: !!tokenData.refresh_token,
      expiresIn: tokenData.expires_in,
      tokenLength: tokenData.access_token ? tokenData.access_token.length : 0
    });
    
    // Armazenar tokens em cookies seguros
    const cookieOptions = `Path=/; HttpOnly; SameSite=Lax; Secure=${process.env.NODE_ENV === 'production'}`;
    res.setHeader('Set-Cookie', [
      `spotify_access_token=${tokenData.access_token}; ${cookieOptions}; Max-Age=${tokenData.expires_in || 3600}`,
      `spotify_refresh_token=${tokenData.refresh_token || ''}; ${cookieOptions}; Max-Age=2592000`,
      'spotify_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0', // Limpar state
      'spotify_state_debug=; Path=/; SameSite=Lax; Max-Age=0' // Limpar state debug
    ]);

    console.log('🍪 Cookies definidos, redirecionando para /playlist?success=authenticated');

    // Retornar sucesso
    if (req.method === 'GET') {
      console.log('✅ Redirecionando para /playlist com sucesso');
      return res.redirect('/playlist?success=authenticated');
    }
    return res.status(200).json({ success: true, message: 'Autenticação realizada com sucesso!' });

  } catch (error) {
    console.error('💥 Erro no callback:', error);
    if (req.method === 'GET') {
      return res.redirect('/playlist?error=token_error');
    }
    return res.status(500).json({ error: 'Erro ao obter token de acesso' });
  }
} 