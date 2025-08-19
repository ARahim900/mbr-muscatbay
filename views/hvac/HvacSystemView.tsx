import React, { useState, useMemo } from 'react';
import type { HvacData, HvacFindingPriority, HvacFindingStatus } from '../../types';

interface HvacSystemViewProps {
    data: HvacData;
}

const PriorityBadge: React.FC<{ priority: HvacFindingPriority | string }> = ({ priority }) => {
    const styles: Record<string, string> = {
        Critical: 'bg-red-100 text-red-800 ring-1 ring-inset ring-red-200',
        High: 'bg-orange-100 text-orange-800 ring-1 ring-inset ring-orange-200',
        Medium: 'bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-200',
        Low: 'bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-200',
        'N/A': 'bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-200',
    };
    const style = styles[priority] || 'bg-gray-100 text-gray-800';
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md inline-block ${style}`}>{priority}</span>;
};

const StatusBadge: React.FC<{ status: HvacFindingStatus | string }> = ({ status }) => {
    const styles: Record<string, string> = {
        'Open - Action Required': 'bg-red-100 text-red-800 ring-1 ring-inset ring-red-200',
        'Quote Submitted / Awaiting LPO': 'bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-200',
        'Closed - Verified': 'bg-green-100 text-green-800 ring-1 ring-inset ring-green-200',
    };
    const style = styles[status] || 'bg-gray-100 text-gray-800';
    return <span className={`whitespace-nowrap px-2 py-1 text-xs font-semibold rounded-md inline-block ${style}`}>{status}</span>;
};


export const HvacSystemView: React.FC<HvacSystemViewProps> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredLog = useMemo(() => {
        if (!searchTerm) return data.log;
        const lowercasedFilter = searchTerm.toLowerCase();
        return data.log.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(lowercasedFilter)
            )
        );
    }, [data.log, searchTerm]);
    
    const totalPages = Math.ceil(filteredLog.length / itemsPerPage);
    const paginatedLog = filteredLog.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const resetFilters = () => {
        setSearchTerm('');
        setCurrentPage(1);
    }

    return (
        <div className="animate-fade-in space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
                 <div className="flex justify-between items-center">
                    <input 
                        type="text" 
                        placeholder="Search across all fields..." 
                        className="w-full md:w-1/3 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        value={searchTerm}
                        onChange={e => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <button onClick={resetFilters} className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors">Reset Filters</button>
                 </div>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Showing {paginatedLog.length} of {filteredLog.length} entries</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left responsive-table">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Asset</th>
                                <th className="px-6 py-3">Finding</th>
                                <th className="px-6 py-3">Priority</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action Required</th>
                                <th className="px-6 py-3">Notes</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLog.map(item => (
                                <tr key={item.id} className="bg-white border-b hover:bg-slate-50">
                                    <td data-label="ID" className="px-6 py-4 font-mono text-xs text-slate-500">{item.id}</td>
                                    <td data-label="Asset" className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{item.equipment}</div>
                                        <div className="text-xs text-slate-500">{item.building} &bull; {item.mainSystem}</div>
                                    </td>
                                    <td data-label="Finding" className="px-6 py-4">
                                        <div>{item.finding}</div>
                                        {(item.ppmVisit !== 'N/A' || item.qty !== 'N/A') && 
                                            <div className="text-xs text-slate-500 mt-1">
                                                {item.ppmVisit !== 'N/A' && <span>PPM: <strong>{item.ppmVisit}</strong></span>}
                                                {item.qty !== 'N/A' && <span> | Qty: <strong>{item.qty}</strong></span>}
                                            </div>
                                        }
                                    </td>
                                    <td data-label="Priority" className="px-6 py-4"><PriorityBadge priority={item.priority} /></td>
                                    <td data-label="Status" className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                    <td data-label="Action Required" className="px-6 py-4 text-xs">{item.actionRequired}</td>
                                    <td data-label="Notes" className="px-6 py-4 text-xs text-slate-500">{item.notes}</td>
                                    <td data-label="Actions" className="px-6 py-4 text-right">
                                        <button className="bg-teal-500 text-white font-bold py-1 px-3 rounded-lg text-xs hover:bg-teal-600">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
            </div>
        </div>
    );
};