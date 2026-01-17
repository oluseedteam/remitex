import React, { useEffect, useState } from "react";
import { FiGlobe, FiTrendingUp, FiEdit2, FiPlus, FiRefreshCw, FiAlertCircle, FiCheck, FiX, FiArrowRight } from "react-icons/fi";

const API_BASE = "https://api.remitex.co/api/admin";

export default function TransferRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    sending_country_id: "",
    receiving_country_id: "",
    exchange_rate: "",
    commission_percentage: "",
    is_active: true,
  });
  const [editId, setEditId] = useState(null);

  // Fetch Transfer Routes
  const fetchRoutes = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Admin not logged in. Please login first.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/transfer-routes`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("ROUTES RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to fetch routes");
      }

      // Handle different possible response structures
      let routeList = [];
      if (Array.isArray(data?.data?.routes)) {
        routeList = data.data.routes;
      } else if (Array.isArray(data?.data)) {
        routeList = data.data;
      } else if (Array.isArray(data)) {
        routeList = data;
      }

      setRoutes(routeList);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Admin not logged in");
      return;
    }

    // Validate required fields
    if (!form.sending_country_id || !form.receiving_country_id || !form.exchange_rate || !form.commission_percentage) {
      alert("Please fill in all required fields");
      return;
    }

    const url = editId
      ? `${API_BASE}/transfer-routes/${editId}`
      : `${API_BASE}/transfer-routes`;

    const method = editId ? "PUT" : "POST";

    // Prepare payload according to API spec
    const payload = {
      sending_country_id: Number(form.sending_country_id),
      receiving_country_id: Number(form.receiving_country_id),
      exchange_rate: Number(form.exchange_rate),
      commission_percentage: Number(form.commission_percentage),
      is_active: form.is_active,
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("SAVE RESPONSE:", data);

      if (!response.ok) {
        // Handle validation errors
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Failed to save route");
      }

      alert(data.message || (editId ? "Route updated successfully" : "Route created successfully"));
      
      // Reset form
      setForm({
        sending_country_id: "",
        receiving_country_id: "",
        exchange_rate: "",
        commission_percentage: "",
        is_active: true,
      });
      setEditId(null);
      setShowForm(false);
      
      // Refresh routes list
      fetchRoutes();
    } catch (error) {
      console.error("Submit error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  const startEdit = (route) => {
    setEditId(route.id);
    setForm({
      sending_country_id: route.sending_country_id,
      receiving_country_id: route.receiving_country_id,
      exchange_rate: route.exchange_rate,
      commission_percentage: route.commission_percentage,
      is_active: route.is_active,
    });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({
      sending_country_id: "",
      receiving_country_id: "",
      exchange_rate: "",
      commission_percentage: "",
      is_active: true,
    });
    setShowForm(false);
  };

  const activeRoutes = routes.filter(r => r.is_active).length;
  const avgExchangeRate = routes.length > 0 
    ? routes.reduce((sum, r) => sum + parseFloat(r.exchange_rate || 0), 0) / routes.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Transfer Routes
          </h1>
          <p className="text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Manage exchange rates and commission for international transfers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FiGlobe className="text-white text-xl" />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Total Routes
            </p>
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {routes.length}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FiCheck className="text-white text-xl" />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Active Routes
            </p>
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {activeRoutes}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FiTrendingUp className="text-white text-xl" />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Avg Exchange Rate
            </p>
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {avgExchangeRate.toFixed(2)}
            </h3>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              All Transfer Routes
            </h2>
            <div className="flex gap-3">
              <button
                onClick={fetchRoutes}
                disabled={loading}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <FiPlus />
                Add New Route
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

        {/* Form Modal */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {editId ? "Edit Transfer Route" : "Create New Transfer Route"}
              </h3>
              <button
                onClick={cancelEdit}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sending Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Sending Country ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="sending_country_id"
                    placeholder="e.g. 1"
                    value={form.sending_country_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                    required
                  />
                </div>

                {/* Receiving Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Receiving Country ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="receiving_country_id"
                    placeholder="e.g. 2"
                    value={form.receiving_country_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                    required
                  />
                </div>

                {/* Exchange Rate */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Exchange Rate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="exchange_rate"
                    placeholder="e.g. 1.25"
                    value={form.exchange_rate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Must be greater than or equal to 0</p>
                </div>

                {/* Commission */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Commission Percentage <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    name="commission_percentage"
                    placeholder="e.g. 2.5"
                    value={form.commission_percentage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Range: 0 - 100</p>
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Status
                  </label>
                  <select
                    name="is_active"
                    value={form.is_active}
                    onChange={(e) =>
                      setForm({ ...form, is_active: e.target.value === "true" })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 mt-8">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {editId ? (
                    <>
                      <FiCheck /> Update Route
                    </>
                  ) : (
                    <>
                      <FiPlus /> Create Route
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Routes Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : routes.length === 0 ? (
            <div className="text-center py-20">
              <FiGlobe className="mx-auto text-gray-300 text-6xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                No Transfer Routes
              </h3>
              <p className="text-gray-500 mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Get started by creating your first transfer route
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <FiPlus /> Create First Route
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Route ID
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      From Country
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      To Country
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Exchange Rate
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Commission
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Status
                    </th>
                    <th className="py-4 px-6 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {routes.map((route) => (
                    <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          #{route.id}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {route.sending_country_id}
                            </span>
                          </div>
                          <span className="text-gray-900 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            Country ID: {route.sending_country_id}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <FiArrowRight className="text-gray-400" />
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-purple-600 font-bold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {route.receiving_country_id}
                            </span>
                          </div>
                          <span className="text-gray-900 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            Country ID: {route.receiving_country_id}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {Number(route.exchange_rate).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          {Number(route.commission_percentage).toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            route.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-2 ${
                              route.is_active ? "bg-green-500" : "bg-gray-500"
                            }`}
                          ></span>
                          {route.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => startEdit(route)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                          <FiEdit2 /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}