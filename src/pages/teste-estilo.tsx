export default function TesteEstilo() {
  return (
    <div className="min-h-screen bg-olive-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-olive-700 mb-8 text-center">
          Teste de Estilos Tailwind
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-olive-600 mb-4">Card 1</h2>
            <p className="text-stone-600">Este é um teste de estilo com Tailwind CSS.</p>
          </div>
          
          <div className="bg-sage-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-sage-700 mb-4">Card 2</h2>
            <p className="text-stone-700">Verificando se as cores customizadas funcionam.</p>
          </div>
          
          <div className="bg-cream-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-olive-600 mb-4">Card 3</h2>
            <p className="text-stone-600">Testando responsividade e espaçamentos.</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <button className="bg-olive-500 hover:bg-olive-600 text-white px-6 py-3 rounded-md transition-colors duration-200 mr-4">
            Botão Primary
          </button>
          <button className="bg-sage-500 hover:bg-sage-600 text-white px-6 py-3 rounded-md transition-colors duration-200">
            Botão Secondary
          </button>
        </div>
      </div>
    </div>
  );
}
