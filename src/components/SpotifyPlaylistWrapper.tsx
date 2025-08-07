import dynamic from 'next/dynamic';
import { FaSpotify } from 'react-icons/fa';
import { useClientOnly } from '../hooks/useClientOnly';

// Importação dinâmica do componente SpotifyPlaylist com SSR desabilitado
const SpotifyPlaylist = dynamic(() => import('./SpotifyPlaylist'), {
  ssr: false, // Essencial para evitar hydration mismatch
  loading: () => (
    <section className="py-16 bg-gradient-to-br from-green-50 via-olive-50 to-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <FaSpotify className="text-4xl text-green-500" />
              <h2 className="font-serif text-3xl sm:text-4xl text-olive-800">
                Nossa Playlist Colaborativa
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Carregando playlist colaborativa...
            </p>
            
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ),
});

const SpotifyPlaylistWrapper = () => {
  const isClient = useClientOnly();
  
  // Só renderiza após hidratação
  if (!isClient) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 via-olive-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <FaSpotify className="text-4xl text-green-500" />
                <h2 className="font-serif text-3xl sm:text-4xl text-olive-800">
                  Nossa Playlist Colaborativa
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Preparando playlist colaborativa...
              </p>
              
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return <SpotifyPlaylist />;
};

export default SpotifyPlaylistWrapper; 