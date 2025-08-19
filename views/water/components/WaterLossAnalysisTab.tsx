import React, { useState, useMemo } from 'react';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { WaterMeter } from '../../../src/lib/supabase';

interface WaterLossAnalysisTabProps {
  meters: WaterMeter[];
}

export const WaterLossAnalysisTab: React.FC<WaterLossAnalysisTabProps> = ({ meters }) => {
  const [dateRange, setDateRange] = useState({ start: 'jan_25', end: 'may_25' });

  const months = ['jan_25', 'feb_25', 'mar_25', 'apr_25', 'may_25', 'jun_25'];
  const monthLabels = ['Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25'];

  // Calculate water flow analysis
  const calculations = useMemo(() => {
    const getMonthValue = (meter: WaterMeter, month: string) => {
      return (meter as any)[month] || 0;
    };

    // A1 - Main Source (L1)
    const A1 = months.reduce((sum, month) => {
      return sum + meters.filter(m => m.label === 'L1').reduce((mSum, m) => mSum + getMonthValue(m, month), 0);
    }, 0);

    // A2 - Zone Distribution (L2 + DC)
    const A2 = months.reduce((sum, month) => {
      return sum + meters.filter(m => m.label === 'L2' || m.label === 'DC').reduce((mSum, m) => mSum + getMonthValue(m, month), 0);
    }, 0);

    // A3 - Building Level (L3 + DC)
    const A3_Bulk = months.reduce((sum, month) => {
      return sum + meters.filter(m => m.label === 'L3' || m.label === 'DC').reduce((mSum, m) => mSum + getMonthValue(m, month), 0);
    }, 0);

    // A4 - End Users (L4 + L3 villas + DC)
    const A4 = months.reduce((sum, month) => {
      return sum + meters.filter(m => m.label === 'L4' || (m.label === 'L3' && m.type === 'Villa') || m.label === 'DC').reduce((mSum, m) => mSum + getMonthValue(m, month), 0);
    }, 0);

    // Losses
    const stage1Loss = A1 - A2;
    const stage2Loss = A2 - A4; // Updated calculation
    const stage3Loss = A3_Bulk - meters.filter(m => m.label === 'L4').reduce((sum, m) => {
      return sum + months.reduce((mSum, month) => mSum + getMonthValue(m, month), 0);
    }, 0);
    const totalLoss = stage1Loss + stage2Loss;

    // Percentages
    const stage1Percentage = A1 > 0 ? (stage1Loss / A1) * 100 : 0;
    const stage2Percentage = A2 > 0 ? (stage2Loss / A2) * 100 : 0;
    const stage3Percentage = A3_Bulk > 0 ? (stage3Loss / A3_Bulk) * 100 : 0;
    const totalPercentage = A1 > 0 ? (totalLoss / A1) * 100 : 0;

    return {
      A1, A2, A3_Bulk, A4,
      stage1Loss, stage2Loss, stage3Loss, totalLoss,
      stage1Percentage, stage2Percentage, stage3Percentage, totalPercentage
    };
  }, [meters]);

  // Monthly consumption data for charts
  const monthlyData = useMemo(() => {
    return months.map((month, index) => {
      const total = meters.reduce((sum, meter) => sum + ((meter as any)[month] || 0), 0);
      const l1 = meters.filter(m => m.label === 'L1').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      const l2 = meters.filter(m => m.label === 'L2').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      const l3 = meters.filter(m => m.label === 'L3').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      const l4 = meters.filter(m => m.label === 'L4').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      
      return {
        month: monthLabels[index],
        total,
        L1: l1,
        L2: l2,
        L3: l3,
        L4: l4
      };
    });
  }, [meters]);

  const lossData = useMemo(() => {
    return months.map((month, index) => {
      const l1Total = meters.filter(m => m.label === 'L1').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      const l2Total = meters.filter(m => m.label === 'L2' || m.label === 'DC').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      const l4Total = meters.filter(m => m.label === 'L4').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      
      const stage1 = l1Total - l2Total;
      const stage2 = l2Total - l4Total;
      const stage3 = Math.max(0, stage2 * 0.1); // Approximation for stage 3
      
      return {
        month: monthLabels[index],
        'Stage 1': Math.max(0, stage1),
        'Stage 2': Math.max(0, stage2),
        'Stage 3': stage3
      };
    });
  }, [meters]);

  return (
    <div className="space-y-6">
      {/* Date Range Slider */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Date Range:</span>
          <div className="flex items-center space-x-4">
            <select 
              value={dateRange.start} 
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              {months.map((month, index) => (
                <option key={month} value={month}>{monthLabels[index]}</option>
              ))}
            </select>
            <span className="text-gray-500">to</span>
            <select 
              value={dateRange.end} 
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              {months.map((month, index) => (
                <option key={month} value={month}>{monthLabels[index]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Top Flow Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">A1 - MAIN SOURCE (L1)</div>
          <div className="text-2xl font-bold text-blue-600">{calculations.A1.toLocaleString()} m³</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">A2 - ZONE DISTRIBUTION</div>
          <div className="text-2xl font-bold text-green-600">{calculations.A2.toLocaleString()} m³</div>
          <div className="text-xs text-gray-500">L2 Zone Bulk + Direct</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">A3 - BUILDING LEVEL</div>
          <div className="text-2xl font-bold text-orange-600">{calculations.A3_Bulk.toLocaleString()} m³</div>
          <div className="text-xs text-gray-500">L3 Buildings + Villas</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">A4 - END USERS</div>
          <div className="text-2xl font-bold text-purple-600">{calculations.A4.toLocaleString()} m³</div>
          <div className="text-xs text-gray-500">L4 Apartments + L3 End</div>
        </div>
      </div>

      {/* Loss Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <div className="text-sm font-medium text-gray-500">STAGE 1 LOSS (A1→A2)</div>
          <div className="text-2xl font-bold text-red-600">{calculations.stage1Loss.toLocaleString()} m³</div>
          <div className="text-xs text-red-500">Main Distribution: {calculations.stage1Percentage.toFixed(1)}%</div>
        </div>
        
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <div className="text-sm font-medium text-gray-500">STAGE 2 LOSS (L2→L3)</div>
          <div className="text-2xl font-bold text-red-600">{calculations.stage2Loss.toLocaleString()} m³</div>
          <div className="text-xs text-red-500">Zone Networks: {calculations.stage2Percentage.toFixed(1)}%</div>
        </div>
        
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <div className="text-sm font-medium text-gray-500">STAGE 3 LOSS (A3→A4)</div>
          <div className="text-2xl font-bold text-red-600">{calculations.stage3Loss.toLocaleString()} m³</div>
          <div className="text-xs text-red-500">Building Networks: {calculations.stage3Percentage.toFixed(1)}%</div>
        </div>
        
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <div className="text-sm font-medium text-gray-500">TOTAL SYSTEM LOSS</div>
          <div className="text-2xl font-bold text-red-600">{calculations.totalLoss.toLocaleString()} m³</div>
          <div className="text-xs text-red-500">Overall: {calculations.totalPercentage.toFixed(1)}%</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Consumption Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Consumption Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} m³`, '']} />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Water Loss Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Water Loss Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} m³`, '']} />
                <Legend />
                <Line type="monotone" dataKey="Stage 1" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="Stage 2" stroke="#F97316" strokeWidth={2} />
                <Line type="monotone" dataKey="Stage 3" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};