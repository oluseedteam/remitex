import React from "react";

const AccountDetails = () => {
  return (
    <div className="grid place-content-center mt-8 px-4">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1
          className="text-2xl font-semibold text-gray-800"
          style={{ fontFamily: "DM Sans" }}
        >
          Your Account Details
        </h1>
        <p
          className="text-sm text-gray-600 mt-1"
          style={{ fontFamily: "Outfit" }}
        >
          Enter the account details you want to use for receiving money
        </p>
      </div>

      {/* Form Section */}
      <form
        className="bg-[#E4E7EC] p-6 rounded-2xl shadow-md w-[350px] sm:w-[400px] space-y-5"
      >
        {/* Account Name */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="account-name"
            className="text-sm font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Account Name
          </label>
          <input
            type="text"
            id="account-name"
            placeholder="Enter account name"
            className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
          />
        </div>

        {/* Account Number */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="account-number"
            className="text-sm font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Account Number
          </label>
          <input
            type="tel"
            id="account-number"
            placeholder="Enter account number"
            maxLength="10"
            className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
          />
        </div>

        {/* Bank Name */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="bank-name"
            className="text-sm font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Bank Name
          </label>
          <input
            type="text"
            id="bank-name"
            placeholder="Enter bank name"
            className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#0328EE] text-white py-2 rounded-lg font-semibold hover:bg-[#021fc1] transition-all"
          style={{ fontFamily: "Outfit" }}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default AccountDetails;
