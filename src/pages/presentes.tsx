import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import gifts from '../../data/gifts.json';

const pixCode = '85996564028';

const Presentes = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);

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
        <motion.h1 
          className="text-3xl sm:text-4xl font-serif text-center text-rose-700 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Nossa Lista de Presentes
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gifts.map((gift, index) => (
            <motion.div 
              key={gift.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="h-48 sm:h-56 overflow-hidden flex items-center justify-center bg-gray-50">
                <img 
                  src={gift.image} 
                  alt={gift.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{gift.name}</h3>
                <p className="text-gray-600 mb-2 sm:mb-4">{gift.description}</p>
                <p className="text-rose-700 font-bold mb-2">R$ {gift.price}</p>
                <button
                  onClick={() => handlePresentClick(gift)}
                  className="inline-block bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700 transition mt-auto"
                >
                  Presentear
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal de agradecimento */}
        {showModal && selectedGift && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
            <div className="bg-white rounded-lg p-4 sm:p-8 max-w-md w-full text-center relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                &times;
              </button>
              <h2 className="text-xl sm:text-2xl font-serif text-rose-700 mb-2 sm:mb-4">Obrigado por presentear!</h2>
              <p className="mb-2 sm:mb-4">
                Você escolheu: <span className="font-bold">{selectedGift.name}</span>
              </p>
              <p className="mb-2 sm:mb-4">
                Para concluir, envie o valor de <span className="font-bold">R$ {selectedGift.price}</span> via PIX usando o código abaixo:
              </p>
              <div className="flex justify-center mb-2 sm:mb-4">
                <QRCodeSVG value={pixCode} size={120} level="H" includeMargin={true} />
              </div>
              <div className="bg-gray-100 p-2 sm:p-3 rounded font-mono text-base break-all mb-2 sm:mb-4 flex items-center justify-between shadow">
                <span className="mr-2 text-verde-700">{pixCode}</span>
                <button
                  className="bg-verde-700 text-rose-600 px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-bold border-2 border-verde-600 shadow-xl hover:bg-verde-800 hover:border-verde-800 transition-all text-base focus:outline-none focus:ring-2 focus:ring-verde-500"
                  onClick={() => navigator.clipboard.writeText(pixCode)}
                >
                  <span className="drop-shadow">Copiar</span>
                </button>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                Após o envio, sinta-se à vontade para nos avisar! Muito obrigado pelo carinho.
              </p>
            </div>
          </div>
        )}

        {/* Seção PIX geral (opcional) */}
        <motion.div 
          className="mt-12 sm:mt-16 bg-rose-50 rounded-xl p-4 sm:p-8 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg sm:text-2xl font-serif text-rose-700 mb-2 sm:mb-4">Contribuição via PIX</h2>
          <p className="mb-4 sm:mb-6">
            Se preferir, também aceitamos contribuições através de PIX. Basta escanear o código abaixo:
          </p>
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="bg-white p-2 sm:p-4 rounded-lg inline-block">
              <QRCodeSVG 
                value={pixCode} 
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
          <div className="bg-white/80 p-2 sm:p-4 rounded-lg break-all font-mono text-sm">
            {pixCode}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Presentes;