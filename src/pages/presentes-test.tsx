import React from 'react';
import Head from 'next/head';

const PresentesTest = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Head>
        <title>Teste de Presentes - Pedro & Geórgia</title>
      </Head>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Página de Teste - Presentes
        </h1>
        <p className="text-gray-600">
          Esta é uma página de teste para a funcionalidade de presentes.
        </p>
      </div>
    </div>
  );
};

export default PresentesTest;
