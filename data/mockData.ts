// Dados fictícios para demonstração do sistema

export const mockConfirmacoes = [
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

export const mockPresentes = [
  {
    id: 1,
    name: 'Jogo de Panelas Tramontina',
    description: 'Conjunto de panelas com 5 peças em aço inox',
    price: 450,
    category: 'casa',
    image: '/images/presentes/panelas_tramon.jpg',
    purchased: false
  },
  {
    id: 2,
    name: 'Mixer Philips Walita',
    description: 'Mixer 2 em 1 com processador e batedor',
    price: 180,
    category: 'casa',
    image: '/images/presentes/mixer.jpg',
    purchased: true
  },
  {
    id: 3,
    name: 'Jogo de Cama 300 fios',
    description: 'Jogo de cama casal 100% algodão',
    price: 120,
    category: 'casa',
    image: '/images/presentes/jogo_cama.jpg',
    purchased: false
  },
  {
    id: 4,
    name: 'Viagem Romântica - Serra',
    description: 'Pacote de 3 dias na Serra Gaúcha',
    price: 800,
    category: 'viagem',
    image: '/images/presentes/viagem-romantica-serra.jpg',
    purchased: false
  }
];

export const mockHospedagem = [
  {
    id: 1,
    name: 'Hotel Central',
    address: 'Rua Principal, 100 - Centro, São Paulo - SP',
    phone: '(11) 99999-9999',
    site: 'https://www.hotelcentral.com.br',
    description: 'Hotel tradicional da região, com piscina, restaurante, quartos confortáveis e excelente localização.',
    rating: 4.5,
    priceRange: 'R$ 200-350',
    amenities: ['wifi', 'piscina', 'restaurante', 'estacionamento'],
    category: 'hotel',
    featured: true
  },
  {
    id: 2,
    name: 'Pousada Tranquila',
    address: 'Rua da Paz, 50 - Bairro Tranquilo, São Paulo - SP',
    phone: '(11) 77777-7777',
    site: 'https://www.pousadatranquila.com.br',
    description: 'Pousada com ambiente familiar, piscina, café da manhã incluso e quartos confortáveis.',
    rating: 4.4,
    priceRange: 'R$ 150-250',
    amenities: ['wifi', 'piscina', 'cafeManha'],
    category: 'pousada',
    featured: true
  }
];

export const mockMensagens = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    message: 'Estamos muito felizes por vocês! Não podemos esperar para celebrar esse momento especial.',
    date: '2024-11-15T10:30:00.000Z',
    type: 'confirmacao'
  },
  {
    id: 2,
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    message: 'Parabéns pelo casamento! Infelizmente não conseguirei comparecer devido a um compromisso de trabalho.',
    date: '2024-11-14T15:45:00.000Z',
    type: 'confirmacao'
  },
  {
    id: 3,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    message: 'Que momento especial! Estou muito feliz por vocês. Vou tentar ir, mas ainda não tenho certeza.',
    date: '2024-11-13T09:20:00.000Z',
    type: 'confirmacao'
  }
];

// Função para calcular estatísticas
export const calculateStats = (confirmacoes: any[]) => {
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

// Função para gerar dados fictícios dinamicamente
export const generateMockData = (count: number = 10) => {
  const names = [
    'Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Pereira', 'Fernanda Costa',
    'Roberto Almeida', 'Patrícia Lima', 'Ricardo Ferreira', 'Lucia Martins', 'Marcos Souza',
    'Juliana Rodrigues', 'Lucas Gomes', 'Camila Santos', 'Lucas Oliveira', 'Beatriz Costa'
  ];

  const messages = [
    'Estamos muito felizes por vocês! Não podemos esperar para celebrar esse momento especial.',
    'Parabéns pelo casamento! Vocês merecem toda a felicidade do mundo.',
    'Que momento especial! Estou muito feliz por vocês.',
    'Parabéns! Vocês são um casal incrível.',
    'Estou muito feliz por vocês! Vou tentar ir, mas ainda não tenho certeza.',
    'Que alegria! Vocês são um casal perfeito.',
    'Parabéns pelo casamento! Vocês merecem toda a felicidade.',
    'Estou muito feliz por vocês! Infelizmente não conseguirei comparecer.',
    'Parabéns! Vocês são um casal incrível. Vou tentar ir.',
    'Que momento especial! Vocês merecem toda a felicidade.'
  ];

  const attendingOptions = ['yes', 'no', 'maybe'];

  const mockData = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomAttending = attendingOptions[Math.floor(Math.random() * attendingOptions.length)];
    const randomGuests = randomAttending === 'yes' ? Math.floor(Math.random() * 5) + 1 : 0;
    
    // Data aleatória nos últimos 30 dias
    const randomDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);

    mockData.push({
      _id: (i + 1).toString(),
      name: randomName,
      email: `${randomName.toLowerCase().replace(' ', '.')}@email.com`,
      message: randomAttending === 'no' ? randomMessage : (Math.random() > 0.3 ? randomMessage : ''),
      attending: randomAttending,
      guests: randomGuests,
      createdAt: randomDate.toISOString()
    });
  }

  return mockData;
};
