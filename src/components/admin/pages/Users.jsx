import React, { useState, useEffect } from "react";
import { FiSearch, FiMoreVertical, FiX, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All"); // All | Pending | Approved | Rejected
  const [searchQuery, setSearchQuery] = useState("");

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const token = localStorage.getItem("token"); // admin token

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://api.remitex.co/api/admin/users/all", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // Make sure users is an array
      if (Array.isArray(data.users)) setUsers(data.users);
      else if (typeof data.users === "string") setUsers(JSON.parse(data.users));
      else setUsers([]);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Approve user
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
      console.error(err);
    }
  };

  // Reject user
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
        fetchUsers();
      } else {
        alert(data.message || "Failed to reject user.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter users based on tab and search
  const filteredUsers = () => {
    let list = users;

    if (tab === "Pending") list = users.filter((u) => u.status === "Pending");
    else if (tab === "Approved") list = users.filter((u) => u.status === "Approved");
    else if (tab === "Rejected") list = users.filter((u) => u.status === "Rejected");

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (u) =>
          u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
      );
    }

    return list;
  };

  // Reject Modal
  const RejectModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Reject User</h2>
          <FiX
            className="text-xl cursor-pointer"
            onClick={() => setShowRejectModal(false)}
          />
        </div>
        <textarea
          className="w-full border rounded-lg p-3"
          placeholder="Enter rejection reason"
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
        <button
          className="w-full bg-red-600 text-white py-3 mt-4 rounded-lg hover:bg-red-700"
          onClick={rejectUser}
        >
          Reject User
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {loading ? (
        <div className="text-center py-20 text-xl text-gray-600">Loading users...</div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Users Management</h1>

          {/* Tabs */}
          <div className="flex gap-3 mb-6">
            {["All", "Pending", "Approved", "Rejected"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  tab === t ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="bg-white p-6 rounded-xl shadow mb-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-12 pr-4 py-3 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers().length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers().map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.status}</td>
                      <td className="p-4 text-right relative">
                        {user.status === "Pending" && (
                          <div className="flex justify-end gap-2">
                            <button
                              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                              onClick={() => approveUser(user.id)}
                            >
                              Approve
                            </button>
                            <button
                              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                              onClick={() => {
                                setSelectedUserId(user.id);
                                setShowRejectModal(true);
                              }}
                            >
                              Reject
                            </button>
                          </div>
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

      {showRejectModal && <RejectModal />}
    </div>
  );
};

export default Users;
