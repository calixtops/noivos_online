import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    
    // Verifica se a pasta existe
    if (!fs.existsSync(audioDir)) {
      return res.status(200).json([]);
    }

    // Lê todos os arquivos da pasta
    const files = fs.readdirSync(audioDir);
    
    // Filtra apenas arquivos de áudio
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
    const audioFiles = files.filter(file => 
      audioExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );

    // Converte para o formato esperado
    const musicList = audioFiles.map(file => {
      // Remove a extensão para o nome de exibição
      const nameWithoutExt = file.replace(/\.[^/.]+$/, '');
      
      // Melhora o nome para exibição
      const displayName = nameWithoutExt
        .replace(/_/g, ' ')  // Substitui _ por espaços
        .replace(/-/g, ' ')  // Substitui - por espaços
        .trim();

      return {
        file: `/audio/${file}`,
        name: displayName
      };
    });

    res.status(200).json(musicList);
  } catch (error) {
    console.error('Erro ao listar músicas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
