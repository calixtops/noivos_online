import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OptimizedImage from '../components/OptimizedImage';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { FaSearch, FaFilter, FaHeart, FaShoppingCart } from 'react-icons/fa';
import gifts from '../../data/gifts.json';

const pixCode = '62118595387';

const Presentes = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Mostrar 12 itens por página para melhor performance

  // Filtros e busca
  const filteredAndSortedGifts = useMemo(() => {
    let filtered = gifts.filter(gift => 
      gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gift.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtro por preço
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

    // Ordenação
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

  // Paginação
  const totalPages = Math.ceil(filteredAndSortedGifts.length / itemsPerPage);
  const paginatedGifts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedGifts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedGifts, currentPage, itemsPerPage]);

  // Reset página quando filtros mudam
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceFilter, sortBy]);

  // Função simples para mudar página
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll simples para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePresentClick = (gift) => {
    setSelectedGift(gift);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGift(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream-50 via-cream-25 to-olive-50">
      <Head>
        <title>Lista de Presentes - Pedro & Geórgia</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-serif text-olive-700 mb-4">
            Nossa Lista de Presentes
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Escolha um presente especial para nosso novo lar! Cada item foi pensado com carinho para nossa jornada juntos.
          </p>
        </motion.div>

        {/* Seção de filtros e busca */}
        <motion.div 
          className="bg-cream rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-olive-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Barra de busca */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 text-sm" />
              <input
                type="text"
                placeholder="Buscar presentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-stone-200 rounded-lg focus:ring-2 focus:ring-olive-300 focus:border-olive-300 bg-sage-50"
              />
            </div>

            {/* Filtro por preço */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 text-sm" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-stone-200 rounded-lg focus:ring-2 focus:ring-olive-300 focus:border-olive-300 appearance-none bg-sage-50"
              >
                <option value="all">Todas as faixas</option>
                <option value="low">Até R$ 150</option>
                <option value="medium">R$ 150 - R$ 300</option>
                <option value="high">Acima de R$ 300</option>
              </select>
            </div>

            {/* Ordenação */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-stone-200 rounded-lg focus:ring-2 focus:ring-olive-300 focus:border-olive-300 appearance-none bg-sage-50"
              >
                <option value="name">Ordenar por nome</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
              </select>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-stone-200">
            <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-stone-600">
              <span className="flex items-center gap-1">📦 {filteredAndSortedGifts.length} {filteredAndSortedGifts.length === 1 ? 'presente' : 'presentes'}</span>
              <span className="flex items-center gap-1">💰 R$ {Math.min(...gifts.map(g => g.price))} - R$ {Math.max(...gifts.map(g => g.price))}</span>
              <span className="hidden sm:flex items-center gap-1">🌿 Feito com amor para Pedro & Geórgia</span>
            </div>
          </div>
        </motion.div>

        {/* Grid de produtos */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {paginatedGifts.map((gift, index) => (
            <motion.div 
              key={gift.id}
              className="bg-cream rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col group border border-olive-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              whileHover={{ y: -2 }}
            >
              {/* Badge de destaque para itens caros */}
              {gift.price > 400 && (
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-olive-500 to-sage-600 text-cream px-2 sm:px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                  ⭐ Premium
                </div>
              )}
              
              {/* Badge para itens baratos */}
              {gift.price <= 150 && (
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-sage-400 to-sage-500 text-cream px-2 sm:px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                  💝 Acessível
                </div>
              )}

              {/* Container da imagem com altura fixa e centralização */}
              <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-gradient-to-br from-sage-50 to-cream group-hover:from-olive-50 group-hover:to-cream transition-all">
                <OptimizedImage
                  src={gift.image} 
                  alt={gift.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  priority={index < 6} // Prioridade para os primeiros 6 itens
                  loading={index >= 6 ? "lazy" : "eager"} // Lazy loading após os primeiros 6
                  quality={80} // Qualidade um pouco melhor para imagens
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-stone-900 group-hover:text-olive-700 transition-colors line-clamp-2 leading-snug">
                    {gift.name}
                  </h3>
                </div>
                
                <p className="text-stone-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                  {gift.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="text-xl sm:text-2xl font-bold text-olive-700">
                      R$ {gift.price}
                    </div>
                    <div className="text-xs text-stone-500 bg-sage-100 px-2 py-1 rounded-full">
                      {gift.price <= 150 ? 'Econômico' : gift.price <= 300 ? 'Moderado' : 'Premium'}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePresentClick(gift)}
                    className="w-full bg-gradient-to-r from-olive-600 to-sage-700 hover:from-olive-700 hover:to-sage-800 text-cream py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base border-2 border-transparent hover:border-olive-300"
                  >
                    <FaShoppingCart className="text-xs sm:text-sm" />
                    Presentear
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Paginação */}
        {filteredAndSortedGifts.length > itemsPerPage && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => {
                const newPage = Math.max(currentPage - 1, 1);
                if (newPage !== currentPage) handlePageChange(newPage);
              }}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-olive-500 text-white'
                      : 'bg-stone-200 hover:bg-stone-300'
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
              className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Próxima
            </button>
          </div>
        )}

        {/* Mensagem quando não há resultados */}
        {filteredAndSortedGifts.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-stone-700 mb-2">Nenhum presente encontrado</h3>
            <p className="text-stone-500">Tente ajustar seus filtros ou termo de busca</p>
          </motion.div>
        )}

        {/* Modal de agradecimento melhorado */}
        {showModal && selectedGift && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center relative shadow-2xl max-h-[90vh] overflow-y-auto border-2 border-olive-200"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-stone-100 hover:bg-stone-200 rounded-full flex items-center justify-center text-stone-600 hover:text-stone-800 transition-all duration-200 shadow-md hover:shadow-lg z-10"
                onClick={closeModal}
                title="Fechar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="mb-4 sm:mb-6">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-olive-500 to-sage-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <FaHeart className="text-cream text-lg sm:text-2xl animate-heartbeat" />
                </div>
                <h2 className="text-xl sm:text-2xl font-serif text-olive-700 mb-2">Obrigado por presentear!</h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-olive-400 to-sage-600 rounded mx-auto"></div>
              </div>

              <div className="bg-cream-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-olive-200">
                <p className="text-stone-700 mb-2 text-sm sm:text-base">
                  Você escolheu:
                </p>
                <div className="flex items-center gap-3 sm:gap-4 bg-white rounded-lg p-2 sm:p-3 border border-olive-200 shadow-sm">
                  <OptimizedImage
                    src={selectedGift.image} 
                    alt={selectedGift.name}
                    className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    priority={true}
                    quality={85}
                  />
                  <div className="text-left flex-1 min-w-0">
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base line-clamp-2">{selectedGift.name}</h3>
                    <p className="text-lg sm:text-2xl font-bold text-olive-700">R$ {selectedGift.price}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <p className="text-stone-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  Para concluir, envie o valor via PIX usando o QR Code ou chave abaixo:
                </p>
                <div className="bg-white border-2 border-olive-200 rounded-xl p-3 sm:p-4 inline-block mb-3 sm:mb-4 shadow-sm">
                  <QRCodeSVG value={pixCode} size={120} level="H" includeMargin={true} />
                </div>
                <div className="bg-cream-50 p-3 sm:p-4 rounded-xl border-2 border-dashed border-olive-300">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                    <span className="font-mono text-olive-700 font-bold flex-1 text-xs sm:text-sm break-all">{pixCode}</span>
                    <button
                      className="bg-olive-600 hover:bg-olive-700 text-cream px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-sm w-full sm:w-auto whitespace-nowrap"
                      onClick={() => navigator.clipboard.writeText(pixCode)}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-olive-50 border border-olive-200 rounded-xl p-3 sm:p-4">
                <p className="text-olive-800 text-xs sm:text-sm leading-relaxed">
                  🌿 Após o envio, sinta-se à vontade para nos avisar! Muito obrigado pelo carinho e por fazer parte do nosso sonho.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Seção PIX geral reformulada */}
        <motion.div 
          className="mt-12 sm:mt-16 bg-gradient-to-br from-cream-50 via-white to-olive-50 rounded-2xl shadow-xl p-6 sm:p-8 max-w-4xl mx-auto border border-olive-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-olive-500 to-olive-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaHeart className="text-white text-2xl sm:text-3xl animate-pulse-love" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-olive-700 mb-2 sm:mb-3">Contribuição Livre</h2>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-olive-400 to-olive-600 rounded mx-auto mb-3 sm:mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4">
              Se preferir fazer uma contribuição livre ou não encontrou um presente específico, 
              ficaremos imensamente gratos por qualquer valor que possa nos ajudar a começar nossa nova vida juntos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="text-center order-2 md:order-1">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg inline-block border-2 border-olive-100">
                <QRCodeSVG 
                  value={pixCode} 
                  size={160}
                  level="H"
                  includeMargin={true}
                  className="sm:w-[200px] sm:h-[200px]"
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">Escaneie o QR Code com seu app de banco</p>
            </div>

            <div className="space-y-4 sm:space-y-6 order-1 md:order-2">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-olive-100">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  🔑 Chave PIX
                </h3>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-2 border-dashed border-gray-200">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                    <span className="font-mono text-olive-700 font-bold break-all text-sm sm:text-base flex-1">{pixCode}</span>
                    <button
                      className="bg-olive-600 hover:bg-olive-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl whitespace-nowrap text-sm w-full sm:w-auto"
                      onClick={() => navigator.clipboard.writeText(pixCode)}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">💡 Como funciona:</h4>
                <ul className="text-blue-800 text-xs sm:text-sm space-y-1">
                  <li>• Abra seu app de banco</li>
                  <li>• Vá em PIX</li>
                  <li>• Escaneie o QR Code ou use a chave</li>
                  <li>• Digite o valor desejado</li>
                  <li>• Confirme o pagamento</li>
                </ul>
              </div>

              <div className="bg-cream-50 border border-olive-200 rounded-xl p-3 sm:p-4 text-center">
                <p className="text-olive-800 text-xs sm:text-sm">
                  🌿 <strong>Cada contribuição é um gesto de carinho que nos aquece o coração!</strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Presentes;