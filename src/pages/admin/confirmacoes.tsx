import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaTrash, FaEye, FaEyeSlash, FaDownload, FaPrint, FaFilter, FaSearch, FaHeart, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaQuestion, FaExclamationTriangle } from 'react-icons/fa';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useCoupleData } from '../../hooks/useCoupleData';

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
  pendentes: number;
  naoConfirmados: number;
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
  const [isDemo, setIsDemo] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState({});
  const colors = useThemeColors();
  const { coupleData } = useCoupleData();

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
        setIsDemo(data.demo || false);
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
      default: return <FaQuestion className="text-yellow-500" />;
    }
  };

  const getStatusText = (attending: string) => {
    switch (attending) {
      case 'yes': return 'Confirmado';
      case 'no': return 'Não vai';
      case 'maybe': return 'Talvez';
      default: return 'Pendente';
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

  const toggleDetails = (id: string) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDelete = (id: string) => {
    openDeleteModal(id, 'Confirmação');
  };

  const filteredConfirmacoes = confirmacoes.filter(confirmacao => {
    const matchesSearch = confirmacao.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         confirmacao.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'confirmado' && confirmacao.attending === 'yes') ||
                         (filter === 'pendente' && confirmacao.attending === 'maybe') ||
                         (filter === 'nao_confirmado' && confirmacao.attending === 'no');
    
    return matchesSearch && matchesFilter;
  });

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
    <div className={`min-h-screen ${colors.gradientBackground}`}>
      <Head>
        <title>Confirmações - {coupleData?.names || 'Carregando...'}</title>
        <meta name="description" content="Painel administrativo para gerenciar confirmações de presença" />
      </Head>

      {/* Header */}
      <header className={`${colors.bgPrimary} text-cream-100 py-6 shadow-lg`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${colors.gradientPrimary} rounded-full flex items-center justify-center`}>
                <FaHeart className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold">Confirmações</h1>
                <p className="text-cream-200">{coupleData?.names || 'Carregando...'} - {coupleData?.formattedDate || 'Carregando...'}</p>
              </div>
            </div>
            
            {isDemo && (
              <div className={`px-4 py-2 ${colors.bgSecondary} ${colors.textPrimary} rounded-lg text-sm font-medium`}>
                Modo Demonstração - Dados Fictícios
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'Total de Convidados', 
              value: stats?.total || 0, 
              icon: FaUsers, 
              color: 'from-blue-500 to-blue-600' 
            },
            { 
              title: 'Confirmados', 
              value: stats?.confirmados || 0, 
              icon: FaCheck, 
              color: 'from-green-500 to-green-600' 
            },
            { 
              title: 'Pendentes', 
              value: stats?.pendentes || 0, 
              icon: FaCalendarAlt, 
              color: 'from-yellow-500 to-yellow-600' 
            },
            { 
              title: 'Não Confirmados', 
              value: stats?.naoConfirmados || 0, 
              icon: FaTimes, 
              color: 'from-red-500 to-red-600' 
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              className={`${colors.bgCream} rounded-2xl p-6 shadow-lg border ${colors.borderPrimary}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${colors.textSecondary}`}>{stat.title}</p>
                  <p className={`text-3xl font-bold ${colors.textPrimary}`}>{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                  <stat.icon className="text-white text-xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className={`${colors.bgCream} rounded-2xl p-6 shadow-lg border ${colors.borderPrimary} mb-8`}>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.textSecondary}`} />
                <input
                  type="text"
                  placeholder="Buscar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${colors.borderPrimary} rounded-lg focus:ring-2 focus:ring-${colors.textSecondary.replace('text-', '')} focus:border-${colors.textSecondary.replace('text-', '')} ${colors.textPrimary} bg-white`}
                />
              </div>
            </div>
            
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`px-4 py-3 border ${colors.borderPrimary} rounded-lg focus:ring-2 focus:ring-${colors.textSecondary.replace('text-', '')} focus:border-${colors.textSecondary.replace('text-', '')} ${colors.textPrimary} bg-white`}
            >
              <option value="all">Todos os Status</option>
              <option value="confirmado">Confirmados</option>
              <option value="pendente">Pendentes</option>
              <option value="nao_confirmado">Não Confirmados</option>
            </select>
          </div>
        </div>

        {/* Confirmações List */}
        <div className={`${colors.bgCream} rounded-2xl shadow-lg border ${colors.borderPrimary} overflow-hidden`}>
          <div className={`${colors.bgSecondary} px-6 py-4 border-b ${colors.borderPrimary}`}>
            <h2 className={`text-xl font-serif font-bold ${colors.textPrimary}`}>
              Lista de Confirmações
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${colors.bgSecondary} border-b ${colors.borderPrimary}`}>
                <tr>
                  <th className={`px-6 py-4 text-left ${colors.textPrimary} font-semibold`}>Nome</th>
                  <th className={`px-6 py-4 text-left ${colors.textPrimary} font-semibold`}>Email</th>
                  <th className={`px-6 py-4 text-left ${colors.textPrimary} font-semibold`}>Status</th>
                  <th className={`px-6 py-4 text-left ${colors.textPrimary} font-semibold`}>Data</th>
                  <th className={`px-6 py-4 text-center ${colors.textPrimary} font-semibold`}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredConfirmacoes.map((confirmacao, index) => (
                  <motion.tr
                    key={confirmacao._id}
                    className={`border-b ${colors.borderPrimary} hover:${colors.bgSecondary} transition-colors`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className={`px-6 py-4 ${colors.textPrimary} font-medium`}>
                      {confirmacao.name}
                    </td>
                    <td className={`px-6 py-4 ${colors.textSecondary}`}>
                      {confirmacao.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        confirmacao.attending === 'yes' 
                          ? 'bg-green-100 text-green-800' 
                          : confirmacao.attending === 'maybe'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {confirmacao.attending === 'yes' ? 'Confirmado' :
                         confirmacao.attending === 'maybe' ? 'Pendente' : 'Não Confirmado'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 ${colors.textSecondary} text-sm`}>
                      {new Date(confirmacao.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          onClick={() => toggleDetails(confirmacao._id)}
                          className={`p-2 rounded-lg ${colors.bgSecondary} ${colors.textPrimary} hover:${colors.bgPrimary} hover:text-cream-100 transition-colors`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {showDetails[confirmacao._id] ? <FaEyeSlash /> : <FaEye />}
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleDelete(confirmacao._id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        <AnimatePresence>
          {Object.keys(showDetails).map(id => {
            const confirmacao = confirmacoes.find(c => c._id === id);
            if (!confirmacao || !showDetails[id]) return null;
            
            return (
              <motion.div
                key={id}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => toggleDetails(id)}
              >
                <motion.div
                  className={`${colors.bgCream} rounded-2xl p-6 max-w-md w-full shadow-2xl`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className={`text-xl font-serif font-bold ${colors.textPrimary} mb-4`}>
                    Detalhes da Confirmação
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm font-medium ${colors.textSecondary}`}>Nome:</label>
                      <p className={`${colors.textPrimary} font-medium`}>{confirmacao.name}</p>
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium ${colors.textSecondary}`}>Email:</label>
                      <p className={`${colors.textPrimary}`}>{confirmacao.email}</p>
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium ${colors.textSecondary}`}>Mensagem:</label>
                      <p className={`${colors.textPrimary} text-sm`}>{confirmacao.message || 'Nenhuma mensagem'}</p>
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium ${colors.textSecondary}`}>Status:</label>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        confirmacao.attending === 'yes' 
                          ? 'bg-green-100 text-green-800' 
                          : confirmacao.attending === 'no'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {confirmacao.attending === 'yes' ? 'Confirmado' :
                         confirmacao.attending === 'no' ? 'Não Confirmado' : 'Pendente'}
                      </span>
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium ${colors.textSecondary}`}>Data:</label>
                      <p className={`${colors.textPrimary} text-sm`}>
                        {new Date(confirmacao.createdAt).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <motion.button
                      onClick={() => toggleDetails(id)}
                      className={`px-4 py-2 ${colors.bgPrimary} text-cream-100 rounded-lg hover:${colors.hoverPrimary} transition-colors`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Fechar
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminConfirmacoes;
