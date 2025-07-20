import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔥 API Contact - Método:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Validação básica dos dados
  const { name, email, message, attending, guests } = req.body;
  
  console.log('📝 Dados recebidos:', { name, email, attending, guests, message: message?.length || 0 });
  
  if (!name || !email || !attending) {
    console.log('❌ Validação falhou - campos obrigatórios');
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  // Verificar se a URI do MongoDB está configurada
  if (!uri) {
    console.error('❌ MONGODB_URI não configurada');
    console.error('Variáveis disponíveis:', Object.keys(process.env).filter(key => key.includes('MONGO')));
    return res.status(500).json({ 
      error: 'Configuração do banco de dados não encontrada',
      debug: process.env.NODE_ENV === 'development' ? 'MONGODB_URI missing' : undefined
    });
  }

  console.log('🔗 Tentando conectar ao MongoDB...');

  let client;
  
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Conectado ao MongoDB');
    
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
    
    console.log('✅ Confirmação salva:', { name, email, attending, guests });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Confirmação recebida com sucesso!' 
    });
    
  } catch (error) {
    console.error('❌ Erro ao salvar confirmação:', error);
    console.error('Stack trace:', error.stack);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      type: error.name || 'UnknownError'
    });
  } finally {
    if (client) {
      try {
        await client.close();
        console.log('🔌 Conexão MongoDB fechada');
      } catch (err) {
        console.error('Erro ao fechar conexão:', err);
      }
    }
  }
}