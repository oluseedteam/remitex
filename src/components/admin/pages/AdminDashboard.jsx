import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import { FiUsers, FiDollarSign, FiTrendingUp, FiActivity, FiArrowUp, FiArrowDown, FiMoreVertical } from "react-icons/fi";

const data = [
  { month: "Jan", amount: 400, target: 450 },
  { month: "Feb", amount: 650, target: 600 },
  { month: "Mar", amount: 500, target: 700 },
  { month: "Apr", amount: 900, target: 850 },
  { month: "May", amount: 1200, target: 1000 },
  { month: "Jun", amount: 1100, target: 1150 },
];

const recentTransactions = [
  { id: 1, user: "John Doe", email: "john@example.com", amount: "₦30,500", status: "Completed", time: "2 mins ago" },
  { id: 2, user: "Sarah Musa", email: "sarah@example.com", amount: "₦12,000", status: "Pending", time: "15 mins ago" },
  { id: 3, user: "Kelvin Edge", email: "kelvin@example.com", amount: "₦85,000", status: "Failed", time: "1 hour ago" },
  { id: 4, user: "Amanda Chen", email: "amanda@example.com", amount: "₦45,200", status: "Completed", time: "3 hours ago" },
];

const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className={`${color} p-3 rounded-xl text-white`}>
        {icon}
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <FiMoreVertical />
      </button>
    </div>
    <div className="space-y-1">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <div className="flex items-center gap-1">
        {trend === 'up' ? (
          <FiArrowUp className="text-green-500 text-sm" />
        ) : (
          <FiArrowDown className="text-red-500 text-sm" />
        )}
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trendValue}
        </span>
        <span className="text-gray-400 text-sm">vs last month</span>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Users" 
            value="14,500" 
            icon={<FiUsers size={24} />} 
            color="bg-gradient-to-br from-blue-500 to-blue-600" 
            trend="up"
            trendValue="+12.5%"
          />
          <StatCard 
            title="Total Revenue" 
            value="₦12.3M" 
            icon={<FiDollarSign size={24} />} 
            color="bg-gradient-to-br from-green-500 to-green-600" 
            trend="up"
            trendValue="+8.2%"
          />
          <StatCard 
            title="Daily Volume" 
            value="₦1.2M" 
            icon={<FiTrendingUp size={24} />} 
            color="bg-gradient-to-br from-purple-500 to-purple-600" 
            trend="up"
            trendValue="+23.1%"
          />
          <StatCard 
            title="Active Sessions" 
            value="534" 
            icon={<FiActivity size={24} />} 
            color="bg-gradient-to-br from-orange-500 to-orange-600" 
            trend="down"
            trendValue="-4.3%"
          />
        </div>

        {/* CHART */}
        <div className="bg-white p-8 rounded-2xl shadow-sm mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Monthly Transaction Growth</h2>
              <p className="text-gray-500 text-sm mt-1">Tracking your transaction performance over time</p>
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
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
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#2563eb" 
                strokeWidth={3}
                fill="url(#colorAmount)"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#94a3b8" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* RECENT TRANSACTIONS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
                <p className="text-gray-500 text-sm mt-1">Latest activity from your users</p>
              </div>
              <button className="px-4 py-2 text-blue-600 font-medium text-sm hover:bg-blue-50 rounded-lg transition-colors">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                          {t.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{t.user}</p>
                          <p className="text-sm text-gray-500">{t.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">{t.amount}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          t.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : t.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">{t.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;