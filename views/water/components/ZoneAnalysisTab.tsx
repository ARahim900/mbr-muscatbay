import React, { useState, useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { WaterMeter } from '../../../src/lib/supabase';

interface ZoneAnalysisTabProps {
  meters: WaterMeter[];
}

export const ZoneAnalysisTab: React.FC<ZoneAnalysisTabProps> = ({ meters }) => {
  const [selectedMonth, setSelectedMonth] = useState('mar_25');
  const [selectedZone, setSelectedZone] = useState('Zone 03(A)');

  const months = ['jan_25', 'feb_25', 'mar_25', 'apr_25', 'may_25', 'jun_25'];
  const monthLabels = ['Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25'];

  // Get unique zones
  const zones = useMemo(() => {
    const uniqueZones = [...new Set(meters.map(m => m.zone).filter(Boolean))];
    return uniqueZones.sort();
  }, [meters]);

  // Zone analysis calculations
  const zoneAnalysis = useMemo(() => {
    const zoneMeters = meters.filter(m => m.zone === selectedZone);
    const zoneBulkMeter = zoneMeters.find(m => m.label === 'L2');
    const individualMeters = zoneMeters.filter(m => m.label !== 'L2');

    const getMonthValue = (meter: WaterMeter, month: string) => {
      return (meter as any)[month] || 0;
    };

    const zoneBulkValue = zoneBulkMeter ? getMonthValue(zoneBulkMeter, selectedMonth) : 0;
    const individualSum = individualMeters.reduce((sum, m) => sum + getMonthValue(m, selectedMonth), 0);
    const waterLoss = zoneBulkValue - individualSum;
    const lossPercentage = zoneBulkValue > 0 ? (waterLoss / zoneBulkValue) * 100 : 0;
    const efficiency = zoneBulkValue > 0 ? (individualSum / zoneBulkValue) * 100 : 0;

    return {
      zoneBulkValue,
      individualSum,
      waterLoss,
      lossPercentage,
      efficiency,
      zoneMeters: individualMeters
    };
  }, [meters, selectedZone, selectedMonth]);

  // Monthly trend data
  const trendData = useMemo(() => {
    return months.map((month, index) => {
      const zoneMeters = meters.filter(m => m.zone === selectedZone);
      const zoneBulkMeter = zoneMeters.find(m => m.label === 'L2');
      const individualMeters = zoneMeters.filter(m => m.label !== 'L2');

      const getMonthValue = (meter: WaterMeter, month: string) => {
        return (meter as any)[month] || 0;
      };

      const zoneBulkValue = zoneBulkMeter ? getMonthValue(zoneBulkMeter, month) : 0;
      const individualSum = individualMeters.reduce((sum, m) => sum + getMonthValue(m, month), 0);

      return {
        month: monthLabels[index],
        'Zone Bulk': zoneBulkValue,
        'Individual Meters': individualSum,
        'Water Loss': Math.max(0, zoneBulkValue - individualSum)
      };
    });
  }, [meters, selectedZone]);

  // Circular progress component
  const CircularProgress: React.FC<{ value: number; max: number; label: string; color: string; unit?: string }> = 
    ({ value, max, label, color, unit = 'm³' }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">
                {value.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">{unit}</div>
              <div className="text-sm font-medium" style={{ color }}>
                ({percentage.toFixed(0)}%)
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm font-medium text-gray-600 text-center">{label}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Select Month:</label>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {months.map((month, index) => (
                <option key={month} value={month}>{monthLabels[index]}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Filter by Zone:</label>
            <select 
              value={selectedZone} 
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {zones.map(zone => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Zone Analysis Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{selectedZone} Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <CircularProgress 
            value={zoneAnalysis.zoneBulkValue}
            max={zoneAnalysis.zoneBulkValue}
            label="Zone Bulk Meter"
            color="#3B82F6"
          />
          
          <CircularProgress 
            value={zoneAnalysis.individualSum}
            max={zoneAnalysis.zoneBulkValue}
            label="Individual Meters Sum"
            color="#10B981"
          />
          
          <CircularProgress 
            value={zoneAnalysis.waterLoss}
            max={zoneAnalysis.zoneBulkValue}
            label="Water Loss"
            color="#EF4444"
          />
        </div>
      </div>

      {/* Zone Consumption Trend */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Zone Consumption Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorZoneBulk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorIndividual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} m³`, '']} />
              <Area
                type="monotone"
                dataKey="Zone Bulk"
                stackId="1"
                stroke="#3B82F6"
                fill="url(#colorZoneBulk)"
              />
              <Area
                type="monotone"
                dataKey="Individual Meters"
                stackId="2"
                stroke="#10B981"
                fill="url(#colorIndividual)"
              />
              <Area
                type="monotone"
                dataKey="Water Loss"
                stackId="3"
                stroke="#EF4444"
                fill="url(#colorLoss)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">ZONE BULK METER</div>
          <div className="text-2xl font-bold text-blue-600">{zoneAnalysis.zoneBulkValue.toLocaleString()} m³</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">INDIVIDUAL METERS TOTAL</div>
          <div className="text-2xl font-bold text-green-600">{zoneAnalysis.individualSum.toLocaleString()} m³</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">WATER LOSS/VARIANCE</div>
          <div className="text-2xl font-bold text-red-600">{zoneAnalysis.waterLoss.toLocaleString()} m³</div>
          <div className="text-xs text-red-500">({zoneAnalysis.lossPercentage.toFixed(1)}% variance)</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">ZONE EFFICIENCY</div>
          <div className="text-2xl font-bold text-purple-600">{zoneAnalysis.efficiency.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">(Meter coverage)</div>
        </div>
      </div>

      {/* Individual Meters Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Individual Meters in {selectedZone}</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meter Label</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Consumption (m³)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {zoneAnalysis.zoneMeters.map((meter) => (
                <tr key={meter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meter.meter_label}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meter.account_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meter.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      meter.label === 'L1' ? 'bg-blue-100 text-blue-800' :
                      meter.label === 'L2' ? 'bg-green-100 text-green-800' :
                      meter.label === 'L3' ? 'bg-orange-100 text-orange-800' :
                      meter.label === 'L4' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {meter.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {((meter as any)[selectedMonth] || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};