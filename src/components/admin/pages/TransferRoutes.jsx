import React, { useEffect, useState } from "react";

const API_BASE = "https://api.remitex.co/api/admin";

export default function TransferRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

    const token = localStorage.getItem("token"); // Get token from logged-in admin

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
      console.log("ROUTES:", data);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to fetch routes");
      }

      // If routes is a string (as in your API example), convert to empty array or parse if needed
      const routeList = Array.isArray(data?.data?.routes)
        ? data.data.routes
        : [];
      setRoutes(routeList);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // CREATE or UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Admin not logged in");
      return;
    }

    const url = editId
      ? `${API_BASE}/transfer-routes/${editId}`
      : `${API_BASE}/transfer-routes`;

    const method = editId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          sending_country_id: Number(form.sending_country_id),
          receiving_country_id: Number(form.receiving_country_id),
          exchange_rate: Number(form.exchange_rate),
          commission_percentage: Number(form.commission_percentage),
        }),
      });

      const data = await response.json();
      console.log("SAVE RESPONSE:", data);

      if (!response.ok) throw new Error(data.message || "Failed to save route");

      alert(editId ? "Route updated" : "Route created");
      setForm({
        sending_country_id: "",
        receiving_country_id: "",
        exchange_rate: "",
        commission_percentage: "",
        is_active: true,
      });
      setEditId(null);
      fetchRoutes();
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  // Load data into form when editing
  const startEdit = (route) => {
    setEditId(route.id);
    setForm({
      sending_country_id: route.sending_country_id,
      receiving_country_id: route.receiving_country_id,
      exchange_rate: route.exchange_rate,
      commission_percentage: route.commission_percentage,
      is_active: route.is_active,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-xl font-bold mb-4">Manage Transfer Routes</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
        <h3 className="font-semibold mb-3">
          {editId ? "Edit Transfer Route" : "Create New Transfer Route"}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="sending_country_id"
            placeholder="Sending Country ID"
            value={form.sending_country_id}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="number"
            name="receiving_country_id"
            placeholder="Receiving Country ID"
            value={form.receiving_country_id}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="number"
            name="exchange_rate"
            placeholder="Exchange Rate"
            value={form.exchange_rate}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="number"
            name="commission_percentage"
            placeholder="Commission %"
            value={form.commission_percentage}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <select
            name="is_active"
            value={form.is_active}
            onChange={(e) =>
              setForm({ ...form, is_active: e.target.value === "true" })
            }
            className="p-2 border rounded"
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white mt-4 px-4 py-2 rounded"
        >
          {editId ? "Update Route" : "Create Route"}
        </button>
      </form>

      {/* ROUTES TABLE */}
      <h3 className="font-semibold mb-2">All Transfer Routes</h3>

      {loading ? (
        <p>Loading...</p>
      ) : routes.length === 0 ? (
        <p>No transfer routes found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Commission</th>
              <th className="border p-2">Active</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {routes.map((r) => (
              <tr key={r.id}>
                <td className="border p-2">{r.id}</td>
                <td className="border p-2">{r.sending_country_id}</td>
                <td className="border p-2">{r.receiving_country_id}</td>
                <td className="border p-2">{r.exchange_rate}</td>
                <td className="border p-2">{r.commission_percentage}%</td>
                <td className="border p-2">
                  {r.is_active ? "Active" : "Inactive"}
                </td>
                <td className="border p-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => startEdit(r)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
