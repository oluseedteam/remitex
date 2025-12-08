import React, { useState, useEffect } from "react";
import Select from "react-select";
import CurrencyFlag from "react-currency-flags";

const ExchangeForm = ({ setCurrentStep, setTransferData }) => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRoutes, setLoadingRoutes] = useState(true);

  const token = localStorage.getItem("token");

  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "NGN", label: "NGN" },
    { value: "GBP", label: "GBP" },
    { value: "EUR", label: "EUR" },
    { value: "JPY", label: "JPY" },
  ];

  // ---------------------------------------------------
  // 1️⃣ FETCH TRANSFER ROUTES FROM BACKEND
  // ---------------------------------------------------
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await fetch("https://api.remitex.co/api/transfer-routes", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("ROUTES:", data);

        if (res.ok && Array.isArray(data.data)) {
          setRoutes(data.data);
        } else {
          alert("Could not load transfer routes.");
        }
      } catch (err) {
        console.error(err);
        alert("Error loading transfer routes.");
      } finally {
        setLoadingRoutes(false);
      }
    };

    fetchRoutes();
  }, [token]);

  // ---------------------------------------------------
  // 2️⃣ FIND THE ROUTE BASED ON SELECTED CURRENCIES
  // ---------------------------------------------------
  const getRouteId = () => {
    if (!fromCurrency || !toCurrency) return null;

    const route = routes.find(
      (r) =>
        r.source_currency === fromCurrency.value &&
        r.destination_currency === toCurrency.value
    );

    return route ? route.id : null;
  };

  // ---------------------------------------------------
  // 3️⃣ HANDLE FORM SUBMIT
  // ---------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !fromCurrency || !toCurrency) {
      alert("Please fill out all fields");
      return;
    }

    const routeId = getRouteId();

    if (!routeId) {
      alert("No valid transfer route for the selected currencies.");
      return;
    }

    console.log("FINAL ROUTE ID SENT:", routeId);

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.remitex.co/api/transfers/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            transfer_route_id: routeId,
            amount: Number(amount),
          }),
        }
      );

      const data = await response.json();
      console.log("INITIATION RESPONSE:", data);

      if (!response.ok) {
        alert(
          data?.message ||
            data?.errors?.transfer_route_id?.[0] ||
            "Transfer initiation failed"
        );
        return;
      }

      // Save data for next step
      setTransferData(data.data);

      // Go to next page
      setCurrentStep(2);
    } catch (err) {
      console.error(err);
      alert("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------
  // Currency Option Renderer
  // ---------------------------------------------------
  const customOption = ({ label, value }) => (
    <div className="flex items-center gap-2">
      <CurrencyFlag currency={value} size="sm" />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="grid place-content-center mt-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#E4E7EC] p-6 rounded-2xl shadow-md w-[350px] sm:w-[400px] space-y-4"
      >
        <h1
          style={{ fontFamily: "DM Sans" }}
          className="text-2xl font-semibold text-center mb-2"
        >
          Transfer
        </h1>

        {loadingRoutes ? (
          <p className="text-center text-sm">Loading routes...</p>
        ) : (
          <>
            {/* From Currency */}
            <div className="space-y-2" style={{ fontFamily: "Outfit" }}>
              <label className="text-sm font-medium">From</label>
              <Select
                options={currencyOptions}
                value={fromCurrency}
                onChange={setFromCurrency}
                placeholder="Select currency"
                formatOptionLabel={customOption}
              />

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              />
            </div>

            {/* Rate Placeholder */}
            <p className="bg-[#E4F6F2] text-sm text-center py-2 rounded-lg font-medium">
              Select currencies to see rate
            </p>

            {/* To Currency */}
            <div className="space-y-2" style={{ fontFamily: "Outfit" }}>
              <label className="text-sm font-medium">To</label>
              <Select
                options={currencyOptions}
                value={toCurrency}
                onChange={setToCurrency}
                placeholder="Select currency"
                formatOptionLabel={customOption}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#0328EE] text-white py-2 rounded-lg font-semibold hover:bg-[#021fc1] transition-all"
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ExchangeForm;
