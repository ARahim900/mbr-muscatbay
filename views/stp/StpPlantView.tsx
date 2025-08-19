import React, { useState, useMemo } from 'react';
import type { StpData } from '../../types';
import { StatCard } from '../../components/StatCard';
import { LineChartCard } from '../../components/charts/LineChartCard';
import { BarChartCard } from '../../components/charts/BarChartCard';
import { RangeSlider } from '../../components/RangeSlider';

interface StpPlantViewProps {
    data: StpData;
}

const parseMonthLabel = (label: string): Date => {
    const [monthStr, yearStr] = label.split(' ');
    const monthIndex = new Date(Date.parse(monthStr + " 1, 2022")).getMonth();
    return new Date(parseInt(`20${yearStr}`), monthIndex, 1);
};

export const StpPlantView: React.FC<StpPlantViewProps> = ({ data }) => {
    const allMonths = useMemo(() => data.monthlyWaterVolumes.labels, [data]);
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
        if (!data) return null;
        const [start, end] = range;

        // Filter Chart Data
        const selectedMonthLabels = allMonths.slice(start, end + 1);
        const filterDataset = (dataset) => ({
            ...dataset,
            data: dataset.data.slice(start, end + 1)
        });

        const monthlyWaterVolumes = { labels: selectedMonthLabels, datasets: data.monthlyWaterVolumes.datasets.map(filterDataset) };
        const monthlyFinancials = { labels: selectedMonthLabels, datasets: data.monthlyFinancials.datasets.map(filterDataset) };
        const monthlyOperations = { labels: selectedMonthLabels, datasets: data.monthlyOperations.datasets.map(filterDataset) };
        
        // Filter Daily Log
        const startDate = parseMonthLabel(allMonths[start]);
        const endDate = parseMonthLabel(allMonths[end]);
        endDate.setMonth(endDate.getMonth() + 1); // include all days in the end month

        const dailyLog = data.dailyLog.filter(item => {
            const [day, month, year] = item.date.split('/').map(Number);
            const itemDate = new Date(year, month - 1, day);
            return itemDate >= startDate && itemDate < endDate;
        });

        // Recalculate Stats from filtered chart data (which is already aggregated)
        const sumReducer = (acc, val) => acc + val;
        const totalInlet = monthlyWaterVolumes.datasets.find(d => d.label === 'Sewage Input')?.data.reduce(sumReducer, 0) * 1000;
        const totalTse = monthlyWaterVolumes.datasets.find(d => d.label === 'TSE Output')?.data.reduce(sumReducer, 0) * 1000;
        const totalTankers = monthlyOperations.datasets[0].data.reduce(sumReducer, 0);
        const totalIncome = monthlyFinancials.datasets.find(d => d.label === 'Income')?.data.reduce(sumReducer, 0) * 1000;
        const totalSavings = monthlyFinancials.datasets.find(d => d.label === 'Savings')?.data.reduce(sumReducer, 0) * 1000;

        const stats = [
             { id: 1, title: 'INLET SEWAGE', value: `${totalInlet.toLocaleString()} m³`, subtitle: 'For selected period' },
             { id: 2, title: 'TSE FOR IRRIGATION', value: `${totalTse.toLocaleString()} m³`, subtitle: 'Recycled water' },
             { id: 3, title: 'TANKER TRIPS', value: `${totalTankers.toLocaleString()} trips`, subtitle: 'Total discharges' },
             { id: 4, title: 'GENERATED INCOME', value: `${totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} OMR`, subtitle: 'From tanker fees' },
             { id: 5, title: 'WATER SAVINGS', value: `${totalSavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} OMR`, subtitle: 'By using TSE water' },
             { id: 6, title: 'TOTAL IMPACT', value: `${(totalIncome + totalSavings).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} OMR`, subtitle: 'Savings + Income' },
        ];
        
        return { stats, monthlyWaterVolumes, monthlyFinancials, monthlyOperations, dailyLog };

    }, [data, range, allMonths]);
    
    if (!filteredData) return null;

    const startMonthLabel = allMonths[range[0]];
    const endMonthLabel = allMonths[range[1]];
    const startYear = `20${startMonthLabel.split(' ')[1]}`;
    const endYear = `20${endMonthLabel.split(' ')[1]}`;
    const dailyLogTitle = `Daily Operations Log for ${startMonthLabel} ${startYear} to ${endMonthLabel} ${endYear}`;


    return (
        <div className="animate-fade-in space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
                 <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-6 gap-y-4">
                     <div className="flex items-center gap-2 text-center">
                        <div className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50">{startMonthLabel}</div>
                        <span className="text-slate-500 font-semibold">to</span>
                         <div className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50">{endMonthLabel}</div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.stats.map(stat => <StatCard key={stat.id} {...stat} layout="horizontal" />)}
            </div>

            <LineChartCard data={filteredData.monthlyWaterVolumes} title="Monthly Water Volumes (k m³)" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChartCard data={filteredData.monthlyFinancials} title="Monthly Financials (k OMR)" />
                <LineChartCard data={filteredData.monthlyOperations} title="Monthly Operations (Tanker Trips)" />
            </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">{dailyLogTitle}</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left responsive-table">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Inlet (m³)</th>
                                <th className="px-6 py-3">TSE (m³)</th>
                                <th className="px-6 py-3">Tankers</th>
                                <th className="px-6 py-3">Income (OMR)</th>
                                <th className="px-6 py-3">Savings (OMR)</th>
                                <th className="px-6 py-3">Total (OMR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.dailyLog.slice(0, 100).map(item => ( // Limit to 100 entries for performance
                                <tr key={item.date + Math.random()} className="bg-white border-b hover:bg-slate-50">
                                    <td data-label="Date" className="px-6 py-4 font-medium text-slate-900">{item.date}</td>
                                    <td data-label="Inlet (m³)" className="px-6 py-4">{item.inlet}</td>
                                    <td data-label="TSE (m³)" className="px-6 py-4">{item.tse}</td>
                                    <td data-label="Tankers" className="px-6 py-4">{item.tankers}</td>
                                    <td data-label="Income (OMR)" className="px-6 py-4 text-green-600 font-medium">{item.income}</td>
                                    <td data-label="Savings (OMR)" className="px-6 py-4 text-blue-600 font-medium">{item.savings}</td>
                                    <td data-label="Total (OMR)" className="px-6 py-4 font-bold text-slate-800">{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};