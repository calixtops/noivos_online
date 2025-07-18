import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string; // coloque sua URI no .env.local
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, message, attending } = req.body;

  try {
    await client.connect();
    const db = client.db('casamento');
    const collection = db.collection('mensagens');
    await collection.insertOne({
      date: new Date().toISOString(),
      name,
      email,
      message,
      attending,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao salvar mensagem' });
  }
}