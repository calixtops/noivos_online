import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import gifts from '../../data/gifts.json';

const PresentesTest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Paginação simples
  const totalPages = Math.ceil(gifts.length / itemsPerPage);
  const paginatedGifts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return gifts.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream-50 via-cream-25 to-olive-50">
      <Head>
        <title>Lista de Presentes - Teste - Pedro & Geórgia</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-serif text-olive-700 mb-8 text-center">
          Lista de Presentes - Teste
        </h1>

        {/* Grid simples */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedGifts.map((gift) => (
            <div 
              key={gift.id}
              className="bg-white rounded-xl shadow-lg p-4 border"
            >
              <img 
                src={gift.image} 
                alt={gift.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-gray-900 mb-2">{gift.name}</h3>
              <p className="text-lg font-bold text-olive-700">R$ {gift.price}</p>
            </div>
          ))}
        </div>

        {/* Paginação simples */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </button>
            
            <span className="px-4 py-2">
              {currentPage} de {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PresentesTest;
