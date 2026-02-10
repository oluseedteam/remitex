import { CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

const DepositInfo = ({ transferData }) => {
  const apiResponse = transferData.apiResponse;
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  if (!apiResponse) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No transfer data found
      </p>
    );
  }

  const { deposit_account, transfer_summary } = apiResponse;

  const handlePaymentSubmit = () => {
    // TODO: call API to notify admin
    setPaymentSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
      {/* BEFORE PAYMENT */}
      {!paymentSubmitted ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-green-800">
              Transfer Request Created!
            </h2>
            <p className="text-gray-600">
              Please deposit the total cost to the account below to complete your transfer.
            </p>
          </div>

          {/* Deposit Account Info */}
          <div className="bg-blue-50 p-4 rounded-xl shadow-sm space-y-2">
            <h3 className="font-semibold text-gray-700 text-xl">
              Deposit Account
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Bank:</strong> {deposit_account.bank_name}</p>
              <p><strong>Account Name:</strong> {deposit_account.account_holder_name}</p>
              <p className="text-lg">
                <strong>Account Number:</strong> {deposit_account.account_number}
              </p>
              <p><strong>Bank Address:</strong> {deposit_account.bank_address}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">
              Amount to Deposit
            </h3>
            <div className="flex justify-between text-gray-700 font-medium text-lg">
              <span>Total Cost:</span>
              <span>{transfer_summary.total_cost}</span>
            </div>
          </div>

          {/* Button */}
          <div className="text-center">
            <button
              onClick={handlePaymentSubmit}
              className="bg-blue-700 text-white px-10 py-3 rounded-xl font-medium hover:bg-blue-900 transition"
            >
              I have made payment
            </button>
          </div>
        </div>
      ) : (
        /* AFTER PAYMENT — ONLY THIS SHOWS */
        <div className="space-y-6 text-center animate-fade-in">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={32} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-green-800">
            Payment Submitted Successfully
          </h2>

          <p className="text-gray-600">
            Thank you for your payment. We’ve notified our team and your transfer
            will be processed once payment is confirmed.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            <span>Status: Awaiting confirmation</span>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
            Confirmation usually takes <strong>5–30 minutes</strong> during business hours.
            You’ll be notified once it’s approved.
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositInfo;
