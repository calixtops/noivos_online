import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Validação básica dos dados
  const { name, email, message, attending, guests } = req.body;
  
  if (!name || !email || !attending) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  // Verificar se a URI do MongoDB está configurada
  if (!uri) {
    console.error('MONGODB_URI não configurada no .env.local');
    return res.status(500).json({ error: 'Configuração do banco de dados não encontrada' });
  }

  let client;
  
  try {
    client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('casamento');
    const collection = db.collection('confirmacoes');
    
    const confirmacao = {
      createdAt: new Date(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      message: message?.trim() || '',
      attending,
      guests: attending === 'yes' ? (guests || 1) : 0,
      userAgent: req.headers['user-agent'] || '',
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };
    
    await collection.insertOne(confirmacao);
    
    console.log('Confirmação salva:', { name, email, attending, guests });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Confirmação recebida com sucesso!' 
    });
    
  } catch (error) {
    console.error('Erro ao salvar confirmação:', error);
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