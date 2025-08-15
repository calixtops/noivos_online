import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette, FaTimes } from 'react-icons/fa';
import { useTheme, themes } from '../contexts/ThemeContext';

const ThemeSelector = () => {
  const { currentTheme, theme, setTheme, isThemeMenuOpen, toggleThemeMenu } = useTheme();

  const themeOptions = Object.entries(themes).map(([key, themeData]) => ({
    key,
    ...themeData
  }));

  return (
    <div className="relative theme-selector">
      {/* Botao do Seletor */}
      <motion.button
        onClick={toggleThemeMenu}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Alterar tema"
      >
        <div className="relative">
          <FaPalette className="text-gray-600 group-hover:text-gray-800 transition-colors" />
          <span className="absolute -top-1 -right-1 text-lg">{theme.icon}</span>
        </div>
      </motion.button>

      {/* Menu de Temas */}
      <AnimatePresence>
        {isThemeMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={toggleThemeMenu}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-24 left-6 z-50 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-4 min-w-[280px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Escolha o Tema</h3>
                <button
                  onClick={toggleThemeMenu}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaTimes className="text-gray-600 text-sm" />
                </button>
              </div>

              {/* Lista de Temas */}
              <div className="space-y-3">
                {themeOptions.map((themeOption) => (
                  <motion.button
                    key={themeOption.key}
                    onClick={() => setTheme(themeOption.key as keyof typeof themes)}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 group ${
                      currentTheme === themeOption.key
                        ? 'border-gray-300 bg-gray-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icone do Tema */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl">
                      {themeOption.icon}
                    </div>

                    {/* Informacoes do Tema */}
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-800 group-hover:text-gray-900">
                        {themeOption.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Tema {currentTheme === themeOption.key ? 'atual' : 'disponivel'}
                      </div>
                    </div>

                    {/* Indicador de Selecao */}
                    {currentTheme === themeOption.key && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Preview do Tema */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Preview do tema atual:</div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <span className="text-xs text-gray-500 ml-2">
                    {theme.name}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
