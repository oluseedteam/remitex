import { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";

const API_BASE = "https://api.remitex.co/api";

// Helper: convert alpha-3 codes to alpha-2 (if your API gives alpha-3)
const alpha3ToAlpha2 = {
  USA: "US",
  NGA: "NG",
  CAN: "CA",
  GBR: "GB",
  // Add more as needed
};

export default function ExchangeForm({ onNext, setTransferData }) {
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry, setToCountry] = useState(null);
  const [amount, setAmount] = useState("");

  const [routes, setRoutes] = useState([]);
  const [loadingRoutes, setLoadingRoutes] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch transfer routes
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await fetch(`${API_BASE}/transfer-routes?per_page=1000`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch transfer routes");

        const data = await res.json();
        const list = Array.isArray(data?.data?.data) ? data.data.data : data.data || [];
        setRoutes(list);
      } catch (err) {
        console.error(err);
        setError("Unable to load transfer routes");
      } finally {
        setLoadingRoutes(false);
      }
    };

    if (token) fetchRoutes();
    else setError("Please login to continue");
  }, [token]);

  // Extract unique countries
  const countries = useMemo(() => {
    const map = new Map();
    routes.forEach((r) => {
      [r.sending_country, r.receiving_country].forEach((c) => {
        if (!c) return;
        let code = c.code.toUpperCase();
        if (code.length === 3 && alpha3ToAlpha2[code]) code = alpha3ToAlpha2[code];

        if (!map.has(c.id)) map.set(c.id, { ...c, code });
      });
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [routes]);

  // Options for react-select
  const options = useMemo(() => countries.map(c => ({
    value: c.id,
    label: c.name,
    code: c.code,
    currency: c.currency_code,
    currencyName: c.currency_name,
  })), [countries]);

  const formatOptionLabel = ({ label, code, currency, currencyName }) => (
    <div className="flex items-center gap-2">
      <ReactCountryFlag countryCode={code} svg style={{ width: "1.5em", height: "1.5em" }} title={label} />
      <div>
        <span className="font-medium">{label}</span>
        {currency && <span className="text-sm text-gray-500"> ({currency} - {currencyName})</span>}
      </div>
    </div>
  );

  // Match route
  const matchedRoute = useMemo(() => {
    if (!fromCountry || !toCountry) return null;
    return routes.find(r =>
      String(r.sending_country_id) === String(fromCountry.value) &&
      String(r.receiving_country_id) === String(toCountry.value)
    );
  }, [fromCountry, toCountry, routes]);

  const handleSubmit = () => {
    if (!fromCountry || !toCountry || !amount) {
      alert("Please fill all fields");
      return;
    }
    if (!matchedRoute) {
      alert(`No route from ${fromCountry.label} to ${toCountry.label}`);
      return;
    }
    if (Number(amount) < 100) {
      alert("Minimum amount is 100");
      return;
    }

    const transferDataObj = {
      from: fromCountry,
      to: toCountry,
      amount: Number(amount),
      transfer_route_id: matchedRoute.id,
      sending_country_id: fromCountry.value,
      receiving_country_id: toCountry.value,
      exchange_rate: matchedRoute.exchange_rate,
      commission_percentage: matchedRoute.commission_percentage,
      route: matchedRoute,
    };

    setTransferData && setTransferData(transferDataObj);
    onNext && onNext();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-center mb-2">Send Money</h2>

      {loadingRoutes && <div className="p-2 bg-blue-50 text-blue-700 rounded">Loading countries...</div>}
      {error && <div className="p-2 bg-red-50 text-red-700 rounded">{error}</div>}

      <div>
        <label className="block font-medium mb-1">From Country</label>
        <Select
          options={options}
          value={fromCountry}
          onChange={setFromCountry}
          formatOptionLabel={formatOptionLabel}
          isLoading={loadingRoutes}
          isDisabled={loadingRoutes || !!error}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">To Country</label>
        <Select
          options={options}
          value={toCountry}
          onChange={setToCountry}
          formatOptionLabel={formatOptionLabel}
          isLoading={loadingRoutes}
          isDisabled={loadingRoutes || !!error}
        />
      </div>

      {fromCountry && toCountry && (
        <div className={`p-3 rounded border ${matchedRoute ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
          {matchedRoute ? (
            <div className="text-green-700 text-sm">
              ✓ Transfer Route Available
              <div>Exchange Rate: 1 {fromCountry.currency} = {matchedRoute.exchange_rate} {toCountry.currency}</div>
              <div>Commission: {matchedRoute.commission_percentage}%</div>
            </div>
          ) : (
            <div className="text-yellow-700 text-sm">⚠️ No route available</div>
          )}
        </div>
      )}

      <div>
        <label className="block font-medium mb-1">Amount to Send</label>
        <input
          type="number"
          min="100"
          step="0.01"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={!matchedRoute}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!matchedRoute || !amount || Number(amount) < 100 || loadingRoutes}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
