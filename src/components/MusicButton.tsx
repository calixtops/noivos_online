import React from 'react';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';
import { useAudio } from '../contexts/AudioContext';

const MusicButton: React.FC = () => {
  const { isPlaying, togglePlay, isHydrated } = useAudio();

  if (!isHydrated) return null;

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-olive-600 hover:bg-olive-700 text-white rounded-full p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-40 border-2 border-white"
      aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
    >
      {isPlaying ? (
        <FaMusic className="w-5 h-5 sm:w-6 sm:h-6" />
      ) : (
        <FaVolumeMute className="w-5 h-5 sm:w-6 sm:h-6" />
      )}
    </button>
  );
};

export default MusicButton;
