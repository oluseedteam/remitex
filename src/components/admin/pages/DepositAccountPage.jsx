import React, { useState, useEffect } from "react";

const DepositAccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const [formData, setFormData] = useState({
    transfer_route_id: "",
    bank_name: "",
    account_holder_name: "",
    account_number: "",
    bank_address: "",
    swift_code: "",
    routing_number: "",
    iban: "",
    additional_details: "",
    is_active: true,
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.remitex.co/api/admin/deposit-accounts", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch accounts");
        setLoading(false);
        return;
      }

      setAccounts(data?.data?.accounts || []);
      setLoading(false);
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const openModal = (account = null) => {
    if (account) {
      setEditingAccount(account);
      setFormData(account);
    } else {
      setEditingAccount(null);
      setFormData({
        transfer_route_id: "",
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        bank_address: "",
        swift_code: "",
        routing_number: "",
        iban: "",
        additional_details: "",
        is_active: true,
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async () => {
    const url = editingAccount
      ? `https://api.remitex.co/api/admin/deposit-accounts/${editingAccount.id}`
      : "https://api.remitex.co/api/admin/deposit-accounts";

    const method = editingAccount ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error saving deposit account");
        return;
      }

      alert(editingAccount ? "Deposit account updated" : "Deposit account created");

      closeModal();
      fetchData();
    } catch (err) {
      alert("Network error");
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
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold font-outfit bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Deposit Accounts
                </h1>
                <p className="text-slate-600 text-sm">
                  Manage and monitor all deposit account configurations
                </p>
              </div>

              <button
                onClick={() => openModal()}
                className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium flex items-center gap-2 self-start md:self-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Account
              </button>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
              <p className="text-slate-600 font-medium">Loading accounts...</p>
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

          {/* TABLE */}
          {!loading && !error && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">#</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Bank</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Account Holder</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Account No</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Route ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {accounts.length === 0 && (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <p className="text-slate-500 font-medium">No deposit accounts found</p>
                          <p className="text-slate-400 text-sm mt-1">Create your first account to get started</p>
                        </td>
                      </tr>
                    )}

                    {accounts.map((acc, index) => (
                      <tr key={acc.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{index + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-semibold font-outfit">
                              {acc.bank_name?.charAt(0) || 'B'}
                            </div>
                            <span className="font-medium text-slate-900">{acc.bank_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{acc.account_holder_name}</td>
                        <td className="px-6 py-4 text-sm font-mono text-slate-700">{acc.account_number}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            {acc.transfer_route_id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              acc.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full mr-2 ${acc.is_active ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                            {acc.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => openModal(acc)}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODAL */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fadeIn">
              <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
                <div className="sticky top-0 bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-6 rounded-t-2xl">
                  <h2 className="text-2xl font-bold font-outfit text-white">
                    {editingAccount ? "Update Deposit Account" : "Create New Account"}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {editingAccount ? "Modify account details below" : "Fill in the account information"}
                  </p>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Transfer Route ID */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Transfer Route ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="transfer_route_id"
                        placeholder="Enter route ID"
                        value={formData.transfer_route_id}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        required
                      />
                    </div>

                    {/* Bank Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="bank_name"
                        placeholder="e.g., Chase Bank"
                        value={formData.bank_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        required
                      />
                    </div>

                    {/* Account Holder */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Account Holder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="account_holder_name"
                        placeholder="Full name"
                        value={formData.account_holder_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        required
                      />
                    </div>

                    {/* Account Number */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="account_number"
                        placeholder="Account number"
                        value={formData.account_number}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-mono"
                        required
                      />
                    </div>

                    {/* Bank Address */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Bank Address
                      </label>
                      <input
                        type="text"
                        name="bank_address"
                        placeholder="Full bank address"
                        value={formData.bank_address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>

                    {/* SWIFT Code */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        SWIFT Code
                      </label>
                      <input
                        type="text"
                        name="swift_code"
                        placeholder="e.g., CHASUS33"
                        value={formData.swift_code}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-mono uppercase"
                      />
                    </div>

                    {/* Routing Number */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Routing Number
                      </label>
                      <input
                        type="text"
                        name="routing_number"
                        placeholder="9-digit routing number"
                        value={formData.routing_number}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-mono"
                      />
                    </div>

                    {/* IBAN */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        IBAN
                      </label>
                      <input
                        type="text"
                        name="iban"
                        placeholder="International Bank Account Number"
                        value={formData.iban}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-mono uppercase"
                      />
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Additional Details
                      </label>
                      <textarea
                        name="additional_details"
                        placeholder="Any additional information..."
                        value={formData.additional_details}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                      />
                    </div>

                    {/* Active Status */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          name="is_active"
                          checked={formData.is_active}
                          onChange={handleChange}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-semibold text-slate-900">Active Account</span>
                          <p className="text-xs text-slate-500 mt-0.5">Enable this account for transactions</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                    >
                      {editingAccount ? "Update Account" : "Create Account"}
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

export default DepositAccountsPage;