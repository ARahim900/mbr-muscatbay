
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BarChartData } from '../../types';

interface BarChartCardProps {
    data: BarChartData;
    title: string;
}

const formatChartData = (chartData: BarChartData) => {
    const { labels, datasets } = chartData;
    return labels.map((label, index) => {
        const dataPoint: { name: string; [key: string]: string | number } = { name: label };
        datasets.forEach(dataset => {
            dataPoint[dataset.label] = dataset.data[index];
        });
        return dataPoint;
    });
};

export const BarChartCard: React.FC<BarChartCardProps> = ({ data, title }) => {
    const chartData = formatChartData(data);

    return (
        <motion.div 
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 h-80 transition-all duration-300 hover:shadow-lg"
            whileHover={{ 
                y: -2,
                transition: { duration: 0.2 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    {data.datasets.map(dataset => (
                        <Bar
                            key={dataset.label}
                            dataKey={dataset.label}
                            fill={dataset.backgroundColor}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};
