import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaQrcode, FaWhatsapp, FaCheck } from 'react-icons/fa';

const QrCodePix = () => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Dados fictícios do PIX para demonstração
  const pixData = {
    key: "joao.maria@exemplo.com",
    keyType: "email",
    name: "João & Maria",
    city: "São Paulo",
    amount: "100.00"
  };

  // Gerar QR Code usando API externa (para demonstração)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `00020126580014br.gov.bcb.pix0136${pixData.key}5204000053039865405100.005802BR5913${pixData.name}6008${pixData.city}62070503***6304`
  )}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixData.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const shareWhatsApp = () => {
    const message = `Olá! Aqui está nossa chave PIX para contribuição: ${pixData.key}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-olive-200 p-6 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-olive-500 to-sage-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaQrcode className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">
            Contribuir via PIX
          </h3>
          <p className="text-stone-600 text-sm">
            Escaneie o QR Code ou copie a chave PIX
          </p>
        </div>

        {/* QR Code */}
        <div className="text-center mb-6">
          {showQR ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-xl border-2 border-olive-200 inline-block"
            >
              <img
                src={qrCodeUrl}
                alt="QR Code PIX"
                className="w-48 h-48 mx-auto"
              />
            </motion.div>
          ) : (
            <motion.button
              onClick={() => setShowQR(true)}
              className="w-48 h-48 bg-gradient-to-br from-olive-100 to-sage-100 rounded-xl border-2 border-dashed border-olive-300 flex items-center justify-center mx-auto hover:border-olive-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <FaQrcode className="text-olive-600 text-4xl mx-auto mb-2" />
                <p className="text-olive-700 font-medium">Clique para ver QR Code</p>
              </div>
            </motion.button>
          )}
        </div>

        {/* Chave PIX */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Chave PIX:
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-mono text-stone-800">
              {pixData.key}
            </div>
            <motion.button
              onClick={copyToClipboard}
              className="p-2 bg-olive-600 hover:bg-olive-700 text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Copiar chave PIX"
            >
              {copied ? <FaCheck className="text-sm" /> : <FaCopy className="text-sm" />}
            </motion.button>
          </div>
        </div>

        {/* Informações */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-stone-600">Nome:</span>
            <span className="font-medium text-stone-800">{pixData.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-600">Tipo:</span>
            <span className="font-medium text-stone-800">E-mail</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-600">Cidade:</span>
            <span className="font-medium text-stone-800">{pixData.city}</span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3">
          <motion.button
            onClick={shareWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp className="text-lg" />
            Compartilhar no WhatsApp
          </motion.button>
          
          {showQR && (
            <motion.button
              onClick={() => setShowQR(false)}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-4 rounded-lg font-medium transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Ocultar QR Code
            </motion.button>
          )}
        </div>

        {/* Aviso */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            💡 <strong>Dica:</strong> Use qualquer app de banco para escanear o QR Code ou fazer PIX pela chave
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default QrCodePix;
