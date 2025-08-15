import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeColors } from '../hooks/useThemeColors';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isMounted, setIsMounted] = useState(false);
  const colors = useThemeColors();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate, isMounted]);

  if (!isMounted) {
    // Renderiza valores estáticos durante a hidratação
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
        {[
          { label: 'Dias', value: '--' },
          { label: 'Horas', value: '--' },
          { label: 'Minutos', value: '--' },
          { label: 'Segundos', value: '--' }
        ].map((item, index) => (
          <div
            key={item.label}
            className={`text-center bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-4 shadow-lg border ${colors.borderPrimary}`}
          >
            <div className={`text-lg sm:text-2xl font-bold ${colors.textPrimary}`}>{item.value}</div>
            <div className={`text-xs sm:text-sm ${colors.textSecondary}`}>{item.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {[
        { label: 'Dias', value: timeLeft.days },
        { label: 'Horas', value: timeLeft.hours },
        { label: 'Minutos', value: timeLeft.minutes },
        { label: 'Segundos', value: timeLeft.seconds }
      ].map((item, index) => (
        <motion.div
          key={item.label}
          className={`text-center bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-4 shadow-lg border ${colors.borderPrimary} hover:shadow-xl transition-all duration-300`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className={`text-lg sm:text-2xl font-bold ${colors.textPrimary}`}>{item.value.toString().padStart(2, '0')}</div>
          <div className={`text-xs sm:text-sm ${colors.textSecondary} font-medium`}>{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default Countdown;
