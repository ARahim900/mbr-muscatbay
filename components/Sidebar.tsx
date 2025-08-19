import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS, Icons } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import type { ViewKey } from '../types';

interface SidebarProps {
    activeView: ViewKey;
    setActiveView: (view: ViewKey) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
    isCollapsed?: boolean;
    setIsCollapsed?: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    activeView, 
    setActiveView, 
    isSidebarOpen, 
    setSidebarOpen, 
    isCollapsed = false, 
    setIsCollapsed 
}) => {
    const CloseIcon = Icons.close;
    const MenuIcon = Icons.menu;
    const { theme } = useTheme();
    
    // Internal collapsed state if not provided
    const [internalCollapsed, setInternalCollapsed] = useState(false);
    const collapsed = setIsCollapsed ? isCollapsed : internalCollapsed;
    const toggleCollapsed = setIsCollapsed ? setIsCollapsed : setInternalCollapsed;
    
    const sidebarBg = 'bg-[#4E4456]';
    const textColor = 'text-white';
    const borderColor = theme === 'dark' ? 'border-white/10' : 'border-[#4E4456]/20';
    const hoverBg = 'hover:bg-[#4E4456]/50';
    const activeBg = 'bg-[#B0E0E6] text-[#4E4456]';

    return (
        <motion.aside 
            className={`h-full ${sidebarBg} ${textColor} border-r ${borderColor} flex flex-col`}
            style={{ width: collapsed ? '5rem' : '15rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Header */}
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-8 border-b ${borderColor}`}>
                {!collapsed && (
                    <motion.h1 
                        className="heading-5 text-white"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: 0.1 }}
                    >
                        Muscat Bay
                    </motion.h1>
                )}
                <div className="flex items-center gap-2">
                    <motion.button 
                        onClick={() => toggleCollapsed(!collapsed)}
                        className={`hidden lg:flex p-2 rounded-lg ${textColor} hover:text-[#B0E0E6] transition-colors hover:bg-white/10`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    >
                        <MenuIcon className="w-5 h-5" />
                    </motion.button>
                    <button 
                        onClick={() => setSidebarOpen(false)} 
                        className={`lg:hidden ${textColor} hover:text-[#B0E0E6] transition-colors`}
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 p-6 overflow-y-auto">
                <ul className="space-y-2">
                    {NAV_ITEMS.map((item, index) => (
                        <motion.li 
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * (index + 1) }}
                        >
                            <motion.button 
                                onClick={() => { 
                                    setActiveView(item.id); 
                                    // Close sidebar on mobile
                                    if (window.innerWidth < 1024) {
                                        setSidebarOpen(false);
                                    }
                                }} 
                                className={`w-full flex items-center ${collapsed ? 'justify-center px-3' : 'px-5'} py-4 rounded-xl transition-all duration-300 relative ${
                                    activeView === item.id 
                                        ? `${activeBg} font-semibold shadow-lg` 
                                        : `${hoverBg}`
                                }`}
                                whileHover={{ x: collapsed ? 0 : 4, scale: collapsed ? 1.05 : 1 }}
                                whileTap={{ scale: 0.98 }}
                                title={collapsed ? item.label : undefined}
                            >
                                {activeView === item.id && (
                                    <motion.span 
                                        className="absolute left-0 top-2 bottom-2 w-1 bg-[#B0E0E6] rounded-r-full"
                                        layoutId="activeIndicator"
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                                <item.icon className={`w-6 h-6 ${collapsed ? '' : 'mr-4'} flex-shrink-0`} />
                                {!collapsed && (
                                    <motion.span 
                                        className="text-left body-base font-medium"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2, delay: 0.1 }}
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </motion.button>
                        </motion.li>
                    ))}
                </ul>
            </nav>
            
            {/* Footer with theme info */}
            {!collapsed && (
                <motion.div 
                    className={`p-6 border-t ${borderColor}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                >
                    <div className="caption text-white opacity-60">
                        Theme: {theme}
                    </div>
                </motion.div>
            )}
        </motion.aside>
    );
};