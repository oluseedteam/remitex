import React, { useState } from "react";
import Select from "react-select";
import CurrencyFlag from "react-currency-flags";

const ExchangeForm = ({ setCurrentStep, setTransferData }) => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const currencyOptions = [
    { value: "CAD", label: "CAD" },
    { value: "NGN", label: "NGN" },
  ];

  // TEMP routes (must match backend IDs)
  const routes = [
    { id: 1, from: "NGN", to: "CAD" },
    { id: 2, from: "CAD", to: "NGN" },
  ];

  const selectedRoute = routes.find(
    (r) =>
      r.from === fromCurrency?.value &&
      r.to === toCurrency?.value
  );

  const handleSubmit = async () => {
    if (!amount || !fromCurrency || !toCurrency) {
      alert("Please fill all fields");
      return;
    }

    if (!selectedRoute) {
      alert("No transfer route available for this currency pair");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://api.remitex.co/api/transfers/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            transfer_route_id: selectedRoute.id,
            amount: Number(amount),
          }),
        }
      );

      const result = await res.json();
      console.log("INITIATE RESPONSE:", result);

      if (!res.ok) {
        throw new Error(result?.message || "Transfer failed");
      }

      /**
       * 🔑 STORE DATA EXACTLY AS API RETURNS IT
       */
      const transferData = {
        ...result.data,
        inputAmount: amount,
        fromCurrency: fromCurrency.value,
        toCurrency: toCurrency.value,
      };

      setTransferData(transferData);
      setCurrentStep(2);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const customOption = ({ label, value }) => (
    <div className="flex items-center gap-2">
      <CurrencyFlag currency={value} size="sm" />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="grid place-content-center mt-6 px-4 font-Outfit">
      <div className="bg-[#E4E7EC] p-6 rounded-2xl w-[360px] space-y-4">
        <h1 className="text-xl font-semibold text-center font-Outfit">Transfer</h1>

        <Select
          options={currencyOptions}
          value={fromCurrency}
          onChange={setFromCurrency}
          placeholder="From"
          formatOptionLabel={customOption}
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          min={0.01}
          step={0.01}
          className="w-full p-2 border rounded-lg"
        />

        <Select
          options={currencyOptions}
          value={toCurrency}
          onChange={setToCurrency}
          placeholder="To"
          formatOptionLabel={customOption}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#0328EE] text-white py-2 rounded-lg"
        >
          {loading ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default ExchangeForm;
