import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaHeart, FaUser, FaEnvelope, FaCalendar, FaCheck, FaTimes, FaQuestion, FaEye, FaExpandArrowsAlt } from 'react-icons/fa';

interface Confirmacao {
  _id: string;
  name: string;
  email: string;
  message: string;
  attending: 'yes' | 'no' | 'maybe';
  guests: number;
  createdAt: string;
}

interface Stats {
  total: number;
  confirmados: number;
  recusados: number;
  talvez: number;
  totalConvidados: number;
}

const AdminConfirmacoes = () => {
  const [confirmacoes, setConfirmacoes] = useState<Confirmacao[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<{ name: string; message: string; date: string } | null>(null);

  useEffect(() => {
    fetchConfirmacoes();
  }, []);

  const fetchConfirmacoes = async () => {
    try {
      const res = await fetch('/api/confirmacoes');
      const data = await res.json();
      
      if (data.success) {
        setConfirmacoes(data.confirmacoes);
        setStats(data.stats);
      } else {
        setError(data.error || 'Erro ao carregar confirmações');
      }
    } catch (err) {
      setError('Erro de conexão');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (attending: string) => {
    switch (attending) {
      case 'yes': return <FaCheck className="text-green-500" />;
      case 'no': return <FaTimes className="text-red-500" />;
      case 'maybe': return <FaQuestion className="text-yellow-500" />;
      default: return <FaQuestion className="text-gray-500" />;
    }
  };

  const getStatusText = (attending: string) => {
    switch (attending) {
      case 'yes': return 'Confirmado';
      case 'no': return 'Não vai';
      case 'maybe': return 'Talvez';
      default: return 'Desconhecido';
    }
  };

  const openMessageModal = (name: string, message: string, date: string) => {
    setSelectedMessage({ name, message, date });
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-olive-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-olive-700">Carregando confirmações...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl mb-4">❌ {error}</p>
          <button 
            onClick={fetchConfirmacoes}
            className="bg-olive-500 text-white px-4 py-2 rounded hover:bg-olive-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-olive-50 p-4">
      <Head>
        <title>Confirmações - Admin | Pedro & Geórgia</title>
      </Head>

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-olive-800 mb-2">
            <FaHeart className="inline mr-2 text-olive-500" />
            Confirmações do Casamento
          </h1>
          <p className="text-stone-600">Geórgia & Pedro - 06 de Junho de 2026</p>
        </header>

        {/* Estatísticas */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-olive-600">{stats.total}</div>
              <div className="text-sm text-stone-600">Total</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-green-600">{stats.confirmados}</div>
              <div className="text-sm text-stone-600">Confirmados</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-red-600">{stats.recusados}</div>
              <div className="text-sm text-stone-600">Não vão</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.talvez}</div>
              <div className="text-sm text-stone-600">Talvez</div>
            </div>
            <div className="bg-olive-50 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-olive-600">{stats.totalConvidados}</div>
              <div className="text-sm text-stone-600">Convidados</div>
            </div>
          </div>
        )}

        {/* Lista de Confirmações */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-olive-500 text-white">
            <h2 className="text-xl font-semibold">Confirmações Recebidas</h2>
          </div>
          
          {confirmacoes.length === 0 ? (
            <div className="p-8 text-center text-stone-500">
              Nenhuma confirmação recebida ainda.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Nome</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Convidados</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Data</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Mensagem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {confirmacoes.map((confirmacao) => (
                    <tr key={confirmacao._id} className="hover:bg-stone-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(confirmacao.attending)}
                          <span className="text-sm">{getStatusText(confirmacao.attending)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-stone-400 text-sm" />
                          <span className="font-medium">{confirmacao.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-stone-400 text-sm" />
                          <span className="text-sm">{confirmacao.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="bg-olive-100 text-olive-800 px-2 py-1 rounded-full text-sm">
                          {confirmacao.guests || 0}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-stone-400 text-sm" />
                          <span className="text-sm">
                            {new Date(confirmacao.createdAt).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 max-w-xs">
                        {confirmacao.message ? (
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-stone-600 truncate flex-1" title={confirmacao.message}>
                              {confirmacao.message}
                            </div>
                            <button
                              onClick={() => openMessageModal(
                                confirmacao.name, 
                                confirmacao.message,
                                new Date(confirmacao.createdAt).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              )}
                              className="text-olive-500 hover:text-olive-700 transition-colors p-1"
                              title="Ver mensagem completa"
                            >
                              <FaEye className="text-sm" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-stone-400 text-sm italic">Sem mensagem</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={fetchConfirmacoes}
            className="bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Atualizar Lista
          </button>
        </div>

        {/* Modal para mensagem completa */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={closeMessageModal}>
            <div 
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 bg-olive-500 text-white">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <FaExpandArrowsAlt />
                    Mensagem de {selectedMessage.name}
                  </h3>
                  <p className="text-olive-100 text-sm mt-1">
                    Enviada em {selectedMessage.date}
                  </p>
                </div>
                <button
                  onClick={closeMessageModal}
                  className="text-white hover:text-olive-200 transition-colors p-2"
                  title="Fechar"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <p className="text-stone-800 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-stone-50 border-t border-stone-200">
                <button
                  onClick={closeMessageModal}
                  className="w-full bg-olive-500 hover:bg-olive-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConfirmacoes;
