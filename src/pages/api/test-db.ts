import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔥 API Test DB - Iniciando teste de conexão');
  
  // Verificar variáveis de ambiente
  console.log('🔍 Verificando variáveis de ambiente:');
  console.log('- MONGODB_URI existe:', !!uri);
  console.log('- MONGODB_URI começa com mongodb+srv:', uri?.startsWith('mongodb+srv://'));
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  
  if (!uri) {
    console.error('❌ MONGODB_URI não encontrada');
    return res.status(500).json({ 
      error: 'MONGODB_URI não configurada',
      env: process.env.NODE_ENV,
      availableVars: Object.keys(process.env).filter(key => key.includes('MONGO'))
    });
  }

  let client;
  
  try {
    console.log('🔗 Tentando conectar ao MongoDB...');
    client = new MongoClient(uri, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });
    
    await client.connect();
    console.log('✅ Conectado ao MongoDB com sucesso!');
    
    // Testar acesso ao banco
    const db = client.db('casamento');
    console.log('📚 Conectado ao banco "casamento"');
    
    // Testar coleção
    const collection = db.collection('confirmacoes');
    const count = await collection.countDocuments();
    console.log(`📊 Coleção "confirmacoes" tem ${count} documentos`);
    
    // Teste de ping
    await db.admin().ping();
    console.log('🏓 Ping ao banco realizado com sucesso');
    
    return res.status(200).json({ 
      success: true,
      message: 'Conexão com MongoDB funcionando perfeitamente!',
      details: {
        database: 'casamento',
        collection: 'confirmacoes',
        documentsCount: count,
        connectionUri: uri.substring(0, 30) + '...',
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error);
    console.error('Tipo do erro:', error.name);
    console.error('Mensagem:', error.message);
    
    return res.status(500).json({ 
      error: 'Falha na conexão com MongoDB',
      details: {
        type: error.name,
        message: error.message,
        code: error.code || 'UNKNOWN',
        timestamp: new Date().toISOString(),
        uri: uri.substring(0, 30) + '...'
      }
    });
    
  } finally {
    if (client) {
      try {
        await client.close();
        console.log('🔌 Conexão fechada');
      } catch (err) {
        console.error('Erro ao fechar conexão:', err);
      }
    }
  }
}
