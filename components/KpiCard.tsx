import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  subtitle,
  icon: Icon,
  trend,
  className = ''
}) => {
  return (
    <motion.div
      className={`
        group
        bg-white dark:bg-[#2C2834] 
        border border-[#E0E0E0]/60 dark:border-white/5
        rounded-lg
        shadow-card
        p-3
        hover:shadow-card-hover
        hover:border-[#A2D0C8]/30
        transition-all duration-200
        cursor-pointer
        relative overflow-hidden
        ${className}
      `}
      whileHover={{ y: -1, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Subtle accent border on hover */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#A2D0C8] to-[#81D8D0] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      <div className="flex items-center gap-3">
        {/* Compact Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-[#A2D0C8] to-[#81D8D0] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content - More compact */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[#9E9AA7] mb-0.5 uppercase tracking-wide">
            {title}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-[#4E4456] dark:text-white leading-tight">
              {value}
            </p>
            {trend && (
              <div className={`flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full ${trend.isPositive ? 'text-[#65D6AD] bg-[#65D6AD]/10' : 'text-[#FF8B8B] bg-[#FF8B8B]/10'}`}>
                <span>{trend.isPositive ? '↗' : '↘'}</span>
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-[#9E9AA7] leading-tight mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default KpiCard;