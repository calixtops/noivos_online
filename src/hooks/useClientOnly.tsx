import { useEffect, useState } from 'react';

/**
 * Hook para garantir que o componente só renderize no cliente
 * Resolve problemas de hydration mismatch
 * Otimizado para Fast Refresh
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Marca como cliente após hydratação
    setIsClient(true);
  }, []);

  return isClient;
}
