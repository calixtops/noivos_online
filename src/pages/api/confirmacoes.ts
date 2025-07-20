import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Verificar se a URI do MongoDB está configurada
  if (!uri) {
    return res.status(500).json({ error: 'Configuração do banco de dados não encontrada' });
  }

  let client;
  
  try {
    client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('casamento');
    const collection = db.collection('confirmacoes');
    
    // Buscar todas as confirmações, ordenadas por data
    const confirmacoes = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Estatísticas básicas
    const stats = {
      total: confirmacoes.length,
      confirmados: confirmacoes.filter(c => c.attending === 'yes').length,
      recusados: confirmacoes.filter(c => c.attending === 'no').length,
      talvez: confirmacoes.filter(c => c.attending === 'maybe').length,
      totalConvidados: confirmacoes
        .filter(c => c.attending === 'yes')
        .reduce((acc, c) => acc + (c.guests || 0), 0)
    };
    
    return res.status(200).json({ 
      success: true,
      confirmacoes,
      stats
    });
    
  } catch (error) {
    console.error('Erro ao buscar confirmações:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
