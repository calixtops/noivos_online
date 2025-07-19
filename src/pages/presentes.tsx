import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
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

  const handlePresentClick = (gift) => {
    setSelectedGift(gift);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGift(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
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
          <h1 className="text-3xl sm:text-4xl font-serif text-rose-700 mb-4">
            Nossa Lista de Presentes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha um presente especial para nosso novo lar! Cada item foi pensado com carinho para nossa jornada juntos.
          </p>
        </motion.div>

        {/* Seção de filtros e busca */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Barra de busca */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar presentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por preço */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent appearance-none bg-white"
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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="name">Ordenar por nome</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
              </select>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <span>📦 {filteredAndSortedGifts.length} {filteredAndSortedGifts.length === 1 ? 'presente' : 'presentes'}</span>
              <span>💰 Preços de R$ {Math.min(...gifts.map(g => g.price))} a R$ {Math.max(...gifts.map(g => g.price))}</span>
              <span>❤️ Feito com amor para Pedro & Geórgia</span>
            </div>
          </div>
        </motion.div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedGifts.map((gift, index) => (
            <motion.div 
              key={gift.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Badge de destaque para itens caros */}
              {gift.price > 400 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                  ⭐ Premium
                </div>
              )}
              
              {/* Badge para itens baratos */}
              {gift.price <= 150 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                  💝 Acessível
                </div>
              )}

              <div className="relative h-48 sm:h-56 overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-rose-50 group-hover:to-rose-100 transition-all">
                <img 
                  src={gift.image} 
                  alt={gift.name} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay com ícone de coração */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <FaHeart className="text-rose-500 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-700 transition-colors line-clamp-2">
                    {gift.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {gift.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-rose-700">
                      R$ {gift.price}
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {gift.price <= 150 ? 'Econômico' : gift.price <= 300 ? 'Moderado' : 'Premium'}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePresentClick(gift)}
                    className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FaShoppingCart className="text-sm" />
                    Presentear
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredAndSortedGifts.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum presente encontrado</h3>
            <p className="text-gray-500">Tente ajustar seus filtros ou termo de busca</p>
          </motion.div>
        )}

        {/* Modal de agradecimento melhorado */}
        {showModal && selectedGift && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-8 max-w-lg w-full text-center relative shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
                onClick={closeModal}
              >
                ✕
              </button>
              
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-serif text-rose-700 mb-2">Obrigado por presentear!</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-rose-600 rounded mx-auto"></div>
              </div>

              <div className="bg-rose-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700 mb-2">
                  Você escolheu:
                </p>
                <div className="flex items-center gap-4 bg-white rounded-lg p-3">
                  <img 
                    src={selectedGift.image} 
                    alt={selectedGift.name}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900">{selectedGift.name}</h3>
                    <p className="text-2xl font-bold text-rose-700">R$ {selectedGift.price}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Para concluir, envie o valor via PIX usando o QR Code ou chave abaixo:
                </p>
                <div className="bg-white border-2 border-gray-100 rounded-xl p-4 inline-block mb-4">
                  <QRCodeSVG value={pixCode} size={140} level="H" includeMargin={true} />
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-rose-700 font-bold flex-1">{pixCode}</span>
                    <button
                      className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                      onClick={() => navigator.clipboard.writeText(pixCode)}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 text-sm">
                  💌 Após o envio, sinta-se à vontade para nos avisar! Muito obrigado pelo carinho e por fazer parte do nosso sonho.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Seção PIX geral reformulada */}
        <motion.div 
          className="mt-16 bg-gradient-to-br from-rose-50 via-white to-rose-50 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-rose-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-serif text-rose-700 mb-3">Contribuição Livre</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-rose-400 to-rose-600 rounded mx-auto mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Se preferir fazer uma contribuição livre ou não encontrou um presente específico, 
              ficaremos imensamente gratos por qualquer valor que possa nos ajudar a começar nossa nova vida juntos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg inline-block border-2 border-rose-100">
                <QRCodeSVG 
                  value={pixCode} 
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-sm text-gray-600 mt-4">Escaneie o QR Code com seu app de banco</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-rose-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  🔑 Chave PIX
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-rose-700 font-bold break-all">{pixCode}</span>
                    <button
                      className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                      onClick={() => navigator.clipboard.writeText(pixCode)}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Como funciona:</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Abra seu app de banco</li>
                  <li>• Vá em PIX</li>
                  <li>• Escaneie o QR Code ou use a chave</li>
                  <li>• Digite o valor desejado</li>
                  <li>• Confirme o pagamento</li>
                </ul>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
                <p className="text-rose-800 text-sm">
                  ❤️ <strong>Cada contribuição é um abraço virtual que nos aquece o coração!</strong>
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