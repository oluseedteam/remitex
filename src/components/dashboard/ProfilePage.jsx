import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiMapPin, FiFileText, FiCamera, FiCheck, FiAlertCircle, FiSave, FiRefreshCw } from "react-icons/fi";

const ProfilePage = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    description: "",
    address: "",
    profile_image: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Fetch current user details
  const fetchUser = async () => {
    setFetchingUser(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api.remitex.co/api/user/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setForm({
          full_name: data.full_name || "",
          email: data.email || "",
          description: data.description || "",
          address: data.address || "",
          profile_image: data.profile_image || "",
        });
      } else {
        console.error(data);
        setMessage("Failed to load profile data");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setMessage("Network error. Please try again.");
      setMessageType("error");
    }
    setFetchingUser(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle image upload and convert to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size should be less than 5MB");
      setMessageType("error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, profile_image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://api.remitex.co/api/profile/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
        setMessageType("success");
      } else {
        setMessage(data.message || "Error updating profile");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile");
      setMessageType("error");
    }
    setLoading(false);
  };

  if (fetchingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            My Profile
          </h1>
          <p className="text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Manage your personal information and account settings
          </p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 rounded-2xl p-4 flex items-start gap-3 ${
            messageType === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {messageType === 'success' ? (
              <FiCheck className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
            ) : (
              <FiAlertCircle className="text-red-600 text-xl flex-shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className={`font-semibold text-sm ${
                messageType === 'success' ? 'text-green-900' : 'text-red-900'
              }`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                {messageType === 'success' ? 'Success!' : 'Error'}
              </h4>
              <p className={`text-sm ${
                messageType === 'success' ? 'text-green-700' : 'text-red-700'
              }`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {message}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Image Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Profile Picture
              </h3>
              
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  {form.profile_image ? (
                    <img
                      src={form.profile_image}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                      {form.full_name ? form.full_name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:shadow-lg transition-all">
                    <FiCamera />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <p className="text-sm text-gray-500 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Click the camera icon to upload
                </p>
                <p className="text-xs text-gray-400" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  JPG, PNG or GIF (Max 5MB)
                </p>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Account Status
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Member Since
                  </span>
                  <span className="font-medium text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Personal Information
                </h3>
                <button
                  onClick={fetchUser}
                  className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Refresh data"
                >
                  <FiRefreshCw />
                </button>
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Enter your full name"
                      value={form.full_name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Address
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-4 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Bio / Description
                  </label>
                  <div className="relative">
                    <FiFileText className="absolute left-4 top-4 text-gray-400" />
                    <textarea
                      name="description"
                      placeholder="Tell us about yourself..."
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all resize-none"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Brief description for your profile
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FiSave /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-900 font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Profile Privacy
                  </h4>
                  <p className="text-blue-700 text-xs mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Your profile information is private and will only be used to improve your experience on Remitex.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;