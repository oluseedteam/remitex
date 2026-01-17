import { CheckCircle } from "lucide-react";

const DepositInfo = ({ transferData }) => {
  const apiResponse = transferData.apiResponse;

  if (!apiResponse) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No transfer data found
      </p>
    );
  }

  const { deposit_account, transfer_summary } = apiResponse;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
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
        <h3 className="font-semibold text-gray-700">Deposit Account</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Bank:</strong> {deposit_account.bank_name}
          </p>
          <p>
            <strong>Account Name:</strong> {deposit_account.account_holder_name}
          </p>
          <p>
            <strong>Account Number:</strong> {deposit_account.account_number}
          </p>
          <p>
            <strong>Bank Address:</strong> {deposit_account.bank_address}
          </p>
        </div>
      </div>

      {/* Amount to Deposit */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-2">Amount to Deposit</h3>
        <div className="flex justify-between text-gray-700 font-medium text-lg">
          <span>Total Cost:</span>
          <span>{transfer_summary.total_cost}</span>
        </div>
      </div>

      {/* Optional: CTA Button */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          After depositing, your transfer will be processed automatically.
        </p>
      </div>
    </div>
  );
};

export default DepositInfo;
