import React from 'react';
import { motion } from 'framer-motion';

const LuxuryButton = ({ 
  children, 
  variant = 'gold', 
  size = 'medium', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  
  const baseClasses = "position-relative overflow-hidden transition-all duration-300 ease-in-out font-medium text-center border-0";
  
  const variants = {
    gold: "btn-gold",
    outline: "btn-outline-gold",
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const getButtonClasses = () => {
    let classes = `${variants[variant]} ${sizes[size]} ${disabledClass} ${className}`;
    return classes;
  };

  return (
    <motion.button
      className={`${getButtonClasses()} relative rounded-0 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};

export default LuxuryButton;