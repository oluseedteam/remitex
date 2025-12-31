import React, { useState } from "react";

const CalculateTransfer = ({ routes }) => {
  const token = localStorage.getItem("token");
  const [routeId, setRouteId] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        "https://api.remitex.co/api/dashboard/calculate-transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            transfer_route_id: Number(routeId),
            amount: Number(amount),
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResult(data.data);
      } else {
        console.error("Calculation error:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Calculate Transfer</h2>
      <form onSubmit={handleCalculate} className="space-y-4">
        <select
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          required
          className="border p-2 rounded w-full"
        >
          <option value="">Select Transfer Route</option>
          {routes.map((r) => (
            <option key={r.id} value={r.id}>
              Route {r.id} - {r.sending_country_id} → {r.receiving_country_id}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          min="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>Amount Sent: {result.amount_sent}</p>
          <p>Exchange Rate: {result.exchange_rate}</p>
          <p>Commission Amount: {result.commission_amount}</p>
          <p>Total Cost: {result.total_cost}</p>
          <p>Amount Received: {result.amount_received}</p>
        </div>
      )}
    </div>
  );
};

export default CalculateTransfer;
