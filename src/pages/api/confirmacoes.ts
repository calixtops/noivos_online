import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

// Dados fictícios para demonstração
const mockConfirmacoes = [
  {
    _id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    message: 'Estamos muito felizes por vocês! Não podemos esperar para celebrar esse momento especial. Vamos levar nossos dois filhos também.',
    attending: 'yes',
    guests: 4,
    createdAt: '2024-11-15T10:30:00.000Z'
  },
  {
    _id: '2',
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    message: 'Parabéns pelo casamento! Infelizmente não conseguirei comparecer devido a um compromisso de trabalho que não posso adiar.',
    attending: 'no',
    guests: 0,
    createdAt: '2024-11-14T15:45:00.000Z'
  },
  {
    _id: '3',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    message: 'Que momento especial! Estou muito feliz por vocês. Vou tentar ir, mas ainda não tenho certeza se conseguirei sair do trabalho.',
    attending: 'maybe',
    guests: 1,
    createdAt: '2024-11-13T09:20:00.000Z'
  },
  {
    _id: '4',
    name: 'João Pereira',
    email: 'joao.pereira@email.com',
    message: 'Parabéns! Vocês merecem toda a felicidade do mundo. Estarei lá com certeza!',
    attending: 'yes',
    guests: 1,
    createdAt: '2024-11-12T14:15:00.000Z'
  },
  {
    _id: '5',
    name: 'Fernanda Costa',
    email: 'fernanda.costa@email.com',
    message: '',
    attending: 'yes',
    guests: 2,
    createdAt: '2024-11-11T11:00:00.000Z'
  },
  {
    _id: '6',
    name: 'Roberto Almeida',
    email: 'roberto.almeida@email.com',
    message: 'Que alegria! Vocês são um casal incrível. Infelizmente não poderei comparecer, mas estarei torcendo por vocês de longe.',
    attending: 'no',
    guests: 0,
    createdAt: '2024-11-10T16:30:00.000Z'
  },
  {
    _id: '7',
    name: 'Patrícia Lima',
    email: 'patricia.lima@email.com',
    message: 'Estou muito feliz por vocês! Vou tentar ir, mas depende de como estarei de saúde na data.',
    attending: 'maybe',
    guests: 1,
    createdAt: '2024-11-09T13:45:00.000Z'
  },
  {
    _id: '8',
    name: 'Ricardo Ferreira',
    email: 'ricardo.ferreira@email.com',
    message: 'Parabéns pelo casamento! Vocês são um casal perfeito. Estarei lá com minha esposa.',
    attending: 'yes',
    guests: 2,
    createdAt: '2024-11-08T10:20:00.000Z'
  },
  {
    _id: '9',
    name: 'Lucia Martins',
    email: 'lucia.martins@email.com',
    message: 'Que momento especial! Vocês merecem toda a felicidade. Vou levar minha família toda.',
    attending: 'yes',
    guests: 5,
    createdAt: '2024-11-07T15:10:00.000Z'
  },
  {
    _id: '10',
    name: 'Marcos Souza',
    email: 'marcos.souza@email.com',
    message: '',
    attending: 'yes',
    guests: 1,
    createdAt: '2024-11-06T12:30:00.000Z'
  },
  {
    _id: '11',
    name: 'Juliana Rodrigues',
    email: 'juliana.rodrigues@email.com',
    message: 'Estou muito feliz por vocês! Infelizmente não conseguirei comparecer, mas estarei pensando em vocês no grande dia.',
    attending: 'no',
    guests: 0,
    createdAt: '2024-11-05T09:15:00.000Z'
  },
  {
    _id: '12',
    name: 'Lucas Gomes',
    email: 'lucas.gomes@email.com',
    message: 'Parabéns! Vocês são um casal incrível. Vou tentar ir, mas ainda não tenho certeza.',
    attending: 'maybe',
    guests: 1,
    createdAt: '2024-11-04T14:50:00.000Z'
  }
];

// Função para calcular estatísticas
const calculateStats = (confirmacoes: any[]) => {
  return {
    total: confirmacoes.length,
    confirmados: confirmacoes.filter(c => c.attending === 'yes').length,
    recusados: confirmacoes.filter(c => c.attending === 'no').length,
    talvez: confirmacoes.filter(c => c.attending === 'maybe').length,
    totalConvidados: confirmacoes
      .filter(c => c.attending === 'yes')
      .reduce((acc, c) => acc + (c.guests || 0), 0),
    comMensagem: confirmacoes.filter(c => c.message && c.message.trim()).length,
    semMensagem: confirmacoes.filter(c => !c.message || !c.message.trim()).length,
    taxaConfirmacao: confirmacoes.length > 0 
      ? Math.round((confirmacoes.filter(c => c.attending === 'yes').length / confirmacoes.length) * 100)
      : 0,
    mediaConvidados: confirmacoes.filter(c => c.attending === 'yes').length > 0
      ? Math.round(confirmacoes.filter(c => c.attending === 'yes').reduce((acc, c) => acc + (c.guests || 0), 0) / confirmacoes.filter(c => c.attending === 'yes').length)
      : 0
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔥 API Confirmações - Método:', req.method);
  
  if (req.method !== 'GET' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Se não há URI do MongoDB configurada, usar dados fictícios
  if (!uri) {
    console.log('📝 Usando dados fictícios para demonstração');
    
    // DELETE - Simular exclusão
    if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'ID da confirmação é obrigatório' });
      }

      // Simular exclusão (não faz nada real)
      console.log(`🗑️ Simulando exclusão da confirmação ${id}`);
      return res.status(200).json({ success: true, message: 'Confirmação deletada com sucesso (demo)' });
    }
    
    // GET - Retornar dados fictícios
    const stats = calculateStats(mockConfirmacoes);
    
    console.log(`📊 Retornando ${mockConfirmacoes.length} confirmações fictícias`);
    console.log('📈 Estatísticas:', stats);
    
    return res.status(200).json({ 
      success: true,
      confirmacoes: mockConfirmacoes,
      stats,
      demo: true
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
    
    // Se não há confirmações reais, usar dados fictícios
    if (confirmacoes.length === 0) {
      console.log('📝 Nenhuma confirmação real encontrada, usando dados fictícios');
      const stats = calculateStats(mockConfirmacoes);
      
      return res.status(200).json({ 
        success: true,
        confirmacoes: mockConfirmacoes,
        stats,
        demo: true
      });
    }
    
    // Calcular estatísticas das confirmações reais
    const stats = calculateStats(confirmacoes);
    
    console.log('📈 Estatísticas:', stats);
    
    return res.status(200).json({ 
      success: true,
      confirmacoes,
      stats
    });
    
  } catch (error) {
    console.error('❌ Erro ao buscar confirmações:', error);
    console.error('Stack trace:', error.stack);
    
    // Em caso de erro, retornar dados fictícios
    console.log('📝 Erro na conexão, usando dados fictícios');
    const stats = calculateStats(mockConfirmacoes);
    
    return res.status(200).json({ 
      success: true,
      confirmacoes: mockConfirmacoes,
      stats,
      demo: true,
      error: 'Usando dados de demonstração devido a erro na conexão'
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
