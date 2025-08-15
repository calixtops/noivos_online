import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaComment, FaHeart, FaCheck, FaExclamationTriangle, FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useThemeColors } from '../hooks/useThemeColors';

interface FormData {
  name: string;
  email: string;
  message: string;
  attending: 'yes' | 'no' | 'maybe';
  guests?: number;
}

const Contato: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    attending: 'yes',
    guests: 1,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const colors = useThemeColors();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'guests' ? parseInt(value) || 1 : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage('');
    setIsLoading(true);

    try {
      console.log('Enviando dados:', formData);
      
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Resposta da API:', data);

      if (!res.ok) {
        throw new Error(data.error || `Erro ${res.status}: ${res.statusText}`);
      }

      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '', attending: 'yes', guests: 1 });
        setSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Erro no envio:', error);
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const attendingOptions = [
    { value: 'yes', label: 'Sim, com certeza! 🤗', color: `${colors.gradientPrimary}` },
    { value: 'maybe', label: 'Ainda não tenho certeza 🤔', color: 'from-stone-400 to-stone-500' },
    { value: 'no', label: 'Infelizmente não poderei 😔', color: 'from-stone-300 to-stone-400' }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${colors.gradientBackground}`}>
      <Head>
        <title>Contato - João & Maria</title>
        <meta name="description" content="Confirme sua presença no casamento de João e Maria - 15 de Dezembro de 2024" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${colors.bgCream}/50 to-${colors.bgSecondary}/50`}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className={`text-4xl sm:text-5xl lg:text-6xl font-serif font-bold ${colors.textPrimary} mb-6`}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Confirme sua Presença
            </motion.h1>
            
            <motion.div 
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className={`h-px bg-gradient-to-r from-transparent via-${colors.textSecondary} to-transparent flex-1 max-w-32`}></div>
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaHeart className={`${colors.textAccent} text-3xl animate-heartbeat`} />
              </motion.div>
              <div className={`h-px bg-gradient-to-r from-transparent via-${colors.textSecondary} to-transparent flex-1 max-w-32`}></div>
            </motion.div>

            <motion.p 
              className={`text-xl sm:text-2xl ${colors.textSecondary} max-w-3xl mx-auto leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Sua presença é o presente mais valioso que podemos receber. Confirme sua participação!
            </motion.p>
          </div>
        </section>

        {/* Formulário e Informações */}
        <section 
          ref={sectionRef}
          className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulário */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className={`${colors.bgCream} rounded-2xl shadow-xl p-6 sm:p-8 border ${colors.borderPrimary}`}>
                  <h2 className={`text-2xl sm:text-3xl font-serif font-bold ${colors.textPrimary} mb-8 text-center`}>
                    Formulário de Confirmação
                  </h2>

                  <AnimatePresence mode="wait">
                    {submitted && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                          }}
                          transition={{ duration: 1 }}
                        >
                          <FaCheck className="text-white text-2xl" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-green-700 mb-4">
                          Confirmação Recebida!
                        </h3>
                        <p className="text-green-600 text-lg leading-relaxed">
                          Obrigado por confirmar! Estamos ansiosos para celebrar este momento especial com você.
                        </p>
                      </motion.div>
                    )}

                    {isError && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6"
                      >
                        <div className="flex items-center gap-3">
                          <FaExclamationTriangle className="text-red-500 text-xl" />
                          <div>
                            <h3 className="text-red-700 font-semibold">Erro no envio</h3>
                            <p className="text-red-600">
                              {errorMessage || 'Tente novamente ou entre em contato conosco.'}
                            </p>
                            <details className="mt-2">
                              <summary className="text-sm text-red-500 cursor-pointer">Ver detalhes técnicos</summary>
                              <pre className="text-xs text-red-400 mt-1 bg-red-100 p-2 rounded">
                                {JSON.stringify(formData, null, 2)}
                              </pre>
                            </details>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {!submitted && (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label htmlFor="name" className={`block ${colors.textSecondary} font-semibold mb-3 text-lg`}>
                            <FaUser className={`inline mr-2 ${colors.textAccent}`} />
                            Nome Completo
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Digite seu nome completo"
                            className={`w-full px-4 py-3 border ${colors.borderPrimary} rounded-xl focus:ring-2 focus:ring-${colors.textAccent.replace('text-', '')} focus:border-${colors.textAccent.replace('text-', '')} transition-all duration-300 text-lg ${colors.bgSecondary} hover:${colors.bgCream}`}
                          />
                        </motion.div>

                        {/* Email */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label htmlFor="email" className={`block ${colors.textSecondary} font-semibold mb-3 text-lg`}>
                            <FaEnvelope className={`inline mr-2 ${colors.textAccent}`} />
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="seu@email.com"
                            className={`w-full px-4 py-3 border ${colors.borderPrimary} rounded-xl focus:ring-2 focus:ring-${colors.textAccent.replace('text-', '')} focus:border-${colors.textAccent.replace('text-', '')} transition-all duration-300 text-lg ${colors.bgSecondary} hover:${colors.bgCream}`}
                          />
                        </motion.div>

                        {/* Presença */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label className={`block ${colors.textSecondary} font-semibold mb-3 text-lg`}>
                            <FaHeart className={`inline mr-2 ${colors.textAccent}`} />
                            Você comparecerá?
                          </label>
                          <div className="space-y-3">
                            {attendingOptions.map((option) => (
                              <motion.label
                                key={option.value}
                                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                  formData.attending === option.value
                                    ? `${colors.borderSecondary} ${colors.bgSecondary}`
                                    : `${colors.borderPrimary} hover:${colors.borderSecondary} hover:${colors.bgSecondary}`
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <input
                                  type="radio"
                                  name="attending"
                                  value={option.value}
                                  checked={formData.attending === option.value}
                                  onChange={handleChange}
                                  className="sr-only"
                                />
                                <div className={`w-4 h-4 rounded-full mr-3 ${
                                  formData.attending === option.value
                                    ? `${colors.bgPrimary}`
                                    : 'bg-gray-300'
                                }`} />
                                <span className="text-lg">{option.label}</span>
                              </motion.label>
                            ))}
                          </div>
                        </motion.div>

                        {/* Número de convidados */}
                        {formData.attending === 'yes' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <label htmlFor="guests" className={`block ${colors.textSecondary} font-semibold mb-3 text-lg`}>
                              Quantas pessoas virão?
                            </label>
                            <select
                              id="guests"
                              name="guests"
                              value={formData.guests}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border ${colors.borderPrimary} rounded-xl focus:ring-2 focus:ring-${colors.textAccent.replace('text-', '')} focus:border-${colors.textAccent.replace('text-', '')} transition-all duration-300 text-lg ${colors.bgSecondary} hover:${colors.bgCream}`}
                            >
                              {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>
                                  {num} {num === 1 ? 'pessoa' : 'pessoas'}
                                </option>
                              ))}
                            </select>
                          </motion.div>
                        )}

                        {/* Mensagem */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label htmlFor="message" className={`block ${colors.textSecondary} font-semibold mb-3 text-lg`}>
                            <FaComment className={`inline mr-2 ${colors.textAccent}`} />
                            Mensagem (opcional)
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Deixe uma mensagem carinhosa para os noivos..."
                            className={`w-full px-4 py-3 border ${colors.borderPrimary} rounded-xl focus:ring-2 focus:ring-${colors.textAccent.replace('text-', '')} focus:border-${colors.textAccent.replace('text-', '')} transition-all duration-300 text-lg ${colors.bgSecondary} hover:${colors.bgCream} resize-none`}
                          />
                        </motion.div>

                        {/* Botão de envio */}
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          className={`w-full ${colors.gradientPrimary} text-cream py-4 px-6 rounded-xl hover:${colors.hoverPrimary} transition-all duration-300 text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin"></div>
                              Enviando...
                            </div>
                          ) : (
                            'Confirmar Presença'
                          )}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Informações de Contato */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Contato dos Noivos */}
                <div className={`${colors.gradientPrimary} rounded-2xl p-6 sm:p-8 text-cream`}>
                  <h3 className="text-2xl font-serif font-bold mb-6">Fale Conosco</h3>
                  <div className="space-y-4">
                    <a 
                      href="https://wa.me/qr/7VZA5YSZPPZ2A1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 hover:bg-cream/10 rounded-lg p-2 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-cream/20 rounded-full flex items-center justify-center group-hover:bg-cream/30 transition-colors">
                        <FaWhatsapp className="text-xl" />
                      </div>
                      <div>
                        <p className="font-semibold">WhatsApp</p>
                        <p className="text-cream/90">Entre em contato direto</p>
                      </div>
                    </a>
                    
                    <a 
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 hover:bg-cream/10 rounded-lg p-2 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-cream/20 rounded-full flex items-center justify-center group-hover:bg-cream/30 transition-colors">
                        <FaInstagram className="text-xl" />
                      </div>
                      <div>
                        <p className="font-semibold">Instagram</p>
                        <p className="text-cream/90">@Instagram</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Informações do Evento */}
                <div className={`${colors.bgCream} rounded-2xl shadow-xl p-6 sm:p-8 border ${colors.borderPrimary}`}>
                  <h3 className={`text-2xl font-serif font-bold ${colors.textPrimary} mb-6`}>Detalhes do Evento</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <FaMapMarkerAlt className={`${colors.textAccent} text-xl mt-1`} />
                      <div>
                        <p className={`font-semibold ${colors.textPrimary}`}>Local</p>
                        <p className={`${colors.textSecondary}`}>Casa Branca Eventos</p>
                        <p className={`${colors.textSecondary}`}>R. Do Jangadeiro, 190 - Jacaúna, Aquiraz - CE</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <FaHeart className={`${colors.textAccent} text-xl mt-1 animate-pulse-love`} />
                      <div>
                        <p className={`font-semibold ${colors.textPrimary}`}>Data e Horário</p>
                        <p className={`${colors.textSecondary}`}>15 de Dezembro de 2024</p>
                        <p className={`${colors.textSecondary}`}>A partir das 16h</p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.a
                    href="/programacao"
                    className={`mt-6 inline-flex items-center gap-2 ${colors.gradientPrimary} text-cream px-6 py-3 rounded-full font-semibold hover:${colors.hoverPrimary} transition-all duration-300`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Programação Completa
                  </motion.a>
                </div>

                {/* Dicas Importantes */}
                <div className={`${colors.bgSecondary} rounded-2xl p-6 sm:p-8 border ${colors.borderPrimary}`}>
                  <h3 className={`text-xl font-serif font-bold ${colors.textPrimary} mb-4`}>🌿 Dicas Importantes</h3>
                  <ul className={`space-y-3 ${colors.textSecondary}`}>
                    <li className="flex items-start gap-3">
                      <div className={`w-2 h-2 ${colors.bgPrimary} rounded-full mt-2 flex-shrink-0`}></div>
                      <span>Confirme sua presença até 15 dias antes do evento</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className={`w-2 h-2 ${colors.bgPrimary} rounded-full mt-2 flex-shrink-0`}></div>
                      <span>Dress code: Traje esporte fino</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className={`w-2 h-2 ${colors.bgPrimary} rounded-full mt-2 flex-shrink-0`}></div>
                      <span>
                        Veja opções de hospedagem na aba{' '}
                        <motion.a
                          href="/pousadas"
                          className={`${colors.textAccent} font-semibold hover:${colors.textPrimary} underline decoration-${colors.textAccent.replace('text-', '')} hover:decoration-${colors.textPrimary.replace('text-', '')} transition-all duration-300`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Pousadas
                        </motion.a>
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;