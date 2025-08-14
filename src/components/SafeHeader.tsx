import dynamic from 'next/dynamic';
import { useClientOnly } from '../hooks/useClientOnly';

// Importar Header dinamicamente para evitar problemas de hidratação
const DynamicHeader = dynamic(() => import('./Header'), {
  ssr: true,
  loading: () => (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-olive-100/50 shadow-lg shadow-olive-100/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">
              João & Maria
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 opacity-75">
              15 de Dezembro de 2024
            </p>
          </div>
          <div className="lg:hidden">
            <div className="w-8 h-8 bg-olive-50 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  )
});

const SafeHeader = () => {
  const isClient = useClientOnly();
  
  if (!isClient) {
    return (
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-olive-100/50 shadow-lg shadow-olive-100/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">
                João & Maria
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 opacity-75">
                15 de Dezembro de 2024
              </p>
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  return <DynamicHeader />;
};

export default SafeHeader;
