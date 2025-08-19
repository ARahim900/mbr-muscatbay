import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface EnhancedBarChartProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  title?: string;
  color?: string;
  multiColor?: boolean;
  horizontal?: boolean;
  height?: number;
}

const EnhancedBarChart: React.FC<EnhancedBarChartProps> = ({
  data,
  dataKey,
  xAxisKey,
  title,
  color = '#B0E0E6',
  multiColor = false,
  horizontal = false,
  height = 300
}) => {
  const colors = ['#B0E0E6', '#9fd4da', '#8fc8cf', '#7ebcc4', '#6eb0b9'];
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl border border-white/10">
          <p className="text-xs font-medium mb-1">{label}</p>
          <p className="text-sm font-bold text-[#B0E0E6]">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const ChartComponent = horizontal ? (
    <BarChart 
      data={data} 
      layout="horizontal"
      margin={{ top: 10, right: 10, left: 60, bottom: 10 }}
    >
      <CartesianGrid 
        strokeDasharray="0" 
        stroke="transparent" 
        horizontal={!horizontal}
      />
      <XAxis 
        type="number"
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#9CA3AF', fontSize: 12 }}
      />
      <YAxis 
        dataKey={xAxisKey}
        type="category"
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#9CA3AF', fontSize: 12 }}
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(176, 224, 230, 0.1)' }} />
      <Bar 
        dataKey={dataKey} 
        radius={[0, 4, 4, 0]}
        animationDuration={1000}
        animationBegin={0}
      >
        {multiColor && data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
        {!multiColor && <Cell fill={color} />}
      </Bar>
    </BarChart>
  ) : (
    <BarChart 
      data={data} 
      margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
    >
      <CartesianGrid 
        strokeDasharray="0" 
        stroke="transparent" 
        vertical={false}
      />
      <XAxis 
        dataKey={xAxisKey}
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#9CA3AF', fontSize: 12 }}
        dy={10}
      />
      <YAxis 
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#9CA3AF', fontSize: 12 }}
        dx={-10}
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(176, 224, 230, 0.1)' }} />
      <Bar 
        dataKey={dataKey} 
        radius={[4, 4, 0, 0]}
        animationDuration={1000}
        animationBegin={0}
      >
        {multiColor && data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
        {!multiColor && <Cell fill={color} />}
      </Bar>
    </BarChart>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {title && (
        <h3 className="text-lg font-semibold text-[#4E4456] dark:text-white mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {ChartComponent}
      </ResponsiveContainer>
    </motion.div>
  );
};

export default EnhancedBarChart;