import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const pousadas = [
  {
    name: "Hotel Don'Ana",
    address: "Av. Beira Mar, 900 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 99123-4567",
    site: "https://www.hoteldonana.com.br",
    description: "Hotel tradicional da região, com piscina, restaurante, quartos confortáveis e excelente localização à beira-mar.",
  },
  {
    name: "Hotel Jangadeiro",
    address: "Av. Beira Mar, 1000 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 99234-5678",
    site: "https://www.hoteljangadeiro.com.br",
    description: "Hotel com estrutura completa, café da manhã incluso, área de lazer e fácil acesso à praia.",
  },
  {
    name: "Pousada Mar do Presídio",
    address: "Av. Beira Mar, 1200 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 99999-1234",
    site: "https://www.pousadamardopresidio.com.br",
    description: "Pousada à beira-mar com piscina, café da manhã incluso e quartos com vista para o mar.",
  },
  {
    name: "Pousada dos Coqueiros",
    address: "Rua dos Coqueiros, 45 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 98888-5678",
    site: "https://wa.me/5585988885678",
    description: "Ambiente familiar, área verde, estacionamento e fácil acesso à praia.",
  },
  {
    name: "Pousada Sol e Mar",
    address: "Rua Sol Nascente, 200 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 99666-4321",
    site: "https://www.instagram.com/pousadasolemar",
    description: "Quartos climatizados, piscina, restaurante próprio e atendimento personalizado.",
  },
  {
    name: "Pousada Recanto do Presídio",
    address: "Av. Principal, 800 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 98765-4321",
    site: "https://wa.me/5585987654321",
    description: "Ótima opção para famílias, com área de lazer e café da manhã regional.",
  },
  {
    name: "Pousada Paraíso das Dunas",
    address: "Rua das Dunas, 99 - Praia do Presídio, Aquiraz - CE",
    phone: "(85) 99555-6789",
    site: "https://www.facebook.com/pousadaparaisodasdunas",
    description: "Local tranquilo, próximo às dunas e à praia, com estacionamento e wi-fi.",
  },
];

const Pousadas = () => (
  <div className="min-h-screen flex flex-col">
    <Head>
      <title>Pousadas - Dicas de Hospedagem</title>
    </Head>
    <Header />
    <main className="container mx-auto px-4 py-12 flex-grow">
      <motion.h1
        className="text-4xl font-serif text-center text-rose-700 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Onde se hospedar na Praia do Presídio
      </motion.h1>
      <div className="max-w-3xl mx-auto space-y-8">
        {pousadas.map((pousada, idx) => (
          <motion.div
            key={pousada.name}
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-2xl font-serif text-verde-700 mb-2">{pousada.name}</h2>
            <p className="text-gray-700 mb-1"><span className="font-medium">Endereço:</span> {pousada.address}</p>
            <p className="text-gray-700 mb-1"><span className="font-medium">Telefone:</span> {pousada.phone}</p>
            <p className="text-gray-700 mb-3">{pousada.description}</p>
            <a
              href={pousada.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-rose-600 hover:text-rose-800 font-semibold"
            >
              Reservar / Saber mais
            </a>
          </motion.div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Pousadas;