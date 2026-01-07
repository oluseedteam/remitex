import React, { useState, useEffect } from "react";
import { FiDollarSign, FiCalendar, FiFilter, FiSearch, FiX, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle, FiArrowUpRight, FiArrowDownRight, FiRefreshCw, FiEye } from "react-icons/fi";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      if (dateFrom) params.append("date_from", dateFrom);
      if (dateTo) params.append("date_to", dateTo);
      if (statusFilter) params.append("status", statusFilter);

      const response = await fetch(
        `https://api.remitex.co/api/transactions?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to fetch");

      const transactionsArray = Array.isArray(data.data) ? data.data : [];
      setTransactions(transactionsArray);
    } catch (err) {
      setError(err.message || "Error fetching transactions");
    }
    setLoading(false);
  };

  const fetchTransactionDetails = async (transactionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://api.remitex.co/api/transactions/${transactionId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch");
      setSelectedTransaction(data.data.transaction);
    } catch (err) {
      alert(err.message || "Error fetching transaction details");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilter = () => {
    fetchTransactions();
  };

  const clearFilters = () => {
    setStatusFilter("");
    setDateFrom("");
    setDateTo("");
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <FiCheckCircle className="text-green-500" />;
      case "pending":
        return <FiClock className="text-yellow-500" />;
      case "failed":
        return <FiXCircle className="text-red-500" />;
      case "cancelled":
        return <FiAlertCircle className="text-gray-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    const badges = {
      completed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      failed: "bg-red-100 text-red-700",
      cancelled: "bg-gray-100 text-gray-700",
    };
    return badges[statusLower] || badges.pending;
  };

  // Calculate stats
  const totalAmount = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);
  const completedCount = transactions.filter(tx => tx.status?.toLowerCase() === 'completed').length;
  const pendingCount = transactions.filter(tx => tx.status?.toLowerCase() === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            My Transactions
          </h1>
          <p className="text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            View and manage all your transaction history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FiDollarSign className="text-white text-xl" />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Total Amount
            </p>
            <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              ₦{totalAmount.toLocaleString()}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FiCalendar className="text-white text-xl" />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Total Transactions
            </p>
            <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {transactions.length}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="text-white text-xl" />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Completed
            </p>
            <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {completedCount}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <FiClock className="text-white text-xl" />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Pending
            </p>
            <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {pendingCount}
            </h3>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FiFilter className="text-gray-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Filter Transactions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                From Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                To Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleFilter}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <FiSearch /> Apply
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                title="Clear filters"
              >
                <FiX />
              </button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <FiAlertCircle className="text-red-600 text-xl flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-900 font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Error
              </h4>
              <p className="text-red-700 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Transaction History
              </h2>
              <p className="text-sm text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <button
              onClick={fetchTransactions}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-20">
              <FiDollarSign className="mx-auto text-gray-300 text-6xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                No Transactions Yet
              </h3>
              <p className="text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Your transaction history will appear here
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Transaction ID
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Amount
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Status
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Date & Time
                    </th>
                    <th className="py-4 px-6 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          #{tx.id}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                            <FiDollarSign className="text-white" />
                          </div>
                          <span className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            ₦{parseFloat(tx.amount || 0).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(tx.status)}`}
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                          {getStatusIcon(tx.status)}
                          <span className="capitalize">{tx.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-medium text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            {new Date(tx.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            {new Date(tx.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => fetchTransactionDetails(tx.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                          <FiEye /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Transaction Details Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Transaction Details
                </h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-xl text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(selectedTransaction).map(([key, value]) => (
                    <div key={key} className="col-span-2 md:col-span-1">
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {key.replace(/_/g, ' ')}
                      </p>
                      <p className="text-gray-900 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedTransaction(null)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;