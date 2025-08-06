import React from 'react';
import Head from 'next/head';

const IndexMinimal = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Head>
        <title>Página Minimal - Pedro & Geórgia</title>
      </Head>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Página Minimal
        </h1>
        <p className="text-gray-600">
          Esta é uma versão minimal da página inicial.
        </p>
      </div>
    </div>
  );
};

export default IndexMinimal;
