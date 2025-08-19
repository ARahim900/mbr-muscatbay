import React, { useState, useMemo } from 'react';
import type { ElectricityRecord } from '../../../types';

interface DetailedLogProps {
    records: (ElectricityRecord & { periodTotalConsumption: number })[];
}

export const DetailedLog: React.FC<DetailedLogProps> = ({ records }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const filteredRecords = useMemo(() => {
        const sortedRecords = [...records].sort((a, b) => b.periodTotalConsumption - a.periodTotalConsumption);
        if (!searchTerm) return sortedRecords;
        
        const lowercasedFilter = searchTerm.toLowerCase();
        return sortedRecords.filter(record =>
            record.name.toLowerCase().includes(lowercasedFilter) ||
            record.type.toLowerCase().includes(lowercasedFilter) ||
            record.meterAccountNo.toLowerCase().includes(lowercasedFilter)
        );
    }, [records, searchTerm]);

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };
    
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <h3 className="text-lg font-semibold text-slate-700">
                    Detailed Meter Readings ({filteredRecords.length} entries)
                </h3>
                <input
                    type="text"
                    placeholder="Search by name, type, or account..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full md:w-1/3 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left responsive-table">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Meter Account No.</th>
                            <th className="px-6 py-3 text-right">Total Consumption (kWh)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRecords.map(record => (
                            <tr key={record.meterAccountNo + record.name} className="bg-white border-b hover:bg-slate-50">
                                <td data-label="Name" className="px-6 py-4 font-medium text-slate-900">{record.name}</td>
                                <td data-label="Type" className="px-6 py-4">{record.type}</td>
                                <td data-label="Account No." className="px-6 py-4 font-mono text-xs">{record.meterAccountNo || 'N/A'}</td>
                                <td data-label="Consumption" className="px-6 py-4 text-right font-semibold text-slate-800">
                                    {record.periodTotalConsumption.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                 <div className="flex justify-between items-center pt-4 mt-4 border-t">
                    <span className="text-sm text-slate-500">Page {currentPage} of {totalPages}</span>
                    <div>
                         <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="bg-white border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg text-sm mr-2 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                        </button>
                         <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed">
                                Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
