import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getRandomCouple, getCoupleByIndex, CoupleData } from '../utils/coupleData';

interface CoupleContextType {
  coupleData: CoupleData | null;
  isLoading: boolean;
  refreshCouple: () => void;
  selectCoupleByIndex: (index: number) => void;
}

const CoupleContext = createContext<CoupleContextType | undefined>(undefined);

interface CoupleProviderProps {
  children: ReactNode;
}

export function CoupleProvider({ children }: CoupleProviderProps) {
  const [coupleData, setCoupleData] = useState<CoupleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const generateCouple = () => {
    // Gerar uma chave única baseada em fatores que não mudam durante a sessão
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const screenWidth = typeof window !== 'undefined' ? window.screen.width : 1920;
    const screenHeight = typeof window !== 'undefined' ? window.screen.height : 1080;
    
    // Combinar fatores para criar uma seed única mas consistente
    const combinedSeed = `${userAgent}_${screenWidth}_${screenHeight}`;
    const hash = combinedSeed.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Usar o hash para selecionar um casal de forma determinística
    const coupleIndex = Math.abs(hash) % 25; // 25 casais disponíveis
    return getCoupleByIndex(coupleIndex);
  };

  useEffect(() => {
    setIsLoading(true);
    
    // Verificar se já existe um casal selecionado no sessionStorage
    const storedCouple = sessionStorage.getItem('selectedCouple');
    
    if (storedCouple) {
      // Se existe, usar o casal armazenado
      setCoupleData(JSON.parse(storedCouple));
      setIsLoading(false);
    } else {
      // Se não existe, gerar um novo casal e armazenar
      const selectedCouple = generateCouple();
      setCoupleData(selectedCouple);
      sessionStorage.setItem('selectedCouple', JSON.stringify(selectedCouple));
      setIsLoading(false);
    }
  }, []); // Executa apenas uma vez na montagem

  // Função para forçar uma nova seleção aleatória
  const refreshCouple = () => {
    setIsLoading(true);
    const newCouple = getRandomCouple();
    setCoupleData(newCouple);
    sessionStorage.setItem('selectedCouple', JSON.stringify(newCouple));
    setIsLoading(false);
  };

  // Função para selecionar um casal específico (útil para testes)
  const selectCoupleByIndex = (index: number) => {
    setIsLoading(true);
    const specificCouple = getCoupleByIndex(index);
    setCoupleData(specificCouple);
    sessionStorage.setItem('selectedCouple', JSON.stringify(specificCouple));
    setIsLoading(false);
  };

  const value = {
    coupleData,
    isLoading,
    refreshCouple,
    selectCoupleByIndex
  };

  return (
    <CoupleContext.Provider value={value}>
      {children}
    </CoupleContext.Provider>
  );
}

export function useCoupleData() {
  const context = useContext(CoupleContext);
  if (context === undefined) {
    throw new Error('useCoupleData must be used within a CoupleProvider');
  }
  return context;
}
