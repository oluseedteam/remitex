import React, { useState, useEffect } from "react";

const AccountDetails = ({ setCurrentStep, transferData }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    bank_name: "",
    account_number: "",
    bank_address: "",
    country_code: "",
    additional_info: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  // Prefill country code if available from transfer data
  useEffect(() => {
    if (transferData?.toCurrency) {
      const countryCodeMap = {
        NGN: "NG",
        CAD: "CA",
      };
      setFormData(prev => ({
        ...prev,
        country_code: countryCodeMap[transferData.toCurrency] || "",
      }));
    }
  }, [transferData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    } else if (formData.full_name.length > 255) {
      newErrors.full_name = "Full name must be 255 characters or less";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && formData.phone.length > 20) {
      newErrors.phone = "Phone number must be 20 characters or less";
    }

    if (!formData.bank_name.trim()) {
      newErrors.bank_name = "Bank name is required";
    } else if (formData.bank_name.length > 255) {
      newErrors.bank_name = "Bank name must be 255 characters or less";
    }

    if (!formData.account_number.trim()) {
      newErrors.account_number = "Account number is required";
    } else if (formData.account_number.length > 50) {
      newErrors.account_number = "Account number must be 50 characters or less";
    }

    if (formData.bank_address && formData.bank_address.length > 255) {
      newErrors.bank_address = "Bank address must be 255 characters or less";
    }

    if (formData.country_code && formData.country_code.length > 3) {
      newErrors.country_code = "Country code must be 3 characters or less";
    }

    if (formData.additional_info && formData.additional_info.length > 500) {
      newErrors.additional_info = "Additional info must be 500 characters or less";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare the payload - only include non-empty optional fields
      const payload = {
        full_name: formData.full_name,
        bank_name: formData.bank_name,
        account_number: formData.account_number,
      };

      // Add optional fields only if they have values
      if (formData.email) payload.email = formData.email;
      if (formData.phone) payload.phone = formData.phone;
      if (formData.bank_address) payload.bank_address = formData.bank_address;
      if (formData.country_code) payload.country_code = formData.country_code;
      if (formData.additional_info) payload.additional_info = formData.additional_info;

      const response = await fetch(
        "https://api.remitex.co/api/transfers/add-recipient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("ADD RECIPIENT RESPONSE:", data);

      if (!response.ok) {
        if (data.errors) {
          // Handle validation errors from API
          setErrors(data.errors);
          const firstError = Object.values(data.errors)[0];
          alert(Array.isArray(firstError) ? firstError[0] : firstError);
        } else {
          alert(data?.message || "Failed to add recipient details");
        }
        return;
      }

      // Store recipient data for next step
      if (typeof window !== 'undefined') {
        localStorage.setItem('recipientData', JSON.stringify(data.data));
      }

      alert("Recipient details added successfully!");

      // Move to next step
      if (typeof setCurrentStep === 'function') {
        setCurrentStep(3);
      }
    } catch (err) {
      console.error(err);
      alert("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-content-center mt-8 px-4">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1
          className="text-2xl font-semibold text-gray-800"
          style={{ fontFamily: "DM Sans" }}
        >
          Recipient Details
        </h1>
        <p
          className="text-[15px] text-gray-600 mt-2"
          style={{ fontFamily: "Outfit" }}
        >
          Enter the account details for receiving money
        </p>
        {transferData?.toCurrency && (
          <div className="mt-3 inline-block bg-[#E4F6F2] px-4 py-2 rounded-lg">
            <p className="text-xs text-gray-700" style={{ fontFamily: "Outfit" }}>
              Receiving in: <span className="font-semibold">{transferData.toCurrency}</span>
            </p>
          </div>
        )}
      </div>

      {/* Form Section */}
      <div className="bg-[#E4E7EC] p-6 rounded-2xl shadow-md w-[350px] sm:w-[500px] space-y-4">
        {/* Full Name */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="full_name"
            className="text-[15px] font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter recipient's full name"
            className={`p-2.5 rounded-lg border ${
              errors.full_name ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0328EE] focus:border-[#0328EE] outline-none text-[15px]`}
            maxLength={255}
          />
          {errors.full_name && (
            <span className="text-xs text-red-500">{errors.full_name}</span>
          )}
        </div>

        {/* Email (Optional) */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="email"
            className="text-[15px] font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Email <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="recipient@example.com"
            className={`p-2.5 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0328EE] focus:border-[#0328EE] outline-none text-[15px]`}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email}</span>
          )}
        </div>

        {/* Phone (Optional) */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="phone"
            className="text-[15px] font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+234 800 000 0000"
            maxLength={20}
            className={`p-2.5 rounded-lg border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0328EE] focus:border-[#0328EE] outline-none text-[15px]`}
          />
          {errors.phone && (
            <span className="text-xs text-red-500">{errors.phone}</span>
          )}
        </div>

        {/* Bank Name */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="bank_name"
            className="text-[15px] font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Bank Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="bank_name"
            name="bank_name"
            value={formData.bank_name}
            onChange={handleChange}
            placeholder="Enter bank name"
            className={`p-2.5 rounded-lg border ${
              errors.bank_name ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0328EE] focus:border-[#0328EE] outline-none text-[15px]`}
            maxLength={255}
          />
          {errors.bank_name && (
            <span className="text-xs text-red-500">{errors.bank_name}</span>
          )}
        </div>

        {/* Account Number */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="account_number"
            className="text-[15px] font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Account Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="account_number"
            name="account_number"
            value={formData.account_number}
            onChange={handleChange}
            placeholder="Enter account number"
            maxLength={50}
            className={`p-2.5 rounded-lg border ${
              errors.account_number ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0328EE] focus:border-[#0328EE] outline-none text-[15px]`}
          />
          {errors.account_number && (
            <span className="text-xs text-red-500">{errors.account_number}</span>
          )}
        </div>

        {/* Bank Address (Optional) */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="bank_address"
            className="text-[15px] font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Bank Address <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            id="bank_address"
            name="bank_address"
            value={formData.bank_address}
            onChange={handleChange}
            placeholder="Enter bank address"
            maxLength={255}
            className={`p-2.5 rounded-lg border ${
              errors.bank_address ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0328EE] focus:border-[#0328EE] outline-none text-[15px]`}
          />
          {errors.bank_address && (
            <span className="text-xs text-red-500">{errors.bank_address}</span>
          )}
        </div>

        {/* Country Code (Optional) */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="country_code"
            className="text-[15px] font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Country Code <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            id="country_code"
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            placeholder="e.g., NG, US, GB"
            maxLength={3}
            className={`p-2.5 rounded-lg border ${
              errors.country_code ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0328EE] focus:border-[#0328EE] outline-none text-[15px] uppercase`}
          />
          {errors.country_code && (
            <span className="text-xs text-red-500">{errors.country_code}</span>
          )}
        </div>

        {/* Additional Info (Optional) */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="additional_info"
            className="text-[15px] font-medium text-gray-700"
            style={{ fontFamily: "Outfit" }}
          >
            Additional Information <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <textarea
            id="additional_info"
            name="additional_info"
            value={formData.additional_info}
            onChange={handleChange}
            placeholder="Any additional notes or instructions"
            maxLength={500}
            rows={3}
            className={`p-2.5 rounded-lg border ${
              errors.additional_info ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0328EE] focus:border-[#0328EE] outline-none text-[15px] resize-none`}
          />
          <div className="flex justify-between items-center">
            {errors.additional_info && (
              <span className="text-xs text-red-500">{errors.additional_info}</span>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              {formData.additional_info.length}/500
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="flex-1 bg-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-400 transition-all"
            style={{ fontFamily: "Outfit" }}
            disabled={loading}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-[#0328EE] text-white py-2.5 rounded-lg font-semibold hover:bg-[#021fc1] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "Outfit" }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;