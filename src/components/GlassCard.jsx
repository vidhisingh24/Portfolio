import React from 'react';
import Tilt from 'react-parallax-tilt';

const GlassCard = ({ 
  children, 
  className = '', 
  tiltMaxAngleX = 8, 
  tiltMaxAngleY = 8, 
  scale = 1.02, 
  noTilt = false,
  ...props 
}) => {
  const cardClasses = `glass-effect glass-card-hover rounded-3xl p-6 transition-all duration-300 ${className}`;

  if (noTilt) {
    return (
      <div className={cardClasses} {...props}>
        {children}
      </div>
    );
  }

  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      scale={scale}
      transitionSpeed={1200}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor="#ffffff"
      glarePosition="all"
      className={cardClasses}
      {...props}
    >
      {children}
    </Tilt>
  );
};

export default GlassCard;
// Note: We create dynamic visual depth using smooth tilting and subtle lighting glare.
