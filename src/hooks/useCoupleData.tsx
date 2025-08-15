import { useCoupleData as useCoupleContext } from '../contexts/CoupleContext';

// Re-export do hook do contexto para manter compatibilidade
export function useCoupleData() {
  return useCoupleContext();
}
