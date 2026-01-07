import React, { useEffect, useState } from "react";
import { Copy } from "lucide-react";

const PaymentCheckout = ({ setCurrentStep, transferData }) => {
  const [loading, setLoading] = useState(true);
  const [depositData, setDepositData] = useState(null);
  const [copied, setCopied] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDepositInstructions = async () => {
      try {
        const recipientData = JSON.parse(localStorage.getItem("recipientData"));
        const recipientId = recipientData?.recipient?.id;
        const transferRouteId = transferData?.transfer_summary?.transfer_route_id;

        // 🔍 HARD CHECK
        if (!recipientId || !transferRouteId) {
          console.error("MISSING DATA", { recipientId, transferRouteId });
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://api.remitex.co/api/transfers/deposit-instructions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              transfer_route_id: transferRouteId,
              recipient_id: recipientId,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch deposit instructions");
        }

        console.log("DEPOSIT RESPONSE:", data);
        setDepositData(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositInstructions();
  }, [transferData, token]);

  const copy = (value, key) => {
    if (!value) return;
    navigator.clipboard.writeText(value.toString());
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading deposit instructions…
      </p>
    );
  }

  if (!depositData) {
    return (
      <p className="text-center mt-10 text-red-500">
        Unable to load deposit instructions
      </p>
    );
  }

  // 🔹 Extract important info safely
  const {
    transaction,
    deposit_account,
    instructions,
    amount_sent,
    amount_received,
    currency,
  } = depositData;

  return (
    <div className="grid place-content-center mt-8 px-4 font-Outfit">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Bank Transfer Instructions</h1>
        {instructions && <p className="text-sm text-gray-600 mt-1">{instructions}</p>}
        <p className="text-sm text-gray-600 mt-1">
          Amount to send: <strong>{amount_sent} {currency}</strong>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Amount recipient will receive: <strong>{amount_received} {currency}</strong>
        </p>
      </div>

      <div className="bg-[#E4E7EC] p-6 rounded-2xl w-[360px] space-y-4">
        {[
          ["Transaction ID", transaction?.id, "transaction"],
          ["Bank Name", deposit_account?.bank_name, "bank_name"],
          ["Account Number", deposit_account?.account_number, "account_number"],
          ["Routing Number", deposit_account?.routing_number, "routing_number"],
          ["SWIFT / BIC", deposit_account?.swift_code, "swift_code"],
          ["Payment Reference", transaction?.reference, "reference"],
        ].map(([label, value, key]) => (
          <div
            key={key}
            className="flex justify-between items-center bg-white p-3 rounded-lg"
          >
            <div>
              <p className="text-[15px] text-gray-500">{label}</p>
              <p className="text-[16px] font-semibold">{value || "N/A"}</p>
            </div>
            {value && (
              <Copy
                className={`w-9 h-9 p-2 rounded-full cursor-pointer ${
                  copied === key
                    ? "bg-green-100 text-green-600"
                    : "bg-[#0328EE] text-white"
                }`}
                onClick={() => copy(value, key)}
              />
            )}
          </div>
        ))}

        <button
          onClick={() => setCurrentStep(4)}
          className="w-full bg-[#0328EE] text-white py-2.5 rounded-lg font-semibold"
        >
          I have made the payment
        </button>
      </div>
    </div>
  );
};

export default PaymentCheckout;
