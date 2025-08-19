import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import type { WaterSystemData, DoughnutChartData, BarChartData } from '../../../types';

interface ConsumptionByTypeViewProps {
    data: WaterSystemData;
    selectedMonth: string;
}

export const ConsumptionByTypeView: React.FC<ConsumptionByTypeViewProps> = ({ data, selectedMonth }) => {
    const monthlyConsumptionData = data.consumptionByType[selectedMonth];
    if (!monthlyConsumptionData) return <div>No data for selected month.</div>;

    const sortedTypes = Object.entries(monthlyConsumptionData).sort(([, a], [, b]) => b - a);
    const totalConsumption = sortedTypes.reduce((sum, [, value]) => sum + value, 0);

    const exportData = () => {
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Type," + data.months.join(",") + ",Total,% of Total\n"
            + sortedTypes.map(([type]) => {
                const monthlyValues = data.months.map(month => data.consumptionByType[month]?.[type] || 0);
                const typeTotal = monthlyValues.reduce((sum, val) => sum + val, 0);
                const percentage = ((monthlyValues.find((_, i) => data.months[i] === selectedMonth) || 0) / totalConsumption * 100).toFixed(1);
                return `${type},${monthlyValues.join(",")},${typeTotal},${percentage}%`;
            }).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `consumption-by-type-${selectedMonth}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const prepareBarChartData = (): BarChartData => {
        const recentMonths = data.months.slice(-3);
        return {
            labels: sortedTypes.map(([type]) => type),
            datasets: recentMonths.map((month, index) => ({
                label: month,
                data: sortedTypes.map(([type]) => data.consumptionByType[month]?.[type] || 0),
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'][index] || '#6b7280'
            }))
        };
    };

    const barChartData = prepareBarChartData();
    const formattedBarData = barChartData.labels.map((label, index) => {
        const dataPoint: { name: string; [key: string]: string | number } = { name: label };
        barChartData.datasets.forEach(dataset => {
            dataPoint[dataset.label] = dataset.data[index];
        });
        return dataPoint;
    });

    const chartData: DoughnutChartData = {
        labels: sortedTypes.map(([type]) => type),
        datasets: [{
            data: sortedTypes.map(([, value]) => value),
            backgroundColor: ['#3b82f6', '#10b981', '#f97316', '#6b7280', '#ef4444', '#8b5cf6', '#eab308'],
            hoverBackgroundColor: [],
            borderColor: '#ffffff',
            borderWidth: 2,
        }]
    };

    const formattedChartData = chartData.labels.map((label, index) => ({
        name: label,
        value: chartData.datasets[0].data[index],
    }));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Consumption by Type</h2>
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
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Monthly and total consumption for each category.</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left">TYPE</th>
                                {data.months.slice(-3).map(month => (
                                    <th key={month} className="px-4 py-3 text-right">{month.toUpperCase()}</th>
                                ))}
                                <th className="px-4 py-3 text-right">TOTAL (M³)</th>
                                <th className="px-4 py-3 text-right">% OF LI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTypes.map(([type, currentValue]) => {
                                const recentMonths = data.months.slice(-3);
                                const typeTotal = data.months.reduce((sum, month) => sum + (data.consumptionByType[month]?.[type] || 0), 0);
                                const percentage = ((currentValue / totalConsumption) * 100);
                                return (
                                    <tr key={type} className="border-b hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium text-slate-800">{type}</td>
                                        {recentMonths.map(month => (
                                            <td key={month} className="px-4 py-3 text-right font-mono">
                                                {(data.consumptionByType[month]?.[type] || 0).toLocaleString()}
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 text-right font-mono font-semibold">{typeTotal.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right font-semibold">{percentage.toFixed(1)}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 h-96"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Monthly Consumption by Type</h3>
                    <p className="text-sm text-slate-500 mb-4">Total consumption for each category.</p>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={formattedBarData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip formatter={(value: number) => `${value.toLocaleString()} m³`} />
                            <Legend />
                            {barChartData.datasets.map(dataset => (
                                <Bar
                                    key={dataset.label}
                                    dataKey={dataset.label}
                                    fill={dataset.backgroundColor}
                                    radius={[2, 2, 0, 0]}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 h-96"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Consumption Distribution</h3>
                    <p className="text-sm text-slate-500 mb-4">Percentage of total consumption by type.</p>
                    <ResponsiveContainer width="100%" height="85%">
                    <PieChart>
                        <Tooltip formatter={(value: number) => `${value.toLocaleString()} m³`} />
                        <Legend />
                        <Pie 
                            data={formattedChartData} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={100} 
                            fill="#8884d8"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            labelLine={false}
                        >
                           {formattedChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={chartData.datasets[0].backgroundColor[index % chartData.datasets[0].backgroundColor.length]} />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
};
