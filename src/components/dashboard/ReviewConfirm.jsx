import { CheckCircle } from "lucide-react";

const ReviewConfirm = ({ onNext, onBack, transferData }) => {
  const apiResponse =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("transferResult"))
      : null;

  if (!apiResponse) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No transfer data found
      </p>
    );
  }

  const { transfer_summary, recipient } = apiResponse;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
          <CheckCircle className="text-blue-600" size={28} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Review & Confirm</h2>
        <p className="text-gray-500 text-sm text-center">
          Double-check your transfer details before confirming
        </p>
      </div>

      {/* Transfer Summary */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-700">Transfer Summary</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Amount to Send:</span>
            <span className="font-medium">{transferData.amount} {transferData.fromCurrency?.value}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount Recipient Will Receive:</span>
            <span className="font-medium">{transfer_summary.amount_received} {transferData.toCurrency?.value}</span>
          </div>
          <div className="flex justify-between">
            <span>Exchange Rate:</span>
            <span className="font-medium">{transfer_summary.exchange_rate}</span>
          </div>
          <div className="flex justify-between">
            <span>Commission ({transfer_summary.commission_percentage}%):</span>
            <span className="font-medium">{transfer_summary.commission_amount}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Total Cost:</span>
            <span>{transfer_summary.total_cost}</span>
          </div>
        </div>
      </div>

      {/* Recipient Details */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-700">Recipient Details</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Name:</span>
            <span className="font-medium">{recipient.full_name}</span>
          </div>
          <div className="flex justify-between">
            <span>Bank:</span>
            <span className="font-medium">{recipient.bank_name}</span>
          </div>
          <div className="flex justify-between">
            <span>Account Number:</span>
            <span className="font-medium">{recipient.account_number}</span>
          </div>
          {recipient.email && (
            <div className="flex justify-between">
              <span>Email:</span>
              <span className="font-medium">{recipient.email}</span>
            </div>
          )}
          {recipient.phone && (
            <div className="flex justify-between">
              <span>Phone:</span>
              <span className="font-medium">{recipient.phone}</span>
            </div>
          )}
          {recipient.country_code && (
            <div className="flex justify-between">
              <span>Country Code:</span>
              <span className="font-medium">{recipient.country_code}</span>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
};

export default ReviewConfirm;
