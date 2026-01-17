import { useState } from "react";
import transferAPI from "../../api/transferAPI";

const RecipentDetailsForm = ({ onNext, onBack, transferData, setTransferData, token }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    bank_name: "",
    account_number: "",
    bank_address: "",
    country_code: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.full_name || !formData.bank_name || !formData.account_number) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        transfer_route_id: transferData.transfer_route_id,
        amount: Number(transferData.amount),
        recipient: formData
      };

      const result = await transferAPI.createTransfer(payload, token);
      const apiData = result.data;

      localStorage.setItem("transferResult", JSON.stringify(apiData));
      setTransferData(prev => ({ ...prev, apiResponse: apiData }));
      onNext();
    } catch (err) {
      console.error(err);
      alert(err.message || "Transfer creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Recipient Details</h2>
      <p className="text-gray-500 text-sm text-center">
        Enter the recipient's bank details for the transfer
      </p>

      {/* Required Fields */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Recipient's full name"
            className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Bank Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="bank_name"
            value={formData.bank_name}
            onChange={handleChange}
            placeholder="Bank name"
            className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Account Number <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="account_number"
            value={formData.account_number}
            onChange={handleChange}
            placeholder="Account number"
            className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Optional Fields */}
      <div className="space-y-4 mt-6 bg-gray-50 p-4 rounded-xl">
        <h3 className="text-gray-600 font-semibold text-sm mb-2">Optional Info</h3>
        <div>
          <label className="text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="recipient@example.com"
            className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+234 800 000 0000"
            className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">Country Code</label>
          <input
            type="text"
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            placeholder="NG, US, GB"
            className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 uppercase"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default RecipentDetailsForm;
