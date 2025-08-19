import React from 'react';
import type { WaterSystemData, ChartData, ChangeType, Stat } from '../../../types';
import { StatCard } from '../../../components/StatCard';
import { LineChartCard } from '../../../components/charts/LineChartCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OverviewDashboardProps {
    data: WaterSystemData;
    selectedMonth: string;
}

const getChangeType = (value: number): ChangeType => {
    if (value === 0) return 'neutral';
    return value > 0 ? 'increase' : 'decrease';
};

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ data, selectedMonth }) => {
    const currentMonthData = data.monthlyCalculations[selectedMonth];
    const previousMonthIndex = data.months.indexOf(selectedMonth) - 1;
    const previousMonth = previousMonthIndex >= 0 ? data.months[previousMonthIndex] : null;
    const previousMonthData = previousMonth ? data.monthlyCalculations[previousMonth] : null;

    if (!currentMonthData) {
        return <div className="p-6 text-center text-slate-500">No data available for the selected month.</div>;
    }

    const calculateChangePercent = (current: number, previous: number | null | undefined): string | undefined => {
        if (previous === null || previous === undefined || previous === 0) return undefined;
        const change = ((current - previous) / previous) * 100;
        if (Math.abs(change) < 0.01) return undefined;
        return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
    };

    const getChangeForStat = (current: number, previous: number | null | undefined, invertColor: boolean = false): number => {
        if (previous === null || previous === undefined) return 0;
        const diff = current - previous;
        return invertColor ? -diff : diff;
    };

    const stats: Stat[] = [
        { id: 1, title: 'A1 - Main Source', value: `${currentMonthData.A1.toLocaleString()} m³`, change: calculateChangePercent(currentMonthData.A1, previousMonthData?.A1), changeType: getChangeType(getChangeForStat(currentMonthData.A1, previousMonthData?.A1)) },
        { id: 2, title: 'A2 - Billed (Z+DC)', value: `${currentMonthData.A2.toLocaleString()} m³`, change: calculateChangePercent(currentMonthData.A2, previousMonthData?.A2), changeType: getChangeType(getChangeForStat(currentMonthData.A2, previousMonthData?.A2)) },
        { id: 3, title: 'A3 - Consumption', value: `${currentMonthData.A3_Individual.toLocaleString()} m³`, change: calculateChangePercent(currentMonthData.A3_Individual, previousMonthData?.A3_Individual), changeType: getChangeType(getChangeForStat(currentMonthData.A3_Individual, previousMonthData?.A3_Individual)) },
        { id: 4, title: 'System Efficiency', value: `${currentMonthData.systemEfficiency.toFixed(1)}%`, change: calculateChangePercent(currentMonthData.systemEfficiency, previousMonthData?.systemEfficiency), changeType: getChangeType(getChangeForStat(currentMonthData.systemEfficiency, previousMonthData?.systemEfficiency, true)) },
        { id: 5, title: 'Total Water Loss', value: `${currentMonthData.totalLoss.toLocaleString()} m³`, change: calculateChangePercent(currentMonthData.totalLoss, previousMonthData?.totalLoss), changeType: getChangeType(getChangeForStat(currentMonthData.totalLoss, previousMonthData?.totalLoss)) },
        { id: 6, title: 'Stage 1 Loss', value: `${currentMonthData.stage1Loss.toLocaleString()} m³`, change: calculateChangePercent(currentMonthData.stage1Loss, previousMonthData?.stage1Loss), changeType: getChangeType(getChangeForStat(currentMonthData.stage1Loss, previousMonthData?.stage1Loss)) },
        { id: 7, title: 'Stage 2 Loss', value: `${currentMonthData.stage2Loss.toLocaleString()} m³`, change: calculateChangePercent(currentMonthData.stage2Loss, previousMonthData?.stage2Loss), changeType: getChangeType(getChangeForStat(currentMonthData.stage2Loss, previousMonthData?.stage2Loss)) },
        { id: 8, title: 'Stage 3 Loss', value: `${currentMonthData.stage3Loss.toLocaleString()} m³`, change: calculateChangePercent(currentMonthData.stage3Loss, previousMonthData?.stage3Loss), changeType: getChangeType(getChangeForStat(currentMonthData.stage3Loss, previousMonthData?.stage3Loss)) },
    ];
    
    const consumptionTrendData: ChartData = {
        labels: data.months,
        datasets: [
            { label: 'A1 Main Source', data: data.months.map(m => data.monthlyCalculations[m]?.A1 || 0), borderColor: '#3b82f6' },
            { label: 'A3 Consumption', data: data.months.map(m => data.monthlyCalculations[m]?.A3_Individual || 0), borderColor: '#10b981' },
        ]
    };

    const waterLossData = data.months.map(month => {
        const d = data.monthlyCalculations[month];
        return {
            name: month,
            'Stage 1 Loss': d?.stage1Loss || 0,
            'Stage 2 Loss': d?.stage2Loss || 0,
            'Stage 3 Loss': d?.stage3Loss || 0,
        };
    });

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => <StatCard key={stat.id} {...stat} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <LineChartCard data={consumptionTrendData} title="Monthly Consumption Trend (m³)" />
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-lg h-96">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Monthly Water Loss Trend (m³)</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={waterLossData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" fontSize={12} />
                            <YAxis fontSize={12} />
                            <Tooltip formatter={(value: number) => `${value.toLocaleString()} m³`}/>
                            <Legend />
                            <Bar dataKey="Stage 1 Loss" stackId="a" fill="#f87171" />
                            <Bar dataKey="Stage 2 Loss" stackId="a" fill="#fb923c" />
                            <Bar dataKey="Stage 3 Loss" stackId="a" fill="#facc15" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
