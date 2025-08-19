
import React from 'react';
import type { DashboardData } from '../../types';
import { StatCard } from '../../components/StatCard';
import { LineChartCard } from '../../components/charts/LineChartCard';
import { DoughnutChartCard } from '../../components/charts/DoughnutChartCard';

interface DashboardViewProps {
    data: DashboardData;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ data }) => (
    <div className="space-y-6 animate-fade-in">
        {/* Modern compact stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.stats.map(stat => <StatCard key={stat.id} {...stat} />)}
        </div>
        
        {/* Charts section with improved spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
                <LineChartCard data={data.lineChart} title="Overall Utility Cost Trend" />
            </div>
            <div className="lg:col-span-1">
                <DoughnutChartCard data={data.doughnutChart} title="Utility Cost Distribution" />
            </div>
        </div>
    </div>
);
