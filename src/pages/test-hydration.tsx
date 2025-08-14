import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useAudio } from '../contexts/AudioContext';

export default function TestHydration() {
  const [isMounted, setIsMounted] = useState(false);
  const [serverTime, setServerTime] = useState('Loading...');
  const { isHydrated, isPlaying, togglePlay, currentTrackName } = useAudio();

  useEffect(() => {
    setIsMounted(true);
    setServerTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-olive-50 p-8">
      <Head>
        <title>Teste de Hidratação - João & Maria</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-olive-800 mb-8 text-center">
          🧪 Teste de Hidratação
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status do Cliente */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-olive-700 mb-4">
              📱 Status do Cliente
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Montado:</span>
                <span className={`font-medium ${isMounted ? 'text-green-600' : 'text-red-600'}`}>
                  {isMounted ? '✅ Sim' : '❌ Não'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hidratado:</span>
                <span className={`font-medium ${isHydrated ? 'text-green-600' : 'text-red-600'}`}>
                  {isHydrated ? '✅ Sim' : '❌ Não'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hora do Cliente:</span>
                <span className="font-medium text-blue-600">
                  {isMounted ? new Date().toLocaleTimeString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Status do Player */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-olive-700 mb-4">
              🎵 Status do Player
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tocando:</span>
                <span className={`font-medium ${isPlaying ? 'text-green-600' : 'text-red-600'}`}>
                  {isPlaying ? '✅ Sim' : '❌ Não'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Música Atual:</span>
                <span className="font-medium text-blue-600 truncate max-w-32">
                  {currentTrackName || 'Nenhuma'}
                </span>
              </div>
              <button
                onClick={togglePlay}
                className="w-full bg-olive-600 text-white py-2 px-4 rounded-lg hover:bg-olive-700 transition-colors"
                disabled={!isHydrated}
              >
                {isPlaying ? '⏸️ Pausar' : '▶️ Tocar'}
              </button>
            </div>
          </div>

          {/* Comparação Servidor/Cliente */}
          <div className="bg-white rounded-lg p-6 shadow-lg md:col-span-2">
            <h2 className="text-xl font-semibold text-olive-700 mb-4">
              🔄 Comparação Servidor/Cliente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Servidor:</h3>
                <div className="bg-gray-100 p-3 rounded">
                  <p><strong>Hora:</strong> {serverTime}</p>
                  <p><strong>Montado:</strong> ❌ Não</p>
                  <p><strong>Hidratado:</strong> ❌ Não</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Cliente:</h3>
                <div className="bg-blue-50 p-3 rounded">
                  <p><strong>Hora:</strong> {isMounted ? new Date().toLocaleTimeString() : 'N/A'}</p>
                  <p><strong>Montado:</strong> {isMounted ? '✅ Sim' : '❌ Não'}</p>
                  <p><strong>Hidratado:</strong> {isHydrated ? '✅ Sim' : '❌ Não'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logs de Debug */}
          <div className="bg-white rounded-lg p-6 shadow-lg md:col-span-2">
            <h2 className="text-xl font-semibold text-olive-700 mb-4">
              📋 Logs de Debug
            </h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div>🔄 Renderização inicial...</div>
              <div>📱 Cliente montado: {isMounted ? 'true' : 'false'}</div>
              <div>💧 Hidratação: {isHydrated ? 'true' : 'false'}</div>
              <div>🎵 Player carregado: {isHydrated ? 'true' : 'false'}</div>
              <div>✅ Teste concluído!</div>
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">📖 Como Interpretar:</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• <strong>Montado:</strong> Indica se o componente foi renderizado no cliente</li>
            <li>• <strong>Hidratado:</strong> Indica se o estado foi sincronizado entre servidor e cliente</li>
            <li>• <strong>Hora:</strong> Mostra a diferença entre renderização no servidor e cliente</li>
            <li>• Se todos os status estiverem verdes, a hidratação está funcionando corretamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
