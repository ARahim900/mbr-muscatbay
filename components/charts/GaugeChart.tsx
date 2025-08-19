import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface GaugeChartProps {
  value: number;
  max?: number;
  title?: string;
  subtitle?: string;
  height?: number;
  showPercentage?: boolean;
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  max = 100,
  title,
  subtitle,
  height = 200,
  showPercentage = true
}) => {
  const percentage = (value / max) * 100;
  
  // Determine color based on percentage
  const getColor = (percent: number) => {
    if (percent >= 80) return '#4CAF50'; // Green
    if (percent >= 60) return '#FFC107'; // Yellow
    if (percent >= 40) return '#FFA500'; // Orange
    return '#FF6B6B'; // Red
  };

  const color = getColor(percentage);
  
  // Data for the gauge
  const data = [
    { name: 'Value', value: percentage, fill: color },
    { name: 'Remaining', value: 100 - percentage, fill: 'transparent' }
  ];

  // Background arc
  const backgroundData = [
    { name: 'Background', value: 100, fill: '#E5E7EB' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center"
    >
      {title && (
        <h3 className="text-lg font-semibold text-[#4E4456] dark:text-white mb-2">{title}</h3>
      )}
      
      <div className="relative" style={{ height, width: height * 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Background arc */}
            <Pie
              data={backgroundData}
              cx="50%"
              cy="66%"
              startAngle={180}
              endAngle={0}
              innerRadius={height / 3}
              outerRadius={height / 2.5}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="#E5E7EB" className="dark:opacity-20" />
            </Pie>
            
            {/* Value arc */}
            <Pie
              data={data}
              cx="50%"
              cy="66%"
              startAngle={180}
              endAngle={0}
              innerRadius={height / 3}
              outerRadius={height / 2.5}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
              animationBegin={0}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill}
                  style={{
                    filter: entry.fill !== 'transparent' ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' : 'none'
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingTop: height / 6 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <div className="text-3xl font-bold" style={{ color }}>
              {showPercentage ? `${Math.round(percentage)}%` : value}
            </div>
            {subtitle && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Excellent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Good</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Fair</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Poor</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GaugeChart;