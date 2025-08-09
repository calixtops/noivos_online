import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OptimizedImage from '../components/OptimizedImage';
import { FaSearch, FaFilter, FaHeart, FaShoppingCart, FaTimes } from 'react-icons/fa';
import gifts from '../../data/gifts.json';

const pixCode = '62118595387';

// Hook customizado para filtros
const useGiftFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedGifts = useMemo(() => {
    let filtered = gifts.filter(gift => 
      gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gift.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (priceFilter !== 'all') {
      filtered = filtered.filter(gift => {
        switch (priceFilter) {
          case 'low': return gift.price <= 150;
          case 'medium': return gift.price > 150 && gift.price <= 300;
          case 'high': return gift.price > 300;
          default: return true;
        }
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    return filtered;
  }, [searchTerm, priceFilter, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    priceFilter,
    setPriceFilter,
    sortBy,
    setSortBy,
    filteredAndSortedGifts
  };
};

// Hook customizado para paginação
const usePagination = (items, itemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    setCurrentPage
  };
};

const Presentes = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState({ show: false, message: '' });
  
  // Função para copiar com feedback
  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopyFeedback({ show: true, message: '✅ Chave PIX copiada!' });
      setTimeout(() => {
        setCopyFeedback({ show: false, message: '' });
      }, 3000);
    } catch (error) {
      setCopyFeedback({ show: true, message: '❌ Erro ao copiar. Tente novamente.' });
      setTimeout(() => {
        setCopyFeedback({ show: false, message: '' });
      }, 3000);
    }
  };
  
  const { searchTerm, setSearchTerm, priceFilter, setPriceFilter, sortBy, setSortBy, filteredAndSortedGifts } = useGiftFilters();
  const { currentPage, totalPages, paginatedItems, handlePageChange, setCurrentPage } = usePagination(filteredAndSortedGifts);

  // Garantir que o componente só renderize no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset página quando filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceFilter, sortBy, setCurrentPage]);

  const handlePresentClick = (gift) => {
    setSelectedGift(gift);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGift(null);
  };

  // Renderizar loading enquanto não estiver no cliente
  if (!isClient) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream-50 via-cream-25 to-olive-50">
        <Head>
          <title>Lista de Presentes - Pedro & Geórgia</title>
        </Head>
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream-50 via-cream-25 to-olive-50">
      <Head>
        <title>Lista de Presentes - Pedro & Geórgia</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-12 sm:mb-16">
          <div className="mb-6">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-olive-500 to-sage-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-white text-2xl sm:text-3xl animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-olive-700 mb-4 font-bold">
              Nossa Lista de Presentes
            </h1>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-olive-400 to-sage-600 rounded mx-auto mb-6"></div>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            Escolha um presente especial para nosso novo lar! Cada item foi pensado com carinho para nossa jornada juntos.
          </p>
        </div>

        {/* Seção de filtros e busca */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Barra de busca */}
            <div className="relative group">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm group-focus-within:text-olive-500 transition-colors" />
              <input
                type="text"
                placeholder="Buscar presentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-olive-300 focus:border-olive-300 bg-gray-50 hover:bg-white transition-all duration-200"
              />
            </div>

            {/* Filtro por preço */}
            <div className="relative group">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm group-focus-within:text-olive-500 transition-colors" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-olive-300 focus:border-olive-300 appearance-none bg-gray-50 hover:bg-white transition-all duration-200"
              >
                <option value="all">Todas as faixas</option>
                <option value="low">Até R$ 150</option>
                <option value="medium">R$ 150 - R$ 300</option>
                <option value="high">Acima de R$ 300</option>
              </select>
            </div>

            {/* Ordenação */}
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-olive-300 focus:border-olive-300 appearance-none bg-gray-50 hover:bg-white transition-all duration-200"
              >
                <option value="name">Ordenar por nome</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
              </select>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base text-gray-600">
              <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                <span className="text-lg">📦</span>
                <span className="font-medium">{filteredAndSortedGifts.length} {filteredAndSortedGifts.length === 1 ? 'presente' : 'presentes'}</span>
              </span>
              <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                <span className="text-lg">💰</span>
                <span className="font-medium">R$ {Math.min(...gifts.map(g => g.price))} - R$ {Math.max(...gifts.map(g => g.price))}</span>
              </span>
              <span className="hidden sm:flex items-center gap-2 bg-olive-50 px-3 py-1.5 rounded-full text-olive-700">
                <span className="text-lg">🌿</span>
                <span className="font-medium">Feito com amor para Pedro & Geórgia</span>
              </span>
            </div>
          </div>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {paginatedItems.map((gift, index) => (
            <div 
              key={gift.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 relative"
            >
              {/* Badge de destaque para itens caros */}
              {gift.price > 400 && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold z-10 shadow-lg backdrop-blur-sm">
                  ⭐ Premium
                </div>
              )}
              
              {/* Badge para itens baratos */}
              {gift.price <= 150 && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold z-10 shadow-lg backdrop-blur-sm">
                  💝 Acessível
                </div>
              )}

              {/* Container da imagem com altura fixa e centralização */}
              <div className="relative h-56 sm:h-60 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-olive-50 group-hover:to-cream transition-all duration-300">
                <OptimizedImage
                  src={gift.image} 
                  alt={gift.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={index < 6}
                  loading={index >= 6 ? "lazy" : "eager"}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
                />
                {/* Overlay sutil no hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-olive-700 transition-colors line-clamp-2 leading-tight">
                    {gift.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed">
                  {gift.description}
                </p>
                
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl sm:text-3xl font-bold text-olive-700">
                      R$ {gift.price}
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                      {gift.price <= 150 ? 'Econômico' : gift.price <= 300 ? 'Moderado' : 'Premium'}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePresentClick(gift)}
                    className="w-full bg-gradient-to-r from-olive-600 to-sage-700 hover:from-olive-700 hover:to-sage-800 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base sm:text-lg border-2 border-transparent hover:border-olive-300 group/btn"
                  >
                    <FaShoppingCart className="text-sm sm:text-base group-hover/btn:scale-110 transition-transform duration-200" />
                    Presentear
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginação */}
        {filteredAndSortedGifts.length > 12 && (
          <div className="flex justify-center items-center mt-12 gap-3">
            <button
              onClick={() => {
                const newPage = Math.max(currentPage - 1, 1);
                if (newPage !== currentPage) handlePageChange(newPage);
              }}
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl font-medium"
            >
              ← Anterior
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    currentPage === page
                      ? 'bg-olive-600 text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => {
                const newPage = Math.min(currentPage + 1, totalPages);
                if (newPage !== currentPage) handlePageChange(newPage);
              }}
              disabled={currentPage === totalPages}
              className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl font-medium"
            >
              Próxima →
            </button>
          </div>
        )}

        {/* Mensagem quando não há resultados */}
        {filteredAndSortedGifts.length === 0 && (
          <div 
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl">🔍</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Nenhum presente encontrado</h3>
            <p className="text-gray-500 text-lg mb-6">Tente ajustar seus filtros ou termo de busca</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-olive-600 hover:bg-olive-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Limpar busca
              </button>
              <button
                onClick={() => setPriceFilter('all')}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
              >
                Ver todos
              </button>
            </div>
          </div>
        )}

        {/* Modal de Presente */}
        {showModal && selectedGift && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-lg w-full text-center relative shadow-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 sm:p-2 rounded-full hover:bg-gray-100"
                title="Fechar"
              >
                <FaTimes className="text-lg sm:text-xl" />
              </button>
              
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-olive-500 to-sage-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
                  <FaHeart className="text-white text-xl sm:text-2xl lg:text-3xl animate-pulse" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-olive-700 mb-2 sm:mb-3 lg:mb-4 font-bold">Obrigado por presentear!</h2>
                <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-olive-400 to-sage-600 rounded mx-auto"></div>
              </div>

              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8 border border-gray-200">
                <p className="text-gray-700 mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base lg:text-lg font-medium">
                  Você escolheu:
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 lg:gap-4 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-gray-200 shadow-sm">
                  <img
                    src={selectedGift.image} 
                    alt={selectedGift.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover rounded-lg sm:rounded-xl flex-shrink-0"
                  />
                  <div className="text-center sm:text-left flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg line-clamp-2 mb-1 sm:mb-2">{selectedGift.name}</h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-olive-700">R$ {selectedGift.price}</p>
                  </div>
                </div>
              </div>

              <div className="mb-3 sm:mb-4 lg:mb-6">
                <p className="text-stone-700 mb-2 sm:mb-3 lg:mb-4 text-xs sm:text-sm lg:text-base">
                  Para concluir, envie o valor via PIX usando o QR Code ou chave abaixo:
                </p>
                <div className="bg-white border-2 border-olive-200 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 inline-block mb-2 sm:mb-3 lg:mb-4 shadow-sm">
                  <img
                    src="/images/auxiliares/qr_code_casamento.jpg"
                    alt="QR Code PIX"
                    className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] object-contain"
                  />
                </div>
                <div className="bg-cream-50 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border-2 border-dashed border-olive-300">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 lg:gap-3">
                    <span className="font-mono text-olive-700 font-bold flex-1 text-xs sm:text-sm break-all">{pixCode}</span>
                    <button
                      className="bg-olive-600 hover:bg-olive-700 text-cream px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto whitespace-nowrap"
                      onClick={handleCopyPix}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-olive-50 border border-olive-200 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4">
                <p className="text-olive-800 text-xs sm:text-sm leading-relaxed">
                  🌿 Após o envio, sinta-se à vontade para nos avisar! Muito obrigado pelo carinho e por fazer parte do nosso sonho.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Seção PIX geral reformulada */}
        <div 
          className="mt-16 sm:mt-20 bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-5xl mx-auto border border-gray-100"
        >
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-gradient-to-r from-olive-500 to-sage-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="text-white text-3xl animate-pulse" />
            </div>
            <h2 className="text-4xl font-serif text-olive-700 mb-4 font-bold">Contribuição Livre</h2>
            <div className="w-40 h-1 bg-gradient-to-r from-olive-400 to-sage-600 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
              Se preferir fazer uma contribuição livre ou não encontrou um presente específico, 
              ficaremos imensamente gratos por qualquer valor que possa nos ajudar a começar nossa nova vida juntos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-center order-2 lg:order-1">
              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg inline-block border border-gray-200">
                <img
                  src="/images/auxiliares/qr_code_casamento.jpg"
                  alt="QR Code PIX"
                  className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] object-contain"
                />
              </div>
              <p className="text-gray-500 mt-4 text-sm">Escaneie o QR Code com seu app de banco</p>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                  🔑 Chave PIX
                </h3>
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="font-mono text-olive-700 font-bold break-all text-base flex-1">{pixCode}</span>
                    <button
                      className="bg-olive-600 hover:bg-olive-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl whitespace-nowrap text-base"
                      onClick={handleCopyPix}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="font-bold text-blue-900 mb-3 text-lg">💡 Como funciona:</h4>
                <ul className="text-blue-800 text-base space-y-2">
                  <li className="flex items-center gap-2">• Abra seu app de banco</li>
                  <li className="flex items-center gap-2">• Vá em PIX</li>
                  <li className="flex items-center gap-2">• Escaneie o QR Code ou use a chave</li>
                  <li className="flex items-center gap-2">• Digite o valor desejado</li>
                  <li className="flex items-center gap-2">• Confirme o pagamento</li>
                </ul>
              </div>

              <div className="bg-olive-50 border border-olive-200 rounded-2xl p-6 text-center">
                <p className="text-olive-800 text-lg font-medium">
                  🌿 <strong>Cada contribuição é um gesto de carinho que nos aquece o coração!</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast de feedback para cópia */}
      {copyFeedback.show && (
        <div className="fixed bottom-6 right-6 z-50 bg-white shadow-2xl rounded-xl p-4 border border-gray-200 animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-800">{copyFeedback.message}</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Presentes;