import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ViewKey } from '../types';

interface MainLayoutProps {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isSidebarOpen,
  className = ''
}) => {
  return (
    <div 
      className={`app-layout ${className}`}
      role="application"
      aria-label="Main application layout"
    >
      {children}
    </div>
  );
};

interface MainContentProps {
  activeView: ViewKey;
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({
  activeView,
  children
}) => {
  return (
    <motion.main
      className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      role="main"
      aria-live="polite"
      aria-label={`${activeView} view content`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.main>
  );
};

interface LayoutHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.header
      className={`sticky top-0 z-30 bg-white/80 dark:bg-[#2C2834]/80 backdrop-blur-md border-b border-[#E0E0E0] dark:border-white/10 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      role="banner"
      aria-label="Application header"
    >
      {children}
    </motion.header>
  );
};

interface LayoutSidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

interface ContentWrapperProps {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  isMobile: boolean;
  isCollapsed?: boolean;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  isSidebarOpen,
  isMobile,
  isCollapsed = false
}) => {
  const getContentClass = () => {
    if (isMobile) return '';
    return isCollapsed ? 'with-sidebar-collapsed' : '';
  };

  return (
    <div className={`app-layout-content ${getContentClass()}`}>
      {children}
    </div>
  );
};

export const LayoutSidebar: React.FC<LayoutSidebarProps> = ({
  children,
  isOpen,
  className = ''
}) => {
  // For mobile, use isOpen to control visibility
  // For desktop, sidebar is always visible
  const sidebarClasses = [
    'layout-sidebar',
    window.innerWidth <= 1023 && isOpen ? 'mobile-open' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={sidebarClasses}
      role="complementary"
      aria-label="Navigation sidebar"
    >
      {children}
    </div>
  );
};