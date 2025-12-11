import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState("");

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      let url = "https://api.remitex.co/api/admin/users/all";
      
      if (tab === "Pending") {
        url = "https://api.remitex.co/api/admin/users/pending";
      }

      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch users");
        setLoading(false);
        return;
      }

      let usersList = [];
      if (Array.isArray(data.users)) {
        usersList = data.users;
      } else if (typeof data.users === "string") {
        try {
          usersList = JSON.parse(data.users);
        } catch {
          usersList = [];
        }
      }

      setUsers(usersList);
      setLoading(false);
    } catch (err) {
      setError("Network error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [tab]);

  const approveUser = async (userId) => {
    try {
      const res = await fetch(
        `https://api.remitex.co/api/admin/users/${userId}/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      
      if (res.ok) {
        alert("User approved successfully!");
        fetchUsers();
      } else {
        alert(data.message || "Failed to approve user.");
      }
    } catch (err) {
      alert("Error approving user");
    }
  };

  const rejectUser = async () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }

    try {
      const res = await fetch(
        `https://api.remitex.co/api/admin/users/${selectedUserId}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reason: rejectReason }),
        }
      );
      const data = await res.json();
      
      if (res.ok) {
        alert("User rejected successfully!");
        setShowRejectModal(false);
        setRejectReason("");
        setSelectedUserId(null);
        fetchUsers();
      } else {
        alert(data.message || "Failed to reject user.");
      }
    } catch (err) {
      alert("Error rejecting user");
    }
  };

  const filteredUsers = () => {
    let list = users;

    if (tab === "Approved") {
      list = users.filter((u) => u.status === "Approved" || u.status === "approved");
    } else if (tab === "Rejected") {
      list = users.filter((u) => u.status === "Rejected" || u.status === "rejected");
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (u) =>
          u.name?.toLowerCase().includes(q) || 
          u.email?.toLowerCase().includes(q) ||
          u.id?.toString().includes(q)
      );
    }

    return list;
  };

  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'approved':
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
      case 'rejected':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusCounts = () => {
    return {
      all: users.length,
      pending: users.filter(u => u.status?.toLowerCase() === 'pending').length,
      approved: users.filter(u => u.status?.toLowerCase() === 'approved').length,
      rejected: users.filter(u => u.status?.toLowerCase() === 'rejected').length,
    };
  };

  const statusCounts = getStatusCounts();

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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold font-outfit bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Users Management
                </h1>
                <p className="text-slate-600 text-sm">
                  Manage user approvals and account status
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Total</div>
                  <div className="text-2xl font-bold font-outfit text-slate-900">{statusCounts.all}</div>
                </div>
                <div className="bg-yellow-50 px-4 py-2 rounded-xl shadow-md border border-yellow-200">
                  <div className="text-xs text-yellow-700 font-medium">Pending</div>
                  <div className="text-2xl font-bold font-outfit text-yellow-700">{statusCounts.pending}</div>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-xl shadow-md border border-green-200">
                  <div className="text-xs text-green-700 font-medium">Approved</div>
                  <div className="text-2xl font-bold font-outfit text-green-700">{statusCounts.approved}</div>
                </div>
                <div className="bg-red-50 px-4 py-2 rounded-xl shadow-md border border-red-200">
                  <div className="text-xs text-red-700 font-medium">Rejected</div>
                  <div className="text-2xl font-bold font-outfit text-red-700">{statusCounts.rejected}</div>
                </div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="flex flex-wrap gap-3 mb-6">
            {["All", "Pending", "Approved", "Rejected"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  tab === t
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105"
                    : "bg-white text-slate-700 shadow-md hover:shadow-lg hover:scale-105 border border-slate-200"
                }`}
              >
                {t}
                {t !== "All" && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                    tab === t 
                      ? "bg-white bg-opacity-30" 
                      : "bg-slate-100"
                  }`}>
                    {t === "Pending" && statusCounts.pending}
                    {t === "Approved" && statusCounts.approved}
                    {t === "Rejected" && statusCounts.rejected}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent mb-4"></div>
              <p className="text-slate-600 font-medium">Loading users...</p>
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

          {/* USERS TABLE */}
          {!loading && !error && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {filteredUsers().length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <p className="text-slate-500 font-medium text-lg">No users found</p>
                          <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter</p>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers().map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors duration-150">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold font-outfit">
                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <div className="font-medium text-slate-900">{user.name || 'Unknown User'}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-700">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 text-slate-700">
                              #{user.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(user.status)}`}>
                              {getStatusIcon(user.status)}
                              {user.status?.charAt(0).toUpperCase() + user.status?.slice(1).toLowerCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {(user.status?.toLowerCase() === "pending") && (
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => approveUser(user.id)}
                                  className="inline-flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium text-sm shadow-md hover:shadow-lg"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedUserId(user.id);
                                    setShowRejectModal(true);
                                  }}
                                  className="inline-flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium text-sm shadow-md hover:shadow-lg"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Reject
                                </button>
                              </div>
                            )}
                            {(user.status?.toLowerCase() === "approved") && (
                              <span className="text-green-600 font-medium text-sm">✓ Approved</span>
                            )}
                            {(user.status?.toLowerCase() === "rejected") && (
                              <span className="text-red-600 font-medium text-sm">✗ Rejected</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REJECT MODAL */}
          {showRejectModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-slideUp">
                <div className="bg-gradient-to-r from-red-600 to-rose-600 px-8 py-6 rounded-t-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold font-outfit text-white">Reject User</h2>
                      <p className="text-red-100 text-sm mt-1">Provide a reason for rejection</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowRejectModal(false);
                        setRejectReason("");
                        setSelectedUserId(null);
                      }}
                      className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="space-y-2 mb-6">
                    <label className="block text-sm font-semibold text-slate-700">
                      Rejection Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Enter the reason for rejecting this user..."
                      rows={5}
                      maxLength={500}
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none resize-none"
                    />
                    <div className="text-xs text-slate-500 text-right">{rejectReason.length}/500 characters</div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowRejectModal(false);
                        setRejectReason("");
                        setSelectedUserId(null);
                      }}
                      className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={rejectUser}
                      disabled={!rejectReason.trim()}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
                        rejectReason.trim()
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-xl hover:scale-105'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Reject User
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

export default Users;