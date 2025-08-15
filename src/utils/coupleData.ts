export interface CoupleData {
  names: string;
  date: string;
  year: string;
  formattedDate: string;
}

// Função para gerar uma data futura aleatória
function generateRandomFutureDate(): { date: string; year: string; formattedDate: string } {
  const now = new Date();
  
  // Gerar uma data entre 30 dias e 2 anos no futuro
  const minDays = 30;
  const maxDays = 730; // ~2 anos
  const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  
  const futureDate = new Date(now.getTime() + (randomDays * 24 * 60 * 60 * 1000));
  
  // Formatar a data
  const day = futureDate.getDate();
  const month = futureDate.getMonth();
  const year = futureDate.getFullYear();
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const formattedDate = `${day} de ${monthNames[month]} de ${year}`;
  const dateString = futureDate.toISOString().split('T')[0]; // YYYY-MM-DD
  
  return {
    date: dateString,
    year: year.toString(),
    formattedDate
  };
}

export const couplesData: CoupleData[] = [
  {
    names: "Maria e José",
    ...generateRandomFutureDate()
  },
  {
    names: "Francisca e Antônio",
    ...generateRandomFutureDate()
  },
  {
    names: "Ana e João",
    ...generateRandomFutureDate()
  },
  {
    names: "Adriana e Carlos",
    ...generateRandomFutureDate()
  },
  {
    names: "Patrícia e Paulo",
    ...generateRandomFutureDate()
  },
  {
    names: "Aline e Marcos",
    ...generateRandomFutureDate()
  },
  {
    names: "Juliana e Lucas",
    ...generateRandomFutureDate()
  },
  {
    names: "Bruna e Gabriel",
    ...generateRandomFutureDate()
  },
  {
    names: "Fernanda e Rafael",
    ...generateRandomFutureDate()
  },
  {
    names: "Camila e Thiago",
    ...generateRandomFutureDate()
  },
  {
    names: "Mariana e Leonardo",
    ...generateRandomFutureDate()
  },
  {
    names: "Vanessa e Marcelo",
    ...generateRandomFutureDate()
  },
  {
    names: "Carolina e Rodrigo",
    ...generateRandomFutureDate()
  },
  {
    names: "Larissa e Felipe",
    ...generateRandomFutureDate()
  },
  {
    names: "Amanda e Bruno",
    ...generateRandomFutureDate()
  },
  {
    names: "Sandra e Ricardo",
    ...generateRandomFutureDate()
  },
  {
    names: "Flávia e Daniel",
    ...generateRandomFutureDate()
  },
  {
    names: "Cristiane e Eduardo",
    ...generateRandomFutureDate()
  },
  {
    names: "Priscila e Anderson",
    ...generateRandomFutureDate()
  },
  {
    names: "Angélica e Leandro",
    ...generateRandomFutureDate()
  },
  // Adicionando mais casais para maior variedade
  {
    names: "Isabela e Pedro",
    ...generateRandomFutureDate()
  },
  {
    names: "Gabriela e André",
    ...generateRandomFutureDate()
  },
  {
    names: "Tatiana e Roberto",
    ...generateRandomFutureDate()
  },
  {
    names: "Renata e Fernando",
    ...generateRandomFutureDate()
  },
  {
    names: "Luciana e Alexandre",
    ...generateRandomFutureDate()
  }
];

// Função para obter um casal aleatório
export function getRandomCouple(): CoupleData {
  const randomIndex = Math.floor(Math.random() * couplesData.length);
  return couplesData[randomIndex];
}

// Função para obter um casal específico por índice (útil para testes)
export function getCoupleByIndex(index: number): CoupleData {
  return couplesData[index % couplesData.length];
}
