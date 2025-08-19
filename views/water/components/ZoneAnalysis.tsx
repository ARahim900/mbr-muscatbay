import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import type { WaterSystemData, WaterMeterRecord, DoughnutChartData } from '../../../types';

interface ZoneAnalysisViewProps {
    data: WaterSystemData;
    selectedMonth: string;
}

const ZoneMetersTable: React.FC<{ meters: WaterMeterRecord[], month: string }> = ({ meters, month }) => (
    <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-100">
                <tr>
                    <th className="px-4 py-2">Meter Label</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2 text-right">Consumption (m³)</th>
                </tr>
            </thead>
            <tbody>
                {meters.map(meter => (
                    <tr key={meter.meterLabel} className="border-b hover:bg-slate-50">
                        <td className="px-4 py-2 font-medium">{meter.meterLabel}</td>
                        <td className="px-4 py-2">{meter.type}</td>
                        <td className="px-4 py-2 text-right font-mono">{meter.monthlyConsumption[month]?.toLocaleString() ?? 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


export const ZoneAnalysisView: React.FC<ZoneAnalysisViewProps> = ({ data, selectedMonth }) => {
    const zones = Object.keys(data.zoneMonthlyCalculations[selectedMonth] || {});
    const [selectedZone, setSelectedZone] = useState(zones[0] || '');

    const zoneData = data.zoneMonthlyCalculations[selectedMonth]?.[selectedZone];

    const exportData = () => {
        if (!zoneData) return;
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Meter Label,Account Number,Type,Level,Consumption (m³)\n"
            + zoneData.meters.map(meter => 
                `${meter.meterLabel},${meter.accountNumber},${meter.type},${meter.level},${meter.monthlyConsumption[selectedMonth] || 0}`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `zone-analysis-${selectedZone}-${selectedMonth}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const chartData: DoughnutChartData | null = zoneData ? {
        labels: ['Billed Consumption', 'Unbilled Loss'],
        datasets: [{
            data: [zoneData.consumption, zoneData.loss],
            backgroundColor: ['#3b82f6', '#ef4444'],
            hoverBackgroundColor: ['#2563eb', '#dc2626'],
            borderColor: '#ffffff',
            borderWidth: 2,
        }]
    } : null;

    const formattedChartData = chartData ? chartData.labels.map((label, index) => ({
        name: label,
        value: chartData.datasets[0].data[index],
    })) : [];

    if (!zoneData) {
        return <div className="p-6 text-center text-slate-500">Please select a month and zone to see data.</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Zone Analysis</h2>
                <motion.button
                    onClick={exportData}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export
                </motion.button>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
                 <label htmlFor="zone-select" className="text-sm font-medium text-slate-600 mb-1">Select Zone:</label>
                <select id="zone-select" value={selectedZone} onChange={e => setSelectedZone(e.target.value)} className="w-full md:w-1/3 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    {zones.map(zone => <option key={zone} value={zone}>{zone}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 lg:col-span-1 h-96">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Consumption vs Loss</h3>
                    {chartData && (
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Tooltip formatter={(value: number) => `${value.toLocaleString()} m³`} />
                                <Legend />
                                <Pie data={formattedChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                    {formattedChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={chartData.datasets[0].backgroundColor[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 lg:col-span-2">
                     <h3 className="text-lg font-semibold text-slate-700 mb-4">Zone Summary for {selectedZone}</h3>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
                        <div><p className="text-sm text-slate-500">Billed Consumption</p><p className="text-2xl font-bold text-slate-700">{zoneData.consumption.toLocaleString()} m³</p></div>
                        <div><p className="text-sm text-slate-500">Water Loss</p><p className="text-2xl font-bold text-red-500">{zoneData.loss.toLocaleString()} m³</p></div>
                        <div><p className="text-sm text-slate-500">Loss %</p><p className="text-2xl font-bold text-red-500">{((zoneData.loss / (zoneData.consumption + zoneData.loss)) * 100).toFixed(1)}%</p></div>
                        <div><p className="text-sm text-slate-500">Total Meters</p><p className="text-2xl font-bold text-slate-700">{zoneData.meters.length}</p></div>
                    </div>
                     <h3 className="text-lg font-semibold text-slate-700 mb-2 mt-6">Individual Meters</h3>
                    <ZoneMetersTable meters={zoneData.meters} month={selectedMonth} />
                </div>
            </div>
        </div>
    );
};
