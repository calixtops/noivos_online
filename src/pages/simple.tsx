export default function SimpleTest() {
  return (
    <div className="min-h-screen bg-olive-50 p-8">
      <h1 className="text-4xl font-bold text-olive-800 mb-4">
        Teste Simples Tailwind
      </h1>
      <div className="bg-olive-500 p-4 rounded-lg mb-4">
        <p className="text-white font-medium">
          ✅ Se você vê este fundo verde oliva, o Tailwind está funcionando!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-500 p-4 rounded-lg">
          <p className="text-white">Vermelho</p>
        </div>
        <div className="bg-blue-500 p-4 rounded-lg">
          <p className="text-white">Azul</p>
        </div>
        <div className="bg-green-500 p-4 rounded-lg">
          <p className="text-white">Verde</p>
        </div>
      </div>
      <div className="mt-8 text-olive-700">
        <p className="text-lg">Se você vê:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Fundo da página em verde oliva claro</li>
          <li>Título grande em verde oliva escuro</li>
          <li>Caixa verde oliva com texto branco</li>
          <li>Grid de 3 caixas coloridas</li>
        </ul>
        <p className="mt-4 font-bold text-green-600">
          🎉 ENTÃO O TAILWIND ESTÁ FUNCIONANDO PERFEITAMENTE!
        </p>
      </div>
    </div>
  );
}
