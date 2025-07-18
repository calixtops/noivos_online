// src/pages/contato.tsx
import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'


interface FormData {
  name: string
  email: string
  message: string
  attending: 'yes' | 'no' | 'maybe'
}

const Contato: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    attending: 'yes',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsError(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Erro no envio')

      setSubmitted(true)
      // limpa o form após 3s e remove mensagem de sucesso
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '', attending: 'yes' })
        setSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error(error)
      setIsError(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Contato - Pedro & Geórgia</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow max-w-2xl">
        <motion.h1
          className="text-4xl font-serif text-center text-rose-700 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Confirme sua Presença
        </motion.h1>

        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center"
          >
            Obrigado por confirmar! Estamos ansiosos para vê-lo no nosso casamento.
          </motion.div>
        )}

        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center"
          >
            Ocorreu um erro ao enviar sua confirmação. Tente novamente.
          </motion.div>
        )}

        {!submitted && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
            </div>

            <div>
              <label htmlFor="attending" className="block text-gray-700 mb-2">
                Você comparecerá?
              </label>
              <select
                id="attending"
                name="attending"
                value={formData.attending}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              >
                <option value="yes">Sim, com certeza!</option>
                <option value="no">Infelizmente não poderei</option>
                <option value="maybe">Ainda não tenho certeza</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Mensagem (opcional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-3 px-4 rounded hover:bg-rose-700 transition"
            >
              Confirmar Presença
            </button>
          </motion.form>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Contato