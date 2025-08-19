import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { WaterMeter } from '../../../src/lib/supabase';

interface OverviewTabProps {
  meters: WaterMeter[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ meters }) => {
  const [dateRange, setDateRange] = useState({ start: 'jan_25', end: 'may_25' });
  const [isAnimating, setIsAnimating] = useState(false);

  const months = ['jan_25', 'feb_25', 'mar_25', 'apr_25', 'may_25', 'jun_25'];
  const monthLabels = ['Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25'];

  // Get relevant months for calculation
  const getRelevantMonths = () => {
    const startIndex = months.indexOf(dateRange.start);
    const endIndex = months.indexOf(dateRange.end);
    return months.slice(startIndex, endIndex + 1);
  };

  // Water distribution calculations
  const waterDistribution = useMemo(() => {
    const relevantMonths = getRelevantMonths();
    
    const getMonthValue = (meter: WaterMeter, month: string) => {
      return (meter as any)[month] || 0;
    };

    // A1 - Main Source (L1)
    const A1 = relevantMonths.reduce((sum, month) => {
      return sum + meters.filter(m => m.label === 'L1').reduce((mSum, m) => mSum + getMonthValue(m, month), 0);
    }, 0);

    // A2 - Zone Distribution (L2 + DC)
    const A2 = relevantMonths.reduce((sum, month) => {
      return sum + meters.filter(m => m.label === 'L2' || m.label === 'DC').reduce((mSum, m) => mSum + getMonthValue(m, month), 0);
    }, 0);

    // A3 - Building Level (L3 + DC)
    const A3 = relevantMonths.reduce((sum, month) => {
      return sum + meters.filter(m => m.label === 'L3' || m.label === 'DC').reduce((mSum, m) => mSum + getMonthValue(m, month), 0);
    }, 0);

    // A4 - End Users (L4 + L3 villas + DC)
    const A4 = relevantMonths.reduce((sum, month) => {
      return sum + meters.filter(m => m.label === 'L4' || (m.label === 'L3' && m.type === 'Villa') || m.label === 'DC').reduce((mSum, m) => mSum + getMonthValue(m, month), 0);
    }, 0);

    return { A1, A2, A3, A4 };
  }, [meters, dateRange]);

  // Water loss calculations
  const waterLoss = useMemo(() => {
    const { A1, A2, A3, A4 } = waterDistribution;
    
    const stage1Loss = A1 - A2;
    const stage2Loss = A2 - A4;
    const stage3Loss = A3 - A4;
    const totalLoss = stage1Loss + stage2Loss;

    const stage1Percentage = A1 > 0 ? (stage1Loss / A1) * 100 : 0;
    const stage2Percentage = A2 > 0 ? (stage2Loss / A2) * 100 : 0;
    const stage3Percentage = A3 > 0 ? (stage3Loss / A3) * 100 : 0;
    const totalPercentage = A1 > 0 ? (totalLoss / A1) * 100 : 0;

    return {
      stage1Loss, stage2Loss, stage3Loss, totalLoss,
      stage1Percentage, stage2Percentage, stage3Percentage, totalPercentage
    };
  }, [waterDistribution]);

  // Monthly consumption data for charts
  const monthlyConsumptionData = useMemo(() => {
    return months.map((month, index) => {
      const l1 = meters.filter(m => m.label === 'L1').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      const l2 = meters.filter(m => m.label === 'L2').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      const l3 = meters.filter(m => m.label === 'L3').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      
      return {
        month: monthLabels[index],
        'L1 - Main Source': l1,
        'L2 - Zone Bulk Meters': l2,
        'L3 - Building/Villa Meters': l3
      };
    });
  }, [meters]);

  // Monthly water loss data for charts
  const monthlyLossData = useMemo(() => {
    return months.map((month, index) => {
      const l1Total = meters.filter(m => m.label === 'L1').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      const l2Total = meters.filter(m => m.label === 'L2' || m.label === 'DC').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      const l4Total = meters.filter(m => m.label === 'L4').reduce((sum, m) => sum + ((m as any)[month] || 0), 0);
      
      const stage1 = Math.max(0, l1Total - l2Total);
      const stage2 = Math.max(0, l2Total - l4Total);
      const stage3 = Math.max(0, stage2 * 0.1);
      
      return {
        month: monthLabels[index],
        'Stage 1 Loss': stage1,
        'Stage 2 Loss': stage2,
        'Stage 3 Loss': stage3
      };
    });
  }, [meters]);

  const handleReset = () => {
    setIsAnimating(true);
    setDateRange({ start: 'jan_25', end: 'may_25' });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleAIAnalysis = () => {
    setIsAnimating(true);
    // Simulate AI analysis
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <motion.div 
      className="space-y-10 p-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Date Range Selector */}
      <motion.div 
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex items-center gap-6">
            <select 
              value={dateRange.start} 
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="px-5 py-3 border border-gray-300 rounded-xl body-base font-medium focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all duration-200 bg-white hover:border-brand-accent hover:border-opacity-50"
            >
              {months.map((month, index) => (
                <option key={month} value={month}>{monthLabels[index]}</option>
              ))}
            </select>
            <span className="text-gray-500 font-semibold body-base">to</span>
            <select 
              value={dateRange.end} 
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="px-5 py-3 border border-gray-300 rounded-xl body-base font-medium focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all duration-200 bg-white hover:border-brand-accent hover:border-opacity-50"
            >
              {months.map((month, index) => (
                <option key={month} value={month}>{monthLabels[index]}</option>
              ))}
            </select>
          </div>
          
          {/* Range Slider Visual */}
          <div className="flex-1 flex items-center px-6">
            <div className="w-full h-3 bg-gray-200 rounded-full relative">
              <div className="h-3 bg-brand-accent rounded-full" style={{ width: '60%' }}></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-brand-accent rounded-full shadow-md"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-brand-accent rounded-full shadow-md" style={{ left: '60%' }}></div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand-accent hover:bg-brand-accent-dark text-white px-8 py-3 rounded-xl body-base font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Range
            </motion.button>
            <motion.button
              onClick={handleAIAnalysis}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand-accent hover:bg-brand-accent-dark text-white px-8 py-3 rounded-xl body-base font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Analysis
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 4-Level Water Distribution Totals */}
      <motion.div 
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="heading-4 mb-8">
          4-Level Water Distribution Totals for{' '}
          <span className="text-brand-accent">
            {monthLabels[months.indexOf(dateRange.start)]} to {monthLabels[months.indexOf(dateRange.end)]}
          </span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-accent hover:border-opacity-20 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-brand-accent bg-opacity-10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="card-subtitle mb-1">A1 - MAIN SOURCE</div>
                <div className="caption mb-3">(L1)</div>
                <motion.div 
                  className="card-value text-brand-accent mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {waterDistribution.A1.toLocaleString()}
                </motion.div>
                <div className="card-unit mb-2">m³</div>
                <div className="card-description">Main Bulk (NAMA)</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-accent hover:border-opacity-20 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-brand-mint bg-opacity-20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-brand-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="card-subtitle mb-1">A2 - ZONE</div>
                <div className="caption mb-3">DISTRIBUTION</div>
                <motion.div 
                  className="card-value text-brand-mint mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {waterDistribution.A2.toLocaleString()}
                </motion.div>
                <div className="card-unit mb-2">m³</div>
                <div className="card-description">L2 Zone Bulk + Direct</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-accent hover:border-opacity-20 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-brand-ice-mint bg-opacity-20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-brand-ice-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="card-subtitle mb-1">A3 - BUILDING</div>
                <div className="caption mb-3">LEVEL</div>
                <motion.div 
                  className="card-value text-brand-ice-mint mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {waterDistribution.A3.toLocaleString()}
                </motion.div>
                <div className="card-unit mb-2">m³</div>
                <div className="card-description">L3 Buildings + Villas</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-accent hover:border-opacity-20 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-brand-primary bg-opacity-10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="card-subtitle mb-1">A4 - END USERS</div>
                <div className="caption mb-3">FINAL CONSUMPTION</div>
                <motion.div 
                  className="card-value text-brand-primary mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {waterDistribution.A4.toLocaleString()}
                </motion.div>
                <div className="card-unit mb-2">m³</div>
                <div className="card-description">L4 Apartments + L3 End</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Multi-Stage Water Loss Totals */}
      <motion.div 
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h3 className="heading-4 mb-8">
          Multi-Stage Water Loss Totals for{' '}
          <span className="text-brand-accent">
            {monthLabels[months.indexOf(dateRange.start)]} to {monthLabels[months.indexOf(dateRange.end)]}
          </span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-accent hover:border-opacity-20 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5C3.962 17.333 4.924 19 6.464 19z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="card-subtitle mb-1">STAGE 1 LOSS</div>
                <div className="caption mb-3">(A1→A2)</div>
                <motion.div 
                  className="card-value text-red-600 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {Math.max(0, waterLoss.stage1Loss).toLocaleString()}
                </motion.div>
                <div className="card-unit mb-2">m³</div>
                <div className="card-description text-red-600 font-medium">Main Distribution: {waterLoss.stage1Percentage.toFixed(1)}%</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-accent hover:border-opacity-20 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="card-subtitle mb-1">STAGE 2 LOSS</div>
                <div className="caption mb-3">(L2→L3)</div>
                <motion.div 
                  className="card-value text-orange-600 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {Math.max(0, waterLoss.stage2Loss).toLocaleString()}
                </motion.div>
                <div className="card-unit mb-2">m³</div>
                <div className="card-description text-orange-600 font-medium">Zone Networks: {waterLoss.stage2Percentage.toFixed(1)}%</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-accent hover:border-opacity-20 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="card-subtitle mb-1">STAGE 3 LOSS</div>
                <div className="caption mb-3">(A3→A4)</div>
                <motion.div 
                  className="card-value text-yellow-600 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  {Math.max(0, waterLoss.stage3Loss).toLocaleString()}
                </motion.div>
                <div className="card-unit mb-2">m³</div>
                <div className="card-description text-yellow-600 font-medium">Building Networks: {waterLoss.stage3Percentage.toFixed(1)}%</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-accent hover:border-opacity-20 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="card-subtitle mb-1">TOTAL SYSTEM</div>
                <div className="caption mb-3">LOSS</div>
                <motion.div 
                  className="card-value text-red-600 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  {Math.max(0, waterLoss.totalLoss).toLocaleString()}
                </motion.div>
                <div className="card-unit mb-2">m³</div>
                <div className="card-description text-red-600 font-medium">Overall: {waterLoss.totalPercentage.toFixed(1)}%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Monthly Consumption Trend */}
      <motion.div 
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <div className="mb-6">
          <h3 className="heading-4 mb-2">Monthly Consumption Trend</h3>
          <p className="body-small">L1 Supply vs. L2 & L3 Meter Totals</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full body-small font-semibold bg-brand-accent bg-opacity-10 text-brand-accent border border-brand-accent border-opacity-20">
            L1 - Main Source
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full body-small font-semibold bg-brand-mint bg-opacity-20 text-brand-mint border border-brand-mint border-opacity-30">
            L2 - Zone Bulk Meters
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full body-small font-semibold bg-brand-primary bg-opacity-10 text-brand-primary border border-brand-primary border-opacity-20">
            L3 - Building/Villa Meters
          </span>
        </div>
        
        <motion.div 
          className="h-80"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyConsumptionData}>
              <defs>
                <linearGradient id="colorL1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D2B3" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00D2B3" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorL2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A2D0C8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#A2D0C8" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorL3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4E4456" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4E4456" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: any) => [`${Number(value).toLocaleString()} m³`, '']}
              />
              <Area
                type="monotone"
                dataKey="L3 - Building/Villa Meters"
                stackId="1"
                stroke="#4E4456"
                fill="url(#colorL3)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="L2 - Zone Bulk Meters"
                stackId="1"
                stroke="#A2D0C8"
                fill="url(#colorL2)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="L1 - Main Source"
                stackId="1"
                stroke="#00D2B3"
                fill="url(#colorL1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Monthly Water Loss Trend */}
      <motion.div 
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <div className="mb-6">
          <h3 className="heading-4 mb-2">Monthly Water Loss Trend</h3>
          <p className="body-small">Comparing loss at different stages of distribution</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full body-small font-semibold bg-red-50 text-red-700 border border-red-200">
            Stage 1 Loss
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full body-small font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            Stage 2 Loss
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full body-small font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">
            Stage 3 Loss
          </span>
        </div>
        
        <motion.div 
          className="h-80"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyLossData}>
              <defs>
                <linearGradient id="colorStage1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorStage2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EA580C" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EA580C" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorStage3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CA8A04" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#CA8A04" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: any) => [`${Number(value).toLocaleString()} m³`, '']}
              />
              <Area
                type="monotone"
                dataKey="Stage 3 Loss"
                stackId="1"
                stroke="#CA8A04"
                fill="url(#colorStage3)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Stage 2 Loss"
                stackId="1"
                stroke="#EA580C"
                fill="url(#colorStage2)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Stage 1 Loss"
                stackId="1"
                stroke="#DC2626"
                fill="url(#colorStage1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};