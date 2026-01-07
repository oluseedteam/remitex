import React, { useState } from "react";

const UploadProof = ({ transactionId, setCurrentStep }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    if (!transactionId) {
      setError("Transaction ID is missing");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const form = new FormData();
      form.append("transaction_id", transactionId);
      form.append("proof_of_payment", file);

      const response = await fetch(
        "https://api.remitex.co/api/transfers/upload-proof",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const data = await response.json();
      console.log("UPLOAD RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Upload failed");
      }

      setSuccessMessage(data.message || "Proof uploaded successfully");
      // Move to next step if needed
      // setCurrentStep(nextStepNumber);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md font-Outfit">
      <h2 className="text-xl font-semibold mb-4">Upload Proof of Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0328EE] file:text-white hover:file:bg-blue-700"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0328EE] text-white py-2.5 rounded-lg font-semibold"
        >
          {loading ? "Uploading..." : "Upload Proof"}
        </button>
      </form>
    </div>
  );
};

export default UploadProof;
