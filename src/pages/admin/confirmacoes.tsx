import { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  FaHeart, FaUser, FaEnvelope, FaCalendar, FaCheck, FaTimes, FaQuestion, 
  FaEye, FaExpandArrowsAlt, FaTrash, FaUsers, FaPercentage, FaComments,
  FaChartBar, FaSync, FaExclamationTriangle, FaCheckCircle
} from 'react-icons/fa';

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
  comMensagem: number;
  semMensagem: number;
  taxaConfirmacao: number;
  mediaConvidados: number;
}

const AdminConfirmacoes = () => {
  const [confirmacoes, setConfirmacoes] = useState<Confirmacao[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<{ name: string; message: string; date: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<{ id: string; name: string } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchConfirmacoes();
  }, []);

  const fetchConfirmacoes = async () => {
    try {
      setRefreshing(true);
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
      setRefreshing(false);
    }
  };

  const deleteConfirmacao = async (id: string) => {
    try {
      setDeletingId(id);
      const res = await fetch(`/api/confirmacoes?id=${id}`, {
        method: 'DELETE'
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Remover da lista local
        setConfirmacoes(prev => prev.filter(c => c._id !== id));
        // Recarregar estatísticas
        await fetchConfirmacoes();
        setShowDeleteModal(null);
      } else {
        alert('Erro ao deletar confirmação: ' + data.error);
      }
    } catch (err) {
      alert('Erro ao deletar confirmação');
      console.error(err);
    } finally {
      setDeletingId(null);
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

  const getStatusColor = (attending: string) => {
    switch (attending) {
      case 'yes': return 'bg-green-100 text-green-800 border-green-200';
      case 'no': return 'bg-red-100 text-red-800 border-red-200';
      case 'maybe': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const openMessageModal = (name: string, message: string, date: string) => {
    setSelectedMessage({ name, message, date });
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
  };

  const openDeleteModal = (id: string, name: string) => {
    setShowDeleteModal({ id, name });
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 to-olive-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-olive-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-olive-700 text-lg">Carregando confirmações...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 to-olive-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-red-500 text-2xl" />
          </div>
          <p className="text-red-600 text-lg mb-4">❌ {error}</p>
          <button 
            onClick={fetchConfirmacoes}
            className="bg-olive-500 text-white px-6 py-3 rounded-lg hover:bg-olive-600 transition-colors"
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

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-olive-800 mb-2">
            <FaHeart className="inline mr-3 text-olive-500" />
            Dashboard de Confirmações
          </h1>
          <p className="text-stone-600 text-lg">Geórgia & Pedro - 06 de Junho de 2026</p>
        </header>

        {/* Dashboard Principal */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total de Respostas */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Respostas</p>
                  <p className="text-3xl font-bold text-olive-600">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center">
                  <FaUsers className="text-olive-600 text-xl" />
                </div>
              </div>
            </div>

            {/* Taxa de Confirmação */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Confirmação</p>
                  <p className="text-3xl font-bold text-green-600">{stats.taxaConfirmacao}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaPercentage className="text-green-600 text-xl" />
                </div>
              </div>
            </div>

            {/* Total de Convidados */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Convidados Confirmados</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalConvidados}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            {/* Média de Convidados */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Média por Família</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.mediaConvidados}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaChartBar className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Estatísticas Detalhadas */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaCheck className="text-green-500" />
                Status das Respostas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Confirmados</span>
                  <span className="font-bold text-green-600">{stats.confirmados}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Não vão</span>
                  <span className="font-bold text-red-600">{stats.recusados}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Talvez</span>
                  <span className="font-bold text-yellow-600">{stats.talvez}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaComments className="text-blue-500" />
                Mensagens
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Com mensagem</span>
                  <span className="font-bold text-blue-600">{stats.comMensagem}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sem mensagem</span>
                  <span className="font-bold text-gray-600">{stats.semMensagem}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaUsers className="text-purple-500" />
                Convidados
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total confirmados</span>
                  <span className="font-bold text-purple-600">{stats.totalConvidados}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Média por família</span>
                  <span className="font-bold text-purple-600">{stats.mediaConvidados}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botão de Atualizar */}
        <div className="flex justify-center mb-6">
          <button
            onClick={fetchConfirmacoes}
            disabled={refreshing}
            className="bg-olive-500 hover:bg-olive-600 disabled:bg-olive-300 text-white px-8 py-3 rounded-xl transition-colors flex items-center gap-2 font-medium"
          >
            <FaSync className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Atualizando...' : 'Atualizar Lista'}
          </button>
        </div>

        {/* Lista de Confirmações */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-4 sm:p-6 bg-olive-500 text-white">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <FaHeart className="text-olive-200" />
              Confirmações Recebidas ({confirmacoes.length})
            </h2>
          </div>
          
          {confirmacoes.length === 0 ? (
            <div className="p-8 sm:p-12 text-center text-stone-500">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-gray-400 text-xl sm:text-2xl" />
              </div>
              <p className="text-base sm:text-lg">Nenhuma confirmação recebida ainda.</p>
              <p className="text-sm mt-2">As confirmações aparecerão aqui quando os convidados responderem.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Convidados</th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensagem</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {confirmacoes.map((confirmacao) => (
                    <tr key={confirmacao._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          {getStatusIcon(confirmacao.attending)}
                          <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${getStatusColor(confirmacao.attending)}`}>
                            {getStatusText(confirmacao.attending)}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <FaUser className="text-gray-400 text-xs sm:text-sm" />
                          <span className="font-medium text-gray-900 text-sm sm:text-base">{confirmacao.name}</span>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <FaEnvelope className="text-gray-400 text-xs sm:text-sm" />
                          <span className="text-xs sm:text-sm text-gray-600 truncate max-w-[150px]">{confirmacao.email}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                        <span className="bg-olive-100 text-olive-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                          {confirmacao.guests || 0}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <FaCalendar className="text-gray-400 text-xs sm:text-sm" />
                          <span className="text-xs sm:text-sm text-gray-600">
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
                      <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 max-w-xs">
                        {confirmacao.message ? (
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="text-xs sm:text-sm text-gray-600 truncate flex-1" title={confirmacao.message}>
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
                              className="text-olive-500 hover:text-olive-700 transition-colors p-0.5 sm:p-1"
                              title="Ver mensagem completa"
                            >
                              <FaEye className="text-xs sm:text-sm" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs sm:text-sm italic">Sem mensagem</span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() => openDeleteModal(confirmacao._id, confirmacao.name)}
                            disabled={deletingId === confirmacao._id}
                            className="text-red-500 hover:text-red-700 transition-colors p-0.5 sm:p-1 disabled:opacity-50"
                            title="Deletar confirmação"
                          >
                            <FaTrash className="text-xs sm:text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal para mensagem completa */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={closeMessageModal}>
            <div 
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 sm:p-6 bg-olive-500 text-white">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <FaExpandArrowsAlt />
                    Mensagem de {selectedMessage.name}
                  </h3>
                  <p className="text-olive-100 text-xs sm:text-sm mt-1">
                    Enviada em {selectedMessage.date}
                  </p>
                </div>
                <button
                  onClick={closeMessageModal}
                  className="text-white hover:text-olive-200 transition-colors p-1 sm:p-2"
                  title="Fechar"
                >
                  <FaTimes className="text-lg sm:text-xl" />
                </button>
              </div>
              
              <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
              
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={closeMessageModal}
                  className="w-full bg-olive-500 hover:bg-olive-600 text-white py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmação de exclusão */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={closeDeleteModal}>
            <div 
              className="bg-white rounded-2xl shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 sm:p-6 bg-red-500 text-white">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <FaTrash />
                    Confirmar Exclusão
                  </h3>
                </div>
                <button
                  onClick={closeDeleteModal}
                  className="text-white hover:text-red-200 transition-colors p-1 sm:p-2"
                  title="Cancelar"
                >
                  <FaTimes className="text-lg sm:text-xl" />
                </button>
              </div>
              
              <div className="p-4 sm:p-6">
                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  Tem certeza que deseja deletar a confirmação de <strong>{showDeleteModal.name}</strong>?
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                  Esta ação não pode ser desfeita.
                </p>
              </div>
              
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex gap-2 sm:gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => deleteConfirmacao(showDeleteModal.id)}
                  disabled={deletingId === showDeleteModal.id}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base"
                >
                  {deletingId === showDeleteModal.id ? 'Deletando...' : 'Deletar'}
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
