import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔥 API Confirmações - Método:', req.method);
  
  if (req.method !== 'GET' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método não permitido' });
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

    // DELETE - Deletar confirmação
    if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'ID da confirmação é obrigatório' });
      }

      try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Confirmação não encontrada' });
        }

        console.log(`🗑️ Confirmação ${id} deletada com sucesso`);
        return res.status(200).json({ success: true, message: 'Confirmação deletada com sucesso' });
      } catch (error) {
        console.error('❌ Erro ao deletar confirmação:', error);
        return res.status(500).json({ error: 'Erro ao deletar confirmação' });
      }
    }
    
    // GET - Buscar confirmações
    const confirmacoes = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    console.log(`📊 Encontradas ${confirmacoes.length} confirmações`);
    
    // Estatísticas melhoradas
    const stats = {
      total: confirmacoes.length,
      confirmados: confirmacoes.filter(c => c.attending === 'yes').length,
      recusados: confirmacoes.filter(c => c.attending === 'no').length,
      talvez: confirmacoes.filter(c => c.attending === 'maybe').length,
      totalConvidados: confirmacoes
        .filter(c => c.attending === 'yes')
        .reduce((acc, c) => acc + (c.guests || 0), 0),
      // Novas estatísticas
      comMensagem: confirmacoes.filter(c => c.message && c.message.trim()).length,
      semMensagem: confirmacoes.filter(c => !c.message || !c.message.trim()).length,
      taxaConfirmacao: confirmacoes.length > 0 
        ? Math.round((confirmacoes.filter(c => c.attending === 'yes').length / confirmacoes.length) * 100)
        : 0,
      mediaConvidados: confirmacoes.filter(c => c.attending === 'yes').length > 0
        ? Math.round(confirmacoes.filter(c => c.attending === 'yes').reduce((acc, c) => acc + (c.guests || 0), 0) / confirmacoes.filter(c => c.attending === 'yes').length)
        : 0
    };
    
    console.log('📈 Estatísticas:', stats);
    
    return res.status(200).json({ 
      success: true,
      confirmacoes,
      stats
    });
    
  } catch (error) {
    console.error('❌ Erro ao buscar confirmações:', error);
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
