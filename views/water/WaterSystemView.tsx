import React, { useState, useEffect } from 'react';
import { getWaterMeters, type WaterMeter } from '../../src/lib/supabase';
import { OverviewTab } from './components/OverviewTab';
import { WaterLossAnalysisTab } from './components/WaterLossAnalysisTab';
import { ZoneAnalysisTab } from './components/ZoneAnalysisTab';
import { ConsumptionByTypeTab } from './components/ConsumptionByTypeTab';
import { MainDatabaseTab } from './components/MainDatabaseTab';

type WaterTab = 'overview' | 'waterLoss' | 'zoneAnalysis' | 'consumptionType' | 'database';

export const WaterSystemView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<WaterTab>('overview');
    const [meters, setMeters] = useState<WaterMeter[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getWaterMeters();
                setMeters(data);
            } catch (error) {
                console.error('Error fetching water meters:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const tabs: { id: WaterTab; label: string }[] = [
        { id: 'overview', label: 'Overview' },
        { id: 'waterLoss', label: 'Water Loss Analysis' },
        { id: 'zoneAnalysis', label: 'Zone Analysis' },
        { id: 'consumptionType', label: 'Consumption by Type' },
        { id: 'database', label: 'Main Database' },
    ];
    
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
                </div>
            );
        }

        switch (activeTab) {
            case 'overview':
                return <OverviewTab meters={meters} />;
            case 'waterLoss':
                return <WaterLossAnalysisTab meters={meters} />;
            case 'zoneAnalysis':
                return <ZoneAnalysisTab meters={meters} />;
            case 'consumptionType':
                return <ConsumptionByTypeTab meters={meters} />;
            case 'database':
                return <MainDatabaseTab meters={meters} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full min-h-screen bg-white">
            <div className="space-y-8 p-6">
                {/* Tab Navigation */}
                <div className="flex justify-center">
                    <div className="bg-white rounded-full p-2 shadow-lg border border-gray-100">
                        <nav className="flex items-center gap-2" aria-label="Tabs">
                            {tabs.map(tab => (
                                <button 
                                    key={tab.id} 
                                    onClick={() => setActiveTab(tab.id)} 
                                    className={`whitespace-nowrap px-8 py-4 body-base font-semibold rounded-full transition-all duration-300 ${
                                        activeTab === tab.id 
                                            ? 'bg-brand-accent text-white shadow-lg' 
                                            : 'text-brand-primary hover:bg-brand-mint hover:bg-opacity-20'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
                
                {/* Content */}
                <div className="w-full">{renderContent()}</div>
            </div>
        </div>
    );
};
