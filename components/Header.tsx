import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../constants';
import { useTheme, useThemeToggle } from '../contexts/ThemeContext';

interface HeaderProps {
    title: string;
    setSidebarOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ title, setSidebarOpen }) => {
    const { theme } = useTheme();
    const toggleTheme = useThemeToggle();
    
    const textColor = theme === 'dark' ? 'text-white' : 'text-[#4E4456]';
    const mutedTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
    const borderColor = theme === 'dark' ? 'border-white/10' : 'border-gray-200/80';
    const inputBg = theme === 'dark' ? 'bg-[#4E4456]/50' : 'bg-white';
    const inputBorder = theme === 'dark' ? 'border-white/20' : 'border-gray-200';
    const inputText = theme === 'dark' ? 'text-white' : 'text-[#4E4456]';
    const hoverBg = theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-50';

    return (
        <motion.header 
            className={`flex items-center justify-between px-4 py-3 border-b ${borderColor} bg-white/80 dark:bg-[#2C2834]/80 backdrop-blur-md`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center">
                <motion.button 
                    onClick={() => setSidebarOpen(true)} 
                    className={`lg:hidden mr-3 ${mutedTextColor} ${hoverBg} p-2 rounded-md transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Icons.menu className="w-5 h-5" />
                </motion.button>
                <motion.h1 
                    className={`text-lg font-semibold ${textColor} tracking-tight`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {title}
                </motion.h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Compact Search */}
                <div className="relative hidden md:block">
                    <Icons.search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${mutedTextColor}`} />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className={`w-64 px-3 py-2 pl-9 text-sm ${inputText} ${inputBg} border ${inputBorder} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A2D0C8] focus:border-[#A2D0C8] transition-all duration-200`}
                    />
                </div>
                
                {/* Theme Toggle */}
                <motion.button 
                    onClick={toggleTheme}
                    className={`p-2 rounded-md ${hoverBg} ${mutedTextColor} transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    )}
                </motion.button>
                
                {/* Notifications */}
                <motion.button 
                    className={`p-2 rounded-md ${hoverBg} ${mutedTextColor} transition-colors relative`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Icons.notification className="w-4 h-4" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF8B8B] rounded-full"></span>
                </motion.button>
                
                {/* User Profile - Compact */}
                <div className="flex items-center space-x-2 pl-2 border-l border-[#E0E0E0]/60 dark:border-white/10">
                    <img 
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#A2D0C8]/30" 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" 
                        alt="User profile" 
                    />
                    <div className="hidden sm:block">
                        <p className={`text-sm font-medium ${textColor}`}>Admin</p>
                        <p className={`text-xs ${mutedTextColor}`}>Manager</p>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};