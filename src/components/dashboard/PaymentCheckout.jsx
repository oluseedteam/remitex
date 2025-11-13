import React, { useState } from "react";
import { Copy } from "lucide-react";

const PaymentCheckout = ({ setCurrentStep }) => {
  const [copiedField, setCopiedField] = useState("");

  const accountDetails = {
    holder: "John Doe",
    number: "0123456789",
    bank: "GTBank",
    wireRouting: "058",
    achRouting: "111000025",
    accountType: "Checking",
  };

  // Function to copy text
  const handleCopy = (value, field) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);

    // Show alert
    alert(`${field.replace(/([A-Z])/g, " $1")} copied to clipboard!`);

    // Reset highlight
    setTimeout(() => setCopiedField(""), 2000);
  };

  // Helper for rendering each field
  const renderField = (label, value, fieldKey) => (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
      <div>
        <p className="text-xs text-gray-500" style={{ fontFamily: "Outfit" }}>
          {label}
        </p>
        <p
          className="text-sm font-semibold text-gray-800"
          style={{ fontFamily: "DM Sans" }}
        >
          {value}
        </p>
      </div>
      <Copy
        size={24}
        className={`w-10 h-10 p-2 rounded-full cursor-pointer transition-colors ${
          copiedField === fieldKey
            ? "text-green-500 bg-[#D1FADF]"
            : "text-[#F2F4F7] bg-[#0328EE]"
        } hover:text-green-600`}
        onClick={() => handleCopy(value, fieldKey)}
      />
    </div>
  );

  return (
    <div className="grid place-content-center mt-8 px-4">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1
          className="text-2xl font-semibold text-gray-800"
          style={{ fontFamily: "DM Sans" }}
        >
          Send Money Via Bank Transfer
        </h1>
        <p
          className="text-sm text-gray-600 mt-1"
          style={{ fontFamily: "Outfit" }}
        >
          Make a transfer to the account details below.
        </p>
      </div>

      {/* Account Details Card */}
      <div className="bg-[#E4E7EC] p-6 rounded-2xl shadow-md w-[350px] sm:w-[420px] space-y-5">
        {renderField("Account Holder", accountDetails.holder, "holder")}
        {renderField("Account Number", accountDetails.number, "number")}
        {renderField("Bank Name", accountDetails.bank, "bank")}
        {renderField("Wire Routing", accountDetails.wireRouting, "wireRouting")}
        {renderField("ACH Routing", accountDetails.achRouting, "achRouting")}
        {renderField("Account Type", accountDetails.accountType, "accountType")}

        {/* Info note */}
        <p
          className="text-xs text-gray-600 text-center mt-3"
          style={{ fontFamily: "Outfit" }}
        >
          Please ensure the name and account number match before sending your
          payment.
        </p>

        {/* Submit Button */}
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="w-full bg-[#0328EE] text-white py-2 rounded-lg font-semibold hover:bg-[#021fc1] transition-all"
          style={{ fontFamily: "Outfit" }}
        >
          I have made the payment
        </button>
      </div>
    </div>
  );
};

export default PaymentCheckout;
