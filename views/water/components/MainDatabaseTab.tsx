import React, { useState } from 'react';
import { WaterMeter } from '../../../src/lib/supabase';

interface MainDatabaseTabProps {
  meters: WaterMeter[];
}

export const MainDatabaseTab: React.FC<MainDatabaseTabProps> = ({ meters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingMeter, setEditingMeter] = useState<WaterMeter | null>(null);
  const itemsPerPage = 10;

  // Calculate totals for each month
  const calculateMeterTotal = (meter: WaterMeter) => {
    return (meter.jan_25 || 0) + (meter.feb_25 || 0) + (meter.mar_25 || 0) + 
           (meter.apr_25 || 0) + (meter.may_25 || 0) + (meter.jun_25 || 0);
  };

  // Pagination
  const totalMeters = meters.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeters = meters.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalMeters / itemsPerPage);

  const exportToCSV = () => {
    const headers = ['Meter Label', 'Account #', 'Zone', 'Type', 'Parent Meter', 'Level', 'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25', 'Total'];
    
    const csvData = meters.map(meter => [
      meter.meter_label,
      meter.account_number,
      meter.zone,
      meter.type,
      meter.parent_meter,
      meter.label,
      meter.jan_25 || 0,
      meter.feb_25 || 0,
      meter.mar_25 || 0,
      meter.apr_25 || 0,
      meter.may_25 || 0,
      meter.jun_25 || 0,
      calculateMeterTotal(meter)
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'water_meters_database.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (meter: WaterMeter) => {
    setEditingMeter(meter);
  };

  const handleSave = () => {
    // In a real application, this would update the database
    console.log('Saving meter:', editingMeter);
    setEditingMeter(null);
  };

  const handleCancel = () => {
    setEditingMeter(null);
  };

  return (
    <div className="space-y-6">
      {/* Header with Export Button */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Main Water Meters Database</h2>
            <p className="text-gray-600 mt-1">Complete database of all {totalMeters} water meters with edit capabilities</p>
          </div>
          <button
            onClick={exportToCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export to CSV</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meter Label</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Meter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Jan-25</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Feb-25</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Mar-25</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Apr-25</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">May-25</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Jun-25</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentMeters.map((meter) => (
                <tr key={meter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingMeter?.id === meter.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(meter)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="text"
                        value={editingMeter.meter_label}
                        onChange={(e) => setEditingMeter({...editingMeter, meter_label: e.target.value})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-full"
                      />
                    ) : (
                      meter.meter_label
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="text"
                        value={editingMeter.account_number}
                        onChange={(e) => setEditingMeter({...editingMeter, account_number: e.target.value})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-full"
                      />
                    ) : (
                      meter.account_number
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="text"
                        value={editingMeter.zone}
                        onChange={(e) => setEditingMeter({...editingMeter, zone: e.target.value})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-full"
                      />
                    ) : (
                      meter.zone
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="text"
                        value={editingMeter.type}
                        onChange={(e) => setEditingMeter({...editingMeter, type: e.target.value})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-full"
                      />
                    ) : (
                      meter.type
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="text"
                        value={editingMeter.parent_meter}
                        onChange={(e) => setEditingMeter({...editingMeter, parent_meter: e.target.value})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-full"
                      />
                    ) : (
                      meter.parent_meter
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingMeter?.id === meter.id ? (
                      <select
                        value={editingMeter.label}
                        onChange={(e) => setEditingMeter({...editingMeter, label: e.target.value as any})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-full"
                      >
                        <option value="L1">L1</option>
                        <option value="L2">L2</option>
                        <option value="L3">L3</option>
                        <option value="L4">L4</option>
                        <option value="DC">DC</option>
                      </select>
                    ) : (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        meter.label === 'L1' ? 'bg-blue-100 text-blue-800' :
                        meter.label === 'L2' ? 'bg-green-100 text-green-800' :
                        meter.label === 'L3' ? 'bg-orange-100 text-orange-800' :
                        meter.label === 'L4' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {meter.label}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="number"
                        value={editingMeter.jan_25 || 0}
                        onChange={(e) => setEditingMeter({...editingMeter, jan_25: Number(e.target.value)})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-20 text-right"
                      />
                    ) : (
                      meter.jan_25 || 0
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="number"
                        value={editingMeter.feb_25 || 0}
                        onChange={(e) => setEditingMeter({...editingMeter, feb_25: Number(e.target.value)})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-20 text-right"
                      />
                    ) : (
                      meter.feb_25 || 0
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="number"
                        value={editingMeter.mar_25 || 0}
                        onChange={(e) => setEditingMeter({...editingMeter, mar_25: Number(e.target.value)})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-20 text-right"
                      />
                    ) : (
                      meter.mar_25 || 0
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="number"
                        value={editingMeter.apr_25 || 0}
                        onChange={(e) => setEditingMeter({...editingMeter, apr_25: Number(e.target.value)})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-20 text-right"
                      />
                    ) : (
                      meter.apr_25 || 0
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="number"
                        value={editingMeter.may_25 || 0}
                        onChange={(e) => setEditingMeter({...editingMeter, may_25: Number(e.target.value)})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-20 text-right"
                      />
                    ) : (
                      meter.may_25 || 0
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {editingMeter?.id === meter.id ? (
                      <input
                        type="number"
                        value={editingMeter.jun_25 || 0}
                        onChange={(e) => setEditingMeter({...editingMeter, jun_25: Number(e.target.value)})}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-20 text-right"
                      />
                    ) : (
                      meter.jun_25 || 0
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {editingMeter?.id === meter.id ? calculateMeterTotal(editingMeter) : calculateMeterTotal(meter)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, totalMeters)}</span> of{' '}
                <span className="font-medium">{totalMeters}</span> meters
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};