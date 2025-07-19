import React from 'react';

interface WatercolorBackgroundProps {
  className?: string;
}

const WatercolorBackground: React.FC<WatercolorBackgroundProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Textura de papel aquarela muito sutil */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-sage-100/30 via-transparent to-olive-100/20" />
      
      {/* Manchas de aquarela estáticas e sutis */}
      <div className="absolute top-16 left-12 w-40 h-40 bg-gradient-radial from-sage-200/15 via-sage-100/8 to-transparent rounded-full blur-2xl opacity-20" />
      
      <div className="absolute top-32 right-16 w-56 h-56 bg-gradient-radial from-olive-200/12 via-olive-100/6 to-transparent rounded-full blur-2xl opacity-15" />
      
      <div className="absolute bottom-40 left-1/4 w-32 h-32 bg-gradient-radial from-cream-300/18 via-cream-200/10 to-transparent rounded-full blur-2xl opacity-25" />
      
      <div className="absolute bottom-24 right-1/3 w-48 h-48 bg-gradient-radial from-sage-300/10 via-sage-200/6 to-transparent rounded-full blur-2xl opacity-18" />
      
      {/* Texturas muito sutis para simular papel */}
      <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-gradient-radial from-olive-300/8 via-transparent to-transparent rounded-full blur-xl opacity-12" />
      
      <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-gradient-radial from-cream-400/10 via-transparent to-transparent rounded-full blur-xl opacity-15" />
    </div>
  );
};

export default WatercolorBackground;
