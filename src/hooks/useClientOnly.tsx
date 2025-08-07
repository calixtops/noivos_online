import { useEffect, useState } from 'react';

/**
 * Hook para garantir que o componente só renderize no cliente
 * Resolve problemas de hydration mismatch
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Simples flag para indicar que estamos no cliente
    setIsClient(true);
  }, []);

  return isClient;
}
