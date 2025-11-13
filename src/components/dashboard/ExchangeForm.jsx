import React, { useState } from "react";
import Select from "react-select";
import CurrencyFlag from "react-currency-flags";

const ExchangeForm = ({ setCurrentStep }) => {
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState("");
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);

  const options = [
    { value: "USD", label: "USD" },
    { value: "NGN", label: "NGN" },
    { value: "GBP", label: "GBP" },
    { value: "EUR", label: "EUR" },
    { value: "JPY", label: "JPY" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromCurrency && toCurrency && amount) {
      setConverted((amount * 1500).toFixed(2)); // mock conversion
    }
  };

  // Custom dropdown option (shows flag + label)
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
          Currency Exchange
        </h1>

        {/* From Currency Section */}
        <div style={{ fontFamily: "Outfit" }} className="space-y-2">
          <label className="text-sm font-medium">From</label>
          <Select
            options={options}
            value={fromCurrency}
            onChange={setFromCurrency}
            placeholder="Select currency"
            formatOptionLabel={customOption}
            className="text-sm"
          />

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
          />
        </div>

        {/* Rate Info */}
        <p className="bg-[#E4F6F2] text-sm text-center py-2 rounded-lg font-medium">
          Rate: #1500 - $1
        </p>

        {/* To Currency Section */}
        <div style={{ fontFamily: "Outfit" }} className="space-y-2">
          <label className="text-sm font-medium">To</label>
          <Select
            options={options}
            value={toCurrency}
            onChange={setToCurrency}
            placeholder="Select target currency"
            formatOptionLabel={customOption}
            className="text-sm"
          />

          <input
            type="text"
            value={converted}
            readOnly
            placeholder="Converted amount"
            className="w-full p-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={() => setCurrentStep(2)}
          type="submit"
          className="w-full bg-[#0328EE] text-white py-2 rounded-lg font-semibold hover:bg-[#021fc1] transition-all"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ExchangeForm;
