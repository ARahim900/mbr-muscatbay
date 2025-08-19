import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variantClasses = {
    primary: "bg-[#A2D0C8] text-[#4E4456] hover:bg-[#81D8D0] focus:ring-[#A2D0C8]/50",
    secondary: "bg-[#4E4456] text-white hover:bg-[#3d3644] focus:ring-[#4E4456]/50",
    outline: "border-2 border-[#A2D0C8] bg-transparent text-[#A2D0C8] hover:bg-[#A2D0C8] hover:text-[#4E4456] focus:ring-[#A2D0C8]/50",
    ghost: "text-[#4E4456] hover:bg-[#A2D0C8]/10 focus:ring-[#A2D0C8]/50",
    danger: "bg-[#E53E3E] text-white hover:bg-[#c53030] focus:ring-[#E53E3E]/50"
  };
  
  const sizeClasses = {
    xs: "px-2.5 py-1.5 text-xs rounded-lg",
    sm: "px-3 py-2 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-4 py-2 text-base rounded-xl",
    xl: "px-6 py-3 text-base rounded-xl"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ 
        scale: 1.10,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!isLoading && leftIcon && (
        <span className="mr-2 flex-shrink-0">
          {leftIcon}
        </span>
      )}
      
      <span className="flex-grow">
        {children}
      </span>
      
      {!isLoading && rightIcon && (
        <span className="ml-2 flex-shrink-0">
          {rightIcon}
        </span>
      )}
    </motion.button>
  );
};