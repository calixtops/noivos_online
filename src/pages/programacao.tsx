import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Programacao = () => {
  // Dados da cerimônia e festa
  const events = [
    {
      title: "Recepção e Festa",
      date: "06 de Junho de 2026",
      time: "16:00",
      location: "Casa Branca Eventos",
      address: "R. Do Jangadeiro, 190 - Jacaúna, Aquiraz - CE",
      mapLink: "https://maps.app.goo.gl/jWucTajJeoit49hY8"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Programação - Pedro & Geórgia</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <motion.h1 
          className="text-3xl sm:text-4xl font-serif text-center text-rose-700 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Programação do Casamento
        </motion.h1>

        <div className="max-w-4xl mx-auto">
          {/* Lista de Eventos */}
          <div className="space-y-8 sm:space-y-12 mb-12 sm:mb-16">
            {events.map((event, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-8"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <h2 className="text-xl sm:text-2xl font-serif text-rose-600 mb-2 sm:mb-4">{event.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-gray-500 text-sm sm:text-base">Data</h3>
                    <p className="text-base sm:text-lg font-medium">{event.date}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm sm:text-base">Horário</h3>
                    <p className="text-base sm:text-lg font-medium">{event.time}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm sm:text-base">Local</h3>
                    <p className="text-base sm:text-lg font-medium">{event.location}</p>
                  </div>
                </div>
                
                <p className="mt-2 sm:mt-4 text-gray-700 text-sm sm:text-base">
                  <span className="font-medium">Endereço:</span> {event.address}
                </p>
                
                <div className="mt-4 sm:mt-6">
                  <a 
                    href={event.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-rose-600 hover:text-rose-800 text-sm sm:text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Ver no Mapa
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mapa com local principal */}
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-serif text-rose-700 p-4 sm:p-6 pb-0">Local da Cerimônia e Festa</h2>
            <div className="h-64 sm:h-96 w-full mt-2 sm:mt-4 relative">
              <iframe 
                src="https://www.google.com/maps?q=-3.933929728985562,-38.30905682311235&z=16&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              {/* Pin personalizado */}
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white p-2 sm:p-4 rounded-lg shadow-lg w-[90vw] max-w-xs sm:max-w-sm">
                <h3 className="font-serif text-verde-700 text-base sm:text-lg mb-1 sm:mb-2">Casa Branca Eventos</h3>
                <p className="text-xs sm:text-sm text-gray-600">R. Do Jangadeiro, 190 - Jacaúna</p>
                <p className="text-xs sm:text-sm text-gray-600">Aquiraz - CE</p>
                <a 
                  href={events[0].mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-verde-600 text-xs sm:text-sm hover:text-verde-800 inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l4 4V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                  </svg>
                  Como chegar
                </a>
                {/* Botão para pousadas */}
                <a
                  href="/pousadas"
                  className="mt-2 sm:mt-4 block bg-rose-600 text-white px-2 py-2 sm:px-4 rounded-lg font-bold shadow hover:bg-rose-700 transition-all text-center text-xs sm:text-base"
                >
                  Ver opções de hospedagem
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Programacao;