import React from 'react';
import type { FirefightingData, FirefightingStatus, FirefightingPriority, SignalStrength } from '../../types';
import { StatCard } from '../../components/StatCard';
import { DoughnutChartCard } from '../../components/charts/DoughnutChartCard';
import { BarChartCard } from '../../components/charts/BarChartCard';

interface FirefightingViewProps {
    data: FirefightingData;
}

const StatusBadge: React.FC<{ status: FirefightingStatus | FirefightingPriority }> = ({ status }) => {
    const styles = {
        Operational: 'bg-green-100 text-green-800',
        'Needs Attention': 'bg-yellow-100 text-yellow-800',
        Expired: 'bg-red-100 text-red-800',
        'Maintenance Due': 'bg-blue-100 text-blue-800',
        Critical: 'bg-red-100 text-red-800',
        High: 'bg-orange-100 text-orange-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        'N/A': 'bg-gray-100 text-gray-800',
    };
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>{status}</span>;
};

const SignalIndicator: React.FC<{ strength: SignalStrength, value: number }> = ({ strength, value }) => {
    const color = { Strong: 'text-green-500', Moderate: 'text-yellow-500', Weak: 'text-red-500' };
    return (
        <div className="flex items-center gap-2">
            <div className="w-16 bg-slate-200 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${strength === 'Strong' ? 'bg-green-500' : strength === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${value}%`}}></div></div>
            <span className={`text-sm font-medium ${color[strength]}`}>{strength}</span>
        </div>
    );
};


export const FirefightingView: React.FC<FirefightingViewProps> = ({ data }) => {
    return (
        <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.stats.map(stat => <StatCard key={stat.id} {...stat} layout="horizontal" />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DoughnutChartCard data={data.systemStatus} title="System Status Distribution" />
                <BarChartCard data={data.equipmentByType} title="Equipment by Type" />
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input type="text" placeholder="Search Equipment..." className="md:col-span-2 w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"/>
                    <select className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"><option>All Zones</option></select>
                    <select className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"><option>All System Types</option></select>
                    <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors">Apply Filters</button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Fire Safety Equipment</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left responsive-table">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">Equipment</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Priority</th>
                                <th className="px-6 py-3">Battery / Signal</th>
                                <th className="px-6 py-3">Next Maintenance</th>
                                <th className="px-6 py-3">Inspector</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.equipmentList.map(item => (
                                <tr key={item.id} className="bg-white border-b hover:bg-slate-50">
                                    <td data-label="Equipment" className="px-6 py-4 font-medium text-slate-900"><div>{item.equipment}<div className="text-xs text-slate-500 font-normal">{item.subtext}</div></div></td>
                                    <td data-label="Location" className="px-6 py-4"><div>{item.location}<div className="text-xs text-slate-500">{item.locationSubtext}</div></div></td>
                                    <td data-label="Status" className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                    <td data-label="Priority" className="px-6 py-4"><StatusBadge status={item.priority} /></td>
                                    <td data-label="Battery/Signal" className="px-6 py-4">
                                        <div className="flex flex-col items-end md:items-start">
                                            <div className="text-xs font-bold text-slate-700 mb-1">{item.battery}%</div>
                                            <SignalIndicator strength={item.signal} value={item.battery} />
                                        </div>
                                    </td>
                                    <td data-label="Maintenance" className="px-6 py-4">{item.nextMaintenance}</td>
                                    <td data-label="Inspector" className="px-6 py-4">{item.inspector}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};