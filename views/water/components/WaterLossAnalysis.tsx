import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import type { WaterSystemData } from '../../../types';

interface WaterLossAnalysisViewProps {
    data: WaterSystemData;
    selectedMonth: string;
}

export const WaterLossAnalysisView: React.FC<WaterLossAnalysisViewProps> = ({ data, selectedMonth }) => {
    const monthlyCalcs = data.monthlyCalculations;
    
    const lossData = data.months.map(month => {
        const calc = monthlyCalcs[month];
        return {
            month,
            stage1Loss: calc?.stage1Loss || 0,
            stage2Loss: calc?.stage2Loss || 0,
            stage3Loss: calc?.stage3Loss || 0,
            totalLoss: calc?.totalLoss || 0,
            efficiency: calc?.systemEfficiency || 0
        };
    });

    const currentMonthData = monthlyCalcs[selectedMonth];

    const exportData = () => {
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Month,Stage 1 Loss,Stage 2 Loss,Stage 3 Loss,Total Loss,System Efficiency\n"
            + lossData.map(row => 
                `${row.month},${row.stage1Loss},${row.stage2Loss},${row.stage3Loss},${row.totalLoss},${row.efficiency}`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "water-loss-analysis.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Water Loss Analysis</h2>
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

            {/* Current Month Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div 
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="text-sm font-medium text-slate-600 mb-2">Stage 1 Loss</h3>
                    <p className="text-2xl font-bold text-red-600">{currentMonthData?.stage1Loss?.toLocaleString() || 0} m³</p>
                </motion.div>
                <motion.div 
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <h3 className="text-sm font-medium text-slate-600 mb-2">Stage 2 Loss</h3>
                    <p className="text-2xl font-bold text-orange-600">{currentMonthData?.stage2Loss?.toLocaleString() || 0} m³</p>
                </motion.div>
                <motion.div 
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <h3 className="text-sm font-medium text-slate-600 mb-2">Stage 3 Loss</h3>
                    <p className="text-2xl font-bold text-yellow-600">{currentMonthData?.stage3Loss?.toLocaleString() || 0} m³</p>
                </motion.div>
                <motion.div 
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    <h3 className="text-sm font-medium text-slate-600 mb-2">System Efficiency</h3>
                    <p className="text-2xl font-bold text-green-600">{currentMonthData?.systemEfficiency?.toFixed(1) || 0}%</p>
                </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Water Loss Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lossData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip formatter={(value: number) => `${value.toLocaleString()} m³`} />
                            <Legend />
                            <Line type="monotone" dataKey="stage1Loss" stroke="#ef4444" name="Stage 1" strokeWidth={2} />
                            <Line type="monotone" dataKey="stage2Loss" stroke="#f97316" name="Stage 2" strokeWidth={2} />
                            <Line type="monotone" dataKey="stage3Loss" stroke="#eab308" name="Stage 3" strokeWidth={2} />
                            <Line type="monotone" dataKey="totalLoss" stroke="#6b7280" name="Total Loss" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">System Efficiency Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lossData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                            <Line type="monotone" dataKey="efficiency" stroke="#10b981" name="Efficiency" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
};
