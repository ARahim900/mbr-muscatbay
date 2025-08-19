import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  hoverable?: boolean;
  noPadding?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  header,
  hoverable = true,
  noPadding = false,
  onClick
}) => {
  const baseClasses = `
    group
    bg-white dark:bg-[#2C2834] 
    border border-[#E0E0E0]/60 dark:border-white/5
    rounded-lg
    shadow-card
    transition-all duration-200
    relative overflow-hidden
    ${hoverable ? 'hover:shadow-card-hover hover:border-[#A2D0C8]/30 hover:-translate-y-0.5' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${noPadding ? '' : 'p-4'}
  `;

  const cardContent = (
    <>
      {hoverable && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#A2D0C8] to-[#81D8D0] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      )}
      {header && (
        <div className="border-b border-[#E0E0E0]/60 dark:border-white/5 px-4 py-3 -mx-4 -mt-4 mb-4">
          <div className="text-sm font-semibold text-[#4E4456] dark:text-white">
            {header}
          </div>
        </div>
      )}
      {children}
    </>
  );

  if (hoverable) {
    return (
      <motion.div
        className={`${baseClasses} ${className}`}
        onClick={onClick}
        whileHover={{ y: -1, scale: 1.005 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`} onClick={onClick}>
      {cardContent}
    </div>
  );
};

export default Card;