import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaQrcode, FaWhatsapp, FaCheck } from 'react-icons/fa';
import { useThemeColors } from '../hooks/useThemeColors';

const QrCodePix = () => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const colors = useThemeColors();

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
    <div className={`bg-white rounded-2xl shadow-xl border ${colors.borderPrimary} p-6 max-w-md mx-auto`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 ${colors.gradientPrimary} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <FaQrcode className="text-white text-2xl" />
          </div>
          <h3 className={`text-xl font-serif font-bold ${colors.textPrimary} mb-2`}>
            Contribuir via PIX
          </h3>
          <p className={`${colors.textSecondary} text-sm`}>
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
              className={`bg-white p-4 rounded-xl border-2 ${colors.borderPrimary} inline-block`}
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
              className={`w-48 h-48 bg-gradient-to-br ${colors.bgSecondary} to-${colors.bgSecondary.replace('100', '200')} rounded-xl border-2 border-dashed ${colors.borderSecondary} flex items-center justify-center mx-auto hover:${colors.borderPrimary} transition-colors`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <FaQrcode className={`${colors.textSecondary} text-4xl mx-auto mb-2`} />
                <p className={`${colors.textPrimary} font-medium`}>Clique para ver QR Code</p>
              </div>
            </motion.button>
          )}
        </div>

        {/* Chave PIX */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${colors.textSecondary} mb-2`}>
            Chave PIX:
          </label>
          <div className="flex items-center gap-2">
            <div className={`flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-mono ${colors.textPrimary}`}>
              {pixData.key}
            </div>
            <motion.button
              onClick={copyToClipboard}
              className={`p-2 ${colors.bgPrimary} hover:${colors.hoverPrimary} text-white rounded-lg transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? <FaCheck /> : <FaCopy />}
            </motion.button>
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm ${colors.textSecondary} mt-2 text-center`}
            >
              Chave copiada!
            </motion.p>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3">
          <motion.button
            onClick={shareWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp className="text-lg" />
            Compartilhar via WhatsApp
          </motion.button>
        </div>

        {/* Aviso */}
        <div className={`mt-6 p-4 ${colors.bgSecondary} rounded-lg border ${colors.borderPrimary}`}>
          <p className={`text-sm ${colors.textSecondary} text-center`}>
            💝 Qualquer valor é bem-vindo! Sua contribuição nos ajudará a realizar nosso sonho.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default QrCodePix;
