import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { WaterSystemData, WaterMeterRecord } from '../../../types';

interface DatabaseViewProps {
    data: WaterSystemData;
}

export const DatabaseView: React.FC<DatabaseViewProps> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const filteredMeters = useMemo(() => {
        if (!searchTerm) return data.allMetersFlat;
        const lower = searchTerm.toLowerCase();
        return data.allMetersFlat.filter(m => 
            m.meterLabel.toLowerCase().includes(lower) ||
            m.accountNumber.toLowerCase().includes(lower) ||
            m.type.toLowerCase().includes(lower) ||
            m.zone.toLowerCase().includes(lower)
        );
    }, [data.allMetersFlat, searchTerm]);

    const totalPages = Math.ceil(filteredMeters.length / itemsPerPage);
    const paginatedMeters = filteredMeters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const exportData = () => {
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Meter Label,Account Number,Type,Zone,Level,Parent Meter," + data.months.join(",") + ",Total Consumption\n"
            + filteredMeters.map(meter => {
                const monthlyValues = data.months.map(month => meter.monthlyConsumption[month] || 0);
                return `${meter.meterLabel},${meter.accountNumber},${meter.type},${meter.zone},${meter.level},${meter.parentMeterLabel},${monthlyValues.join(",")},${meter.totalConsumption}`;
            }).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "water-meters-database.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Main Database</h2>
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
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                     <h3 className="text-lg font-semibold text-slate-700">
                        Meter Database ({filteredMeters.length} entries)
                    </h3>
                    <input
                        type="text"
                        placeholder="Search meters..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full md:w-1/3 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>
            <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left responsive-table">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th className="px-4 py-3">Meter Label</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Zone</th>
                            <th className="px-4 py-3">Level</th>
                            {data.months.map(m => <th key={m} className="px-4 py-3 text-right">{m}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedMeters.map(meter => (
                            <tr key={meter.meterLabel} className="bg-white border-b hover:bg-slate-50">
                                <td data-label="Label" className="px-4 py-3 font-medium text-slate-800">{meter.meterLabel}</td>
                                <td data-label="Type" className="px-4 py-3 text-slate-600">{meter.type}</td>
                                <td data-label="Zone" className="px-4 py-3 text-slate-600">{meter.zone}</td>
                                <td data-label="Level" className="px-4 py-3 font-mono text-xs">{meter.level}</td>
                                {data.months.map(m => <td key={m} data-label={m} className="px-4 py-3 text-right font-mono text-xs">{meter.monthlyConsumption[m]?.toLocaleString() ?? '-'}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="flex justify-between items-center pt-4 mt-4 border-t">
                    <span className="text-sm text-slate-500">Page {currentPage} of {totalPages}</span>
                    <div>
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="bg-white border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg text-sm mr-2 hover:bg-slate-50 disabled:opacity-50">Previous</button>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-teal-600 disabled:opacity-50">Next</button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};
