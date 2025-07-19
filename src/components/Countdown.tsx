import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
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
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {[
        { label: 'Dias', value: timeLeft.days },
        { label: 'Horas', value: timeLeft.hours },
        { label: 'Minutos', value: timeLeft.minutes },
        { label: 'Segundos', value: timeLeft.seconds }
      ].map((item, index) => (
        <div
          key={item.label}
          className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-4 shadow-lg border border-olive-200"
        >
          <div className="text-lg sm:text-2xl font-bold text-olive-800">{item.value.toString().padStart(2, '0')}</div>
          <div className="text-xs sm:text-sm text-olive-600 font-medium">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
