export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-500 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">
        Teste Tailwind CSS
      </h1>
      <div className="bg-blue-500 p-4 rounded-lg">
        <p className="text-white">
          Se você vê este texto branco em fundo azul, o Tailwind está funcionando!
        </p>
      </div>
      <div className="bg-olive-500 p-4 rounded-lg mt-4">
        <p className="text-white">
          Se você vê este fundo verde oliva, as cores customizadas estão funcionando!
        </p>
      </div>
    </div>
  );
}
