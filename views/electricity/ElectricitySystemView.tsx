import React, { useState, useMemo } from 'react';
import type { ElectricityData, BarChartData, ElectricityRecord } from '../../types';
import { StatCard } from '../../components/StatCard';
import { LineChartCard } from '../../components/charts/LineChartCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RangeSlider } from '../../components/RangeSlider';
import { DetailedLog } from './components/DetailedLog';
import { Icons } from '../../constants';

interface ElectricitySystemViewProps {
    data: ElectricityData;
}

const HorizontalBarChart = ({ data, title }: { data: BarChartData, title: string }) => {
    const chartData = data.labels.map((label, i) => ({
        name: label,
        value: data.datasets[0].data[i]
    }));

    return (
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-lg h-96">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                    <YAxis dataKey="name" type="category" width={80} stroke="#64748b" fontSize={12} />
                    <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} formatter={(value: number) => `${value.toLocaleString()} kWh`} />
                    <Bar dataKey="value" barSize={20}>
                        {
                            chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={data.datasets[0].backgroundColor} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

const Overview: React.FC<{ data: any }> = ({ data }) => (
    <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.stats.map(stat => <StatCard key={stat.id} {...stat} layout="horizontal" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChartCard data={data.consumptionTrend} title="Monthly Consumption Trend (kWh)" />
            <HorizontalBarChart data={data.consumptionByType} title="Consumption by Type" />
        </div>
    </div>
);


export const ElectricitySystemView: React.FC<ElectricitySystemViewProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const allMonths = useMemo(() => data.months, [data]);
    const [range, setRange] = useState<[number, number]>([0, allMonths.length - 1]);

    const handleRangeChange = ({ min, max }: { min: number; max: number }) => {
        if (min !== range[0] || max !== range[1]) {
            setRange([min, max]);
        }
    };
    
    const resetRange = () => {
        setRange([0, allMonths.length - 1]);
    };

    const filteredData = useMemo(() => {
        const [start, end] = range;
        const selectedMonths = allMonths.slice(start, end + 1);

        // Filter records and calculate period consumption
        const recordsWithPeriodConsumption = data.records.map(record => {
            const periodTotalConsumption = selectedMonths.reduce((sum, month) => sum + (record.monthlyConsumption[month] || 0), 0);
            return { ...record, periodTotalConsumption };
        });

        // Calculate stats
        const totalConsumption = recordsWithPeriodConsumption.reduce((sum, r) => sum + r.periodTotalConsumption, 0);
        const ELECTRICITY_COST_RATE = 0.025;
        const totalCost = totalConsumption * ELECTRICITY_COST_RATE;
        const highestConsumer = [...recordsWithPeriodConsumption].sort((a, b) => b.periodTotalConsumption - a.periodTotalConsumption)[0] || { name: 'N/A', periodTotalConsumption: 0};
        
        const stats = [
            { id: 1, title: 'TOTAL CONSUMPTION', value: `${(totalConsumption / 1000).toFixed(1)} MWh`, subtitle: `For selected period`, icon: <Icons.totalConsumption className="w-6 h-6 text-green-900" />, iconBgColor: 'bg-green-100' },
            { id: 2, title: 'TOTAL COST', value: `OMR ${totalCost.toLocaleString('en-US', {maximumFractionDigits: 0})}`, subtitle: 'Based on consumption', icon: <Icons.totalCost className="w-6 h-6 text-yellow-900" />, iconBgColor: 'bg-yellow-100' },
            { id: 3, title: 'TOTAL METERS', value: `${data.records.length} meters`, subtitle: 'All meter types', icon: <Icons.totalMeters className="w-6 h-6 text-blue-900" />, iconBgColor: 'bg-blue-100' },
            { id: 4, title: 'HIGHEST CONSUMER', value: highestConsumer.name, subtitle: `${highestConsumer.periodTotalConsumption.toLocaleString()} kWh`, icon: <Icons.highestConsumer className="w-6 h-6 text-red-900" />, iconBgColor: 'bg-red-100' },
        ];
        
        // Filter chart data
        const monthlyTotals = selectedMonths.map(month => {
            return data.records.reduce((sum, record) => sum + (record.monthlyConsumption[month] || 0), 0);
        });
        const consumptionTrend = {
            labels: selectedMonths.map(m => m.replace('-', ' ')),
            datasets: [{ ...data.consumptionTrend.datasets[0], data: monthlyTotals }]
        };

        const consumptionByTypeData: Record<string, number> = {};
        recordsWithPeriodConsumption.forEach(record => {
            const type = record.type || 'Unknown';
            if (!consumptionByTypeData[type]) consumptionByTypeData[type] = 0;
            consumptionByTypeData[type] += record.periodTotalConsumption;
        });
        const sortedTypes = Object.entries(consumptionByTypeData).sort((a,b) => b[1] - a[1]);
        const consumptionByType = {
            labels: sortedTypes.map(entry => entry[0]),
            datasets: [{ ...data.consumptionByType.datasets[0], data: sortedTypes.map(entry => Math.round(entry[1])) }]
        };

        return {
            stats,
            consumptionTrend,
            consumptionByType,
            records: recordsWithPeriodConsumption,
            months: selectedMonths
        };
    }, [data, range, allMonths]);

    const startMonthLabel = allMonths[range[0]];
    const endMonthLabel = allMonths[range[1]];

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-center">
                 <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full shadow-sm border">
                    <button onClick={() => setActiveTab('overview')} className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${activeTab === 'overview' ? 'bg-white shadow text-slate-700' : 'text-slate-600 hover:bg-white/60'}`}>Overview</button>
                    <button onClick={() => setActiveTab('detailedLog')} className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${activeTab === 'detailedLog' ? 'bg-white shadow text-slate-700' : 'text-slate-600 hover:bg-white/60'}`}>Detailed Log</button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-6 gap-y-4">
                     <div className="flex items-center gap-2 text-center">
                        <div className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50 font-medium">{startMonthLabel}</div>
                        <span className="text-slate-500 font-semibold">to</span>
                         <div className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50 font-medium">{endMonthLabel}</div>
                    </div>
                    <div className="col-span-2 px-2">
                        <RangeSlider
                            min={0}
                            max={allMonths.length - 1}
                            initialMin={range[0]}
                            initialMax={range[1]}
                            onChange={handleRangeChange}
                        />
                    </div>
                    <button onClick={resetRange} className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors w-full">Reset Range</button>
                </div>
            </div>
            
            {activeTab === 'overview' && <Overview data={filteredData} />}
            {activeTab === 'detailedLog' && <DetailedLog records={filteredData.records} />}
        </div>
    );
};
