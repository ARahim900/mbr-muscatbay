import React, { useState, useMemo } from 'react';
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';
import { WaterMeter } from '../../../src/lib/supabase';

interface ConsumptionByTypeTabProps {
  meters: WaterMeter[];
}

export const ConsumptionByTypeTab: React.FC<ConsumptionByTypeTabProps> = ({ meters }) => {
  const [selectedType, setSelectedType] = useState('Commercial');
  const [dateRange, setDateRange] = useState({ start: 'jan_25', end: 'mar_25' });

  const months = ['jan_25', 'feb_25', 'mar_25', 'apr_25', 'may_25', 'jun_25'];
  const monthLabels = ['Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25'];

  const types = ['Commercial', 'Residential', 'Irrigation', 'Common'];
  const typeColors = {
    Commercial: '#10B981',
    Residential: '#3B82F6',
    Irrigation: '#F97316',
    Common: '#8B5CF6'
  };

  // Get relevant months for calculation
  const getRelevantMonths = () => {
    const startIndex = months.indexOf(dateRange.start);
    const endIndex = months.indexOf(dateRange.end);
    return months.slice(startIndex, endIndex + 1);
  };

  // Consumption by type calculations
  const consumptionAnalysis = useMemo(() => {
    const relevantMonths = getRelevantMonths();
    
    const getMonthValue = (meter: WaterMeter, month: string) => {
      return (meter as any)[month] || 0;
    };

    // Calculate total consumption for selected type and period
    const selectedTypeMeters = meters.filter(m => m.type === selectedType);
    const totalConsumption = selectedTypeMeters.reduce((sum, meter) => {
      return sum + relevantMonths.reduce((monthSum, month) => {
        return monthSum + getMonthValue(meter, month);
      }, 0);
    }, 0);

    const monthlyAverage = relevantMonths.length > 0 ? totalConsumption / relevantMonths.length : 0;
    
    // Find peak month
    const monthlyTotals = relevantMonths.map(month => {
      const monthTotal = selectedTypeMeters.reduce((sum, meter) => sum + getMonthValue(meter, month), 0);
      return { month, total: monthTotal };
    });
    const peakMonth = monthlyTotals.reduce((max, current) => current.total > max.total ? current : max, monthlyTotals[0] || { month: '', total: 0 });

    // Calculate percentage of L1 supply
    const l1Total = meters.filter(m => m.label === 'L1').reduce((sum, meter) => {
      return sum + relevantMonths.reduce((monthSum, month) => {
        return monthSum + getMonthValue(meter, month);
      }, 0);
    }, 0);

    const percentageOfL1 = l1Total > 0 ? (totalConsumption / l1Total) * 100 : 0;

    return {
      totalConsumption,
      monthlyAverage,
      peakMonth,
      percentageOfL1
    };
  }, [meters, selectedType, dateRange]);

  // Monthly trend data for selected type
  const trendData = useMemo(() => {
    const selectedTypeMeters = meters.filter(m => m.type === selectedType);
    
    return months.map((month, index) => {
      const monthTotal = selectedTypeMeters.reduce((sum, meter) => sum + ((meter as any)[month] || 0), 0);
      return {
        month: monthLabels[index],
        consumption: monthTotal
      };
    });
  }, [meters, selectedType]);

  // Consumption by type table data
  const typeTableData = useMemo(() => {
    const relevantMonths = getRelevantMonths();
    
    return types.map(type => {
      const typeMeters = meters.filter(m => m.type === type);
      const totalConsumption = typeMeters.reduce((sum, meter) => {
        return sum + relevantMonths.reduce((monthSum, month) => {
          return monthSum + ((meter as any)[month] || 0);
        }, 0);
      }, 0);

      return {
        type,
        totalConsumption,
        meterCount: typeMeters.length
      };
    });
  }, [meters, dateRange]);

  // Monthly breakdown bar chart data
  const monthlyBreakdownData = useMemo(() => {
    const relevantMonths = getRelevantMonths();
    
    return relevantMonths.map((month, index) => {
      const monthData: any = { month: monthLabels[months.indexOf(month)] };
      
      types.forEach(type => {
        const typeMeters = meters.filter(m => m.type === type);
        const monthTotal = typeMeters.reduce((sum, meter) => sum + ((meter as any)[month] || 0), 0);
        monthData[type] = monthTotal;
      });
      
      return monthData;
    });
  }, [meters, dateRange]);

  // Pie chart data for type distribution
  const pieData = useMemo(() => {
    return typeTableData.map(item => ({
      name: item.type,
      value: item.totalConsumption,
      color: typeColors[item.type as keyof typeof typeColors]
    }));
  }, [typeTableData]);

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Type Filter Buttons */}
          <div className="flex items-center space-x-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedType === type ? typeColors[type as keyof typeof typeColors] : undefined
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Date Range:</span>
            <select 
              value={dateRange.start} 
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {months.map((month, index) => (
                <option key={month} value={month}>{monthLabels[index]}</option>
              ))}
            </select>
            <span className="text-gray-500">to</span>
            <select 
              value={dateRange.end} 
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {months.map((month, index) => (
                <option key={month} value={month}>{monthLabels[index]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">TOTAL CONSUMPTION</div>
          <div className="text-2xl font-bold text-gray-900">{consumptionAnalysis.totalConsumption.toLocaleString()} m³</div>
          <div className="text-xs text-gray-500">{selectedType} total for period</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">MONTHLY AVERAGE</div>
          <div className="text-2xl font-bold text-blue-600">{Math.round(consumptionAnalysis.monthlyAverage).toLocaleString()} m³/month</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">PEAK MONTH</div>
          <div className="text-2xl font-bold text-orange-600">{monthLabels[months.indexOf(consumptionAnalysis.peakMonth?.month || 'jan_25')]}</div>
          <div className="text-xs text-gray-500">({consumptionAnalysis.peakMonth?.total.toLocaleString()} m³)</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">% OF L1 SUPPLY</div>
          <div className="text-2xl font-bold text-purple-600">{consumptionAnalysis.percentageOfL1.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">{selectedType} share of total</div>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend for {selectedType}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={typeColors[selectedType as keyof typeof typeColors]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={typeColors[selectedType as keyof typeof typeColors]} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} m³`, selectedType]} />
              <Area
                type="monotone"
                dataKey="consumption"
                stroke={typeColors[selectedType as keyof typeof typeColors]}
                fillOpacity={1}
                fill="url(#colorConsumption)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Consumption by Type Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Consumption by Type</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Consumption (m³)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Meter Count</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {typeTableData.map((item) => (
                <tr key={item.type} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.totalConsumption.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.meterCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Consumption Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Consumption Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} m³`, '']} />
                <Legend />
                {types.map(type => (
                  <Bar
                    key={type}
                    dataKey={type}
                    fill={typeColors[type as keyof typeof typeColors]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Type Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Type Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} m³`, '']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};