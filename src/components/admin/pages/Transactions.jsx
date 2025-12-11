import React, { useState, useEffect } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      const params = new URLSearchParams();
      if (dateFrom) params.append("date_from", dateFrom);
      if (dateTo) params.append("date_to", dateTo);
      if (statusFilter) params.append("status", statusFilter);

      const response = await fetch(
        `https://api.remitex.co/api/admin/transactions?${params.toString()}`,
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

      const transactionsArray = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.data?.transactions)
        ? data.data.transactions
        : [];

      setTransactions(transactionsArray);
    } catch (err) {
      setError(err.message || "Error fetching transactions");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, [statusFilter, dateFrom, dateTo]);

  const handleUpdateStatus = async (transactionId) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      const response = await fetch(
        `https://api.remitex.co/api/admin/transactions/${transactionId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus, admin_notes: adminNotes }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update");

      alert("Transaction status updated successfully!");
      fetchTransactions();
      setSelectedTransaction(null);
      setNewStatus("");
      setAdminNotes("");
    } catch (err) {
      alert(err.message || "Error updating transaction");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      completed: "bg-green-100 text-green-700 border-green-200",
      failed: "bg-red-100 text-red-700 border-red-200",
      cancelled: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
        
        .font-outfit {
          font-family: 'Outfit', sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
          background: linear-gradient(to right, #f0f0f0 4%, #e0e0e0 25%, #f0f0f0 36%);
          background-size: 1000px 100%;
        }
      `}</style>

      <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold font-outfit text-blue-700 bg-clip-text mb-2">
                  Transactions
                </h1>
                <p className="text-slate-600 text-sm">
                  Monitor and manage all transaction activities
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Total Transactions</div>
                  <div className="text-2xl font-bold font-outfit text-slate-900">{transactions.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* FILTERS */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h2 className="text-lg font-semibold text-slate-900">Filter Transactions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Date From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Date To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={fetchTransactions}
                  className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mb-4"></div>
              <p className="text-slate-600 font-medium">Loading transactions...</p>
            </div>
          )}

          {/* ERROR STATE */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && transactions.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium text-lg">No transactions found</p>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or check back later</p>
            </div>
          )}

          {/* TRANSACTION TABLE */}
          {!loading && !error && transactions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-linear-to-r from-purple-600 to-blue-600 text-white">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 text-slate-700">
                            #{tx.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold font-outfit text-sm">
                              {(tx.user?.email || tx.user_id?.toString() || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">{tx.user?.email || `User ${tx.user_id}`}</div>
                              <div className="text-xs text-slate-500">ID: {tx.user_id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900 font-mono">${parseFloat(tx.amount || 0).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(tx.status)}`}>
                            {getStatusIcon(tx.status)}
                            {tx.status?.charAt(0).toUpperCase() + tx.status?.slice(1).toLowerCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          <div>{new Date(tx.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}</div>
                          <div className="text-xs text-slate-500">
                            {new Date(tx.created_at).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedTransaction(tx);
                              setNewStatus(tx.status);
                            }}
                            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm hover:underline transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* UPDATE STATUS MODAL */}
          {selectedTransaction && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fadeIn">
              <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl animate-slideUp">
                <div className="bg-linear-to-r from-purple-600 to-blue-600 px-8 py-6 rounded-t-2xl">
                  <h2 className="text-2xl font-bold font-outfit text-white">Update Transaction Status</h2>
                  <p className="text-purple-100 text-sm mt-1">Modify the transaction details below</p>
                </div>

                <div className="p-8">
                  {/* Transaction Details */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1">Transaction ID</div>
                        <div className="font-mono font-semibold text-slate-900">#{selectedTransaction.id}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1">Current Status</div>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(selectedTransaction.status)}`}>
                          {getStatusIcon(selectedTransaction.status)}
                          {selectedTransaction.status?.charAt(0).toUpperCase() + selectedTransaction.status?.slice(1)}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1">Amount</div>
                        <div className="font-semibold text-slate-900">${parseFloat(selectedTransaction.amount || 0).toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1">User</div>
                        <div className="font-medium text-slate-900 text-sm truncate">{selectedTransaction.user?.email || `User ${selectedTransaction.user_id}`}</div>
                      </div>
                    </div>
                  </div>

                  {/* New Status */}
                  <div className="space-y-2 mb-6">
                    <label className="block text-sm font-semibold text-slate-700">
                      New Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="">Select new status</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Admin Notes */}
                  <div className="space-y-2 mb-6">
                    <label className="block text-sm font-semibold text-slate-700">
                      Admin Notes <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                    </label>
                    <textarea
                      placeholder="Add any notes about this status change..."
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      maxLength={500}
                      rows="4"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none"
                    />
                    <div className="text-xs text-slate-500 text-right">{adminNotes.length}/500 characters</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                    <button
                      onClick={() => {
                        setSelectedTransaction(null);
                        setNewStatus("");
                        setAdminNotes("");
                      }}
                      className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(selectedTransaction.id)}
                      disabled={!newStatus}
                      className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
                        newStatus
                          ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:scale-105'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;