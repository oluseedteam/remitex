import React, { useState } from 'react';
import { FiFilter, FiDollarSign, FiDownload, FiSearch, FiCalendar, FiTrendingUp, FiTrendingDown, FiArrowUpRight, FiArrowDownRight, FiMoreVertical, FiEye, FiRefreshCw } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [dateRange, setDateRange] = useState('This Month');

  const transactions = [
    { id: 1, user: "John Doe", email: "john@gmail.com", amount: "₦50,000", type: "Credit", status: "Completed", date: "Jan 12, 2025", time: "10:30 AM", method: "Bank Transfer" },
    { id: 2, user: "Mary Okoro", email: "mary@gmail.com", amount: "₦7,200", type: "Debit", status: "Pending", date: "Jan 10, 2025", time: "02:15 PM", method: "Card Payment" },
    { id: 3, user: "Kelvin Edge", email: "kelvin@outlook.com", amount: "₦89,000", type: "Credit", status: "Failed", date: "Jan 8, 2025", time: "04:45 PM", method: "Bank Transfer" },
    { id: 4, user: "Sarah Musa", email: "sarah@yahoo.com", amount: "₦22,500", type: "Debit", status: "Completed", date: "Jan 5, 2025", time: "09:20 AM", method: "Card Payment" },
    { id: 5, user: "David Chen", email: "david@gmail.com", amount: "₦135,000", type: "Credit", status: "Completed", date: "Jan 4, 2025", time: "11:00 AM", method: "Bank Transfer" },
    { id: 6, user: "Emma Wilson", email: "emma@yahoo.com", amount: "₦15,800", type: "Debit", status: "Completed", date: "Jan 3, 2025", time: "03:30 PM", method: "Wallet" },
  ];

  const chartData = [
    { day: "Mon", amount: 45000 },
    { day: "Tue", amount: 72000 },
    { day: "Wed", amount: 58000 },
    { day: "Thu", amount: 89000 },
    { day: "Fri", amount: 95000 },
    { day: "Sat", amount: 67000 },
    { day: "Sun", amount: 43000 },
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tx.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || tx.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = transactions.reduce((sum, tx) => sum + parseInt(tx.amount.replace(/[₦,]/g, '')), 0);
  const completedCount = transactions.filter(tx => tx.status === 'Completed').length;
  const pendingCount = transactions.filter(tx => tx.status === 'Pending').length;
  const failedCount = transactions.filter(tx => tx.status === 'Failed').length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Transactions</h1>
          <p className="text-gray-500">Monitor and manage all financial transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FiDollarSign className="text-white text-xl" />
              </div>
              <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                <FiTrendingUp /> +12.5%
              </span>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Total Volume</p>
            <h3 className="text-2xl font-bold text-gray-900">₦{(totalAmount / 1000).toFixed(1)}K</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FiArrowDownRight className="text-white text-xl" />
              </div>
              <span className="text-green-500 text-sm font-semibold">Success</span>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Completed</p>
            <h3 className="text-2xl font-bold text-gray-900">{completedCount}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <FiRefreshCw className="text-white text-xl" />
              </div>
              <span className="text-yellow-500 text-sm font-semibold">Processing</span>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Pending</p>
            <h3 className="text-2xl font-bold text-gray-900">{pendingCount}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <FiTrendingDown className="text-white text-xl" />
              </div>
              <span className="text-red-500 text-sm font-semibold">Failed</span>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Failed</p>
            <h3 className="text-2xl font-bold text-gray-900">{failedCount}</h3>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Weekly Transaction Volume</h2>
              <p className="text-gray-500 text-sm mt-1">Last 7 days activity</p>
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="#9ca3af"
                style={{ fontSize: '14px' }}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '14px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="amount" 
                fill="#2563eb" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search by user name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>All Status</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>

              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center gap-2"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>

              <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 whitespace-nowrap">
                <FiDownload /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Method</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                  <th className="py-4 px-6 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                          {tx.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tx.user}</p>
                          <p className="text-sm text-gray-500">{tx.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-gray-900 text-lg">{tx.amount}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        tx.type === "Credit" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {tx.type === "Credit" ? <FiArrowDownRight /> : <FiArrowUpRight />}
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{tx.method}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : tx.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          tx.status === "Completed"
                            ? "bg-green-500"
                            : tx.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}></span>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{tx.date}</p>
                        <p className="text-xs text-gray-500">{tx.time}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <FiMoreVertical className="text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <FiDollarSign className="mx-auto text-gray-300 text-5xl mb-3" />
              <p className="text-gray-500">No transactions found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredTransactions.length}</span> of <span className="font-medium">{transactions.length}</span> transactions
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;