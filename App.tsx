import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveView, useSidebar } from './contexts/AppContext';
import { useTheme } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNavBar } from './components/MobileNavBar';
import { NotificationSystem } from './components/NotificationSystem';
import { MainLayout, MainContent, LayoutHeader, LayoutSidebar, ContentWrapper } from './components/MainLayout';
import { mockData, VIEW_TITLES } from './constants';
import { DashboardView } from './views/dashboard/DashboardView';
import { WaterSystemView } from './views/water/WaterSystemView';
import { ElectricitySystemView } from './views/electricity/ElectricitySystemView';
import { HvacSystemView } from './views/hvac/HvacSystemView';
import { FirefightingView } from './views/firefighting/FirefightingView';
import { ContractorTrackerView } from './views/contractor/ContractorTrackerView';
import { StpPlantView } from './views/stp/StpPlantView';
import type { ViewKey } from './types';

const ViewRenderer: React.FC<{ activeView: ViewKey }> = ({ activeView }) => {
    const viewComponent = useMemo(() => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView data={mockData.dashboard} />;
            case 'water':
                return <WaterSystemView />;
            case 'electricity':
                 return <ElectricitySystemView data={mockData.electricity} />;
            case 'hvac':
                 return <HvacSystemView data={mockData.hvac} />;
            case 'firefighting':
                 return <FirefightingView data={mockData.firefighting} />;
            case 'contractor':
                 return <ContractorTrackerView data={mockData.contractor} />;
             case 'stp':
                 return <StpPlantView data={mockData.stp} />;
            default:
                // Default to 'water' view if the activeView is somehow invalid
                return <WaterSystemView />;
        }
    }, [activeView]);

    return <>{viewComponent}</>;
};

export default function App() {
    // Use context hooks for state management
    const { activeView, setActiveView } = useActiveView();
    const { isSidebarOpen, isMobile, setSidebarOpen } = useSidebar();
    const { theme } = useTheme();
    
    // Collapsed sidebar state
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    
    // Update layout when collapsed state changes
    React.useEffect(() => {
        const sidebar = document.querySelector('.layout-sidebar') as HTMLElement;
        const content = document.querySelector('.app-layout-content') as HTMLElement;
        
        if (!isMobile) {
            if (sidebar) {
                sidebar.style.width = isCollapsed ? '5rem' : '15rem';
            }
            if (content) {
                const sidebarWidth = isCollapsed ? '5rem' : '15rem';
                content.style.marginLeft = sidebarWidth;
                content.style.width = `calc(100% - ${sidebarWidth})`;
            }
        }
    }, [isCollapsed, isMobile]);
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-slate-50'}`}
            data-theme={theme}
        >
            <MainLayout isSidebarOpen={isSidebarOpen}>
                <LayoutSidebar isOpen={isMobile ? isSidebarOpen : true}>
                    <Sidebar 
                        activeView={activeView} 
                        setActiveView={setActiveView} 
                        isSidebarOpen={isSidebarOpen} 
                        setSidebarOpen={setSidebarOpen}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                    />
                </LayoutSidebar>
                
                <ContentWrapper isSidebarOpen={isSidebarOpen} isMobile={isMobile} isCollapsed={isCollapsed}>
                    <LayoutHeader>
                        <Header 
                            title={VIEW_TITLES[activeView]} 
                            setSidebarOpen={setSidebarOpen}
                        />
                    </LayoutHeader>
                    
                    <MainContent activeView={activeView}>
                        <ViewRenderer activeView={activeView} />
                    </MainContent>
                </ContentWrapper>
            </MainLayout>
            
            {/* Mobile Navigation - Only show on mobile */}
            <AnimatePresence>
                {isMobile && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-0 left-0 right-0 z-50"
                    >
                        <MobileNavBar 
                            activeView={activeView} 
                            setActiveView={setActiveView} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Sidebar Overlay for mobile */}
            <AnimatePresence>
                {isMobile && isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    />
                )}
            </AnimatePresence>
            
            {/* Notification System */}
            <NotificationSystem />
        </motion.div>
    );
}
