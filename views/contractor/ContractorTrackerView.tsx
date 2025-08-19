import React from 'react';
import type { ContractorData, ContractStatus, ContractType } from '../../types';
import { StatCard } from '../../components/StatCard';
import { Icons } from '../../constants';

interface ContractorTrackerViewProps {
    data: ContractorData;
}

const StatusBadge: React.FC<{ status: ContractStatus }> = ({ status }) => {
    const styles = {
        Active: 'bg-green-100 text-green-800',
        Expired: 'bg-red-100 text-red-800',
    };
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>{status}</span>;
};

export const ContractorTrackerView: React.FC<ContractorTrackerViewProps> = ({ data }) => {
    return (
        <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.stats.map(stat => <StatCard key={stat.id} {...stat} layout="horizontal" />)}
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <input type="text" placeholder="Search Contractor/Service" className="md:col-span-2 w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"/>
                    <select className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"><option>Filter by Status</option></select>
                    <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors">Reset</button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left responsive-table">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">Contractor</th>
                                <th className="px-6 py-3">Service Provided</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Start Date</th>
                                <th className="px-6 py-3">End Date</th>
                                <th className="px-6 py-3">Annual Value</th>
                                <th className="px-6 py-3">Note</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.contracts.map(item => (
                                <tr key={item.id} className="bg-white border-b hover:bg-slate-50">
                                    <td data-label="Contractor" className="px-6 py-4 font-medium text-slate-900">{item.contractor}</td>
                                    <td data-label="Service" className="px-6 py-4">{item.service}</td>
                                    <td data-label="Status" className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                    <td data-label="Type" className="px-6 py-4">{item.type}</td>
                                    <td data-label="Start Date" className="px-6 py-4">{item.startDate}</td>
                                    <td data-label="End Date" className="px-6 py-4">{item.endDate}</td>
                                    <td data-label="Annual Value" className="px-6 py-4">{item.annualValue}</td>
                                    <td data-label="Note" className="px-6 py-4 text-xs text-slate-500">{item.note}</td>
                                    <td data-label="Actions" className="px-6 py-4 text-right">
                                        <button className="p-1.5 bg-slate-100 rounded-md hover:bg-slate-200">
                                            <Icons.settings className="w-4 h-4 text-slate-600"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="flex justify-between items-center pt-4 mt-4 border-t">
                    <span className="text-sm text-slate-500">Page 1 of 2</span>
                    <div>
                         <button className="bg-white border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg text-sm mr-2 hover:bg-slate-50">Previous</button>
                         <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-teal-600">Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
};