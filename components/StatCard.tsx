import React from 'react';
import { motion } from 'framer-motion';
import type { Stat } from '../types';

type StatCardProps = Stat & {
    layout?: 'vertical' | 'horizontal' | 'compact';
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon, iconBgColor, subtitle, layout = 'vertical' }) => {
    const changeColor = {
        increase: 'text-[#FF8B8B]',
        decrease: 'text-[#65D6AD]',
        neutral: 'text-[#9E9AA7]',
    };
    const changeIcon = {
        increase: '↑',
        decrease: '↓',
        neutral: '→',
    };
    
    // Modern SaaS horizontal layout
    if (layout === 'horizontal') {
        return (
            <motion.div 
                className="group bg-white dark:bg-[#2C2834] p-3 rounded-lg border border-[#E0E0E0]/60 dark:border-white/5 flex items-center gap-3 shadow-card hover:shadow-card-hover transition-all duration-200 hover:border-[#A2D0C8]/30"
                whileHover={{ y: -1, scale: 1.005 }}
                whileTap={{ scale: 0.998 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 25 }}
            >
                {icon && (
                    <div className="flex-shrink-0 w-9 h-9 rounded-md bg-gradient-to-br from-[#A2D0C8] to-[#81D8D0] flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <span className="text-white text-sm font-medium">{icon}</span>
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#9E9AA7] truncate mb-0.5">{title}</p>
                    <p className="text-lg font-semibold text-[#4E4456] dark:text-white leading-tight">{value}</p>
                    {subtitle && <p className="text-xs text-[#9E9AA7] truncate mt-0.5">{subtitle}</p>}
                </div>
                {change && (
                    <div className={`flex-shrink-0 text-xs font-medium px-1.5 py-0.5 rounded-sm ${changeColor[changeType]} bg-current/10`}>
                        {changeIcon[changeType]}{change}
                    </div>
                )}
            </motion.div>
        );
    }
    
    // Modern compact layout for smaller metrics
    if (layout === 'compact') {
        return (
            <motion.div 
                className="group bg-white dark:bg-[#2C2834] p-3 rounded-lg border border-[#E0E0E0]/60 dark:border-white/5 shadow-card hover:shadow-card-hover transition-all duration-200 hover:border-[#A2D0C8]/30"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 25 }}
            >
                <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-[#9E9AA7] truncate">{title}</p>
                    {change && (
                        <span className={`text-xs font-medium ${changeColor[changeType]}`}>
                            {changeIcon[changeType]}{change}
                        </span>
                    )}
                </div>
                <p className="text-xl font-bold text-[#4E4456] dark:text-white leading-tight mb-0.5">{value}</p>
                {subtitle && <p className="text-xs text-[#9E9AA7] leading-tight">{subtitle}</p>}
            </motion.div>
        );
    }

    // Modern SaaS default layout - clean and information dense
    return (
        <motion.div 
            className="group bg-white dark:bg-[#2C2834] p-4 rounded-lg border border-[#E0E0E0]/60 dark:border-white/5 shadow-card hover:shadow-card-hover transition-all duration-200 hover:border-[#A2D0C8]/30 relative overflow-hidden"
            whileHover={{ y: -2, scale: 1.005 }}
            whileTap={{ scale: 0.998 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* Subtle accent border */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#A2D0C8] to-[#81D8D0] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            
            <div className="flex items-start justify-between mb-2">
                <p className="text-xs font-medium text-[#9E9AA7] uppercase tracking-wide">{title}</p>
                {icon && (
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#A2D0C8]/20 to-[#81D8D0]/20 flex items-center justify-center">
                        <span className="text-[#4E4456] dark:text-[#A2D0C8] text-sm">{icon}</span>
                    </div>
                )}
            </div>
            
            <p className="text-2xl font-bold text-[#4E4456] dark:text-white leading-tight mb-1">{value}</p>
            
            <div className="flex items-center justify-between">
                {subtitle && (
                    <p className="text-xs text-[#9E9AA7] leading-tight flex-1">{subtitle}</p>
                )}
                {change && (
                    <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${changeColor[changeType]} bg-current/10 ml-2`}>
                        <span>{changeIcon[changeType]}</span>
                        <span>{change}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};