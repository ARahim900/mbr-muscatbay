
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartData } from '../../types';

interface LineChartCardProps {
    data: ChartData;
    title: string;
}

const formatChartData = (chartData: ChartData) => {
    const { labels, datasets } = chartData;
    const formattedData = labels.map((label, index) => {
        const dataPoint: { name: string; [key: string]: string | number } = { name: label };
        datasets.forEach(dataset => {
            dataPoint[dataset.label] = dataset.data[index];
        });
        return dataPoint;
    });
    return formattedData;
};

export const LineChartCard: React.FC<LineChartCardProps> = ({ data, title }) => {
    const chartData = formatChartData(data);

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
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[#A2D0C8] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#81D8D0] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#9E9AA7] rounded-full"></div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="calc(100% - 2rem)">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="2 2" stroke="#E0E0E0" opacity={0.3} />
                    <XAxis 
                        dataKey="name" 
                        stroke="#9E9AA7" 
                        fontSize={11} 
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#9E9AA7" 
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                            fontSize: '12px'
                        }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    {data.datasets.map((dataset, index) => (
                        <Line
                            key={dataset.label}
                            type="monotone"
                            dataKey={dataset.label}
                            stroke={index === 0 ? '#A2D0C8' : index === 1 ? '#81D8D0' : '#9E9AA7'}
                            strokeWidth={2.5}
                            dot={{ r: 3, strokeWidth: 0 }}
                            activeDot={{ r: 5, stroke: '#A2D0C8', strokeWidth: 2 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
};
