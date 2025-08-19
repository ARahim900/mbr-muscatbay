
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DoughnutChartData } from '../../types';

interface DoughnutChartCardProps {
    data: DoughnutChartData;
    title: string;
}

const formatChartData = (chartData: DoughnutChartData) => {
    const { labels, datasets } = chartData;
    if (!datasets[0]) return [];
    return labels.map((label, index) => ({
        name: label,
        value: datasets[0].data[index],
    }));
};

export const DoughnutChartCard: React.FC<DoughnutChartCardProps> = ({ data, title }) => {
    const chartData = formatChartData(data);
    const colors = ['#A2D0C8', '#81D8D0', '#9E9AA7', '#FF8B8B', '#65D6AD'];

    return (
        <motion.div 
            className="group bg-white dark:bg-[#2C2834] p-4 rounded-lg border border-[#E0E0E0]/60 dark:border-white/5 h-80 shadow-card hover:shadow-card-hover hover:border-[#A2D0C8]/30 transition-all duration-200 relative overflow-hidden"
            whileHover={{ 
                y: -1,
                scale: 1.005,
                transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 25 }
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
        >
            {/* Subtle accent border */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#A2D0C8] to-[#81D8D0] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#4E4456] dark:text-white">{title}</h3>
                <div className="text-xs text-[#9E9AA7] bg-[#A2D0C8]/10 px-2 py-1 rounded-full">
                    Total
                </div>
            </div>
            <ResponsiveContainer width="100%" height="calc(100% - 2rem)">
                <PieChart>
                    <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Percentage']}
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                            fontSize: '12px'
                        }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="45%"
                        innerRadius="55%"
                        outerRadius="85%"
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </motion.div>
    );
};
