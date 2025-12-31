import React, { useState, useEffect } from "react";

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

      // Ensure data is an array
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
  }, [statusFilter, dateFrom, dateTo]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Transactions</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border p-2 rounded"
          placeholder="From Date"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="border p-2 rounded"
          placeholder="To Date"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          onClick={fetchTransactions}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      {/* Transaction Table */}
      {loading ? (
        <p>Loading transactions...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b">
                <td className="p-2">{tx.id}</td>
                <td className="p-2">{tx.amount}</td>
                <td className="p-2 capitalize">{tx.status}</td>
                <td className="p-2">
                  {new Date(tx.created_at).toLocaleString()}
                </td>
                <td className="p-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => fetchTransactionDetails(tx.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Transaction Details
            </h2>
            <pre className="text-sm">{JSON.stringify(selectedTransaction, null, 2)}</pre>
            <button
              onClick={() => setSelectedTransaction(null)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
