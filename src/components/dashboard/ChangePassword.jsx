import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiCheck, FiAlertCircle, FiShield, FiKey } from "react-icons/fi";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { level: strength, text: "Weak", color: "text-red-600 bg-red-100" };
    if (strength <= 3) return { level: strength, text: "Medium", color: "text-yellow-600 bg-yellow-100" };
    return { level: strength, text: "Strong", color: "text-green-600 bg-green-100" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Client-side validation
    if (newPassword !== newPasswordConfirmation) {
      setMessage("New passwords do not match");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setMessage("New password must be at least 8 characters");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api-remitex.wetfieldinc.com/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to change password");
        setMessageType("error");
      } else {
        setMessage(data.message || "Password changed successfully");
        setMessageType("success");
        
        // Clear form
        setCurrentPassword("");
        setNewPassword("");
        setNewPasswordConfirmation("");
      }
    } catch (error) {
      console.error(error);
      setMessage("Network error. Please try again.");
      setMessageType("error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Change Password
          </h1>
          <p className="text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Keep your account secure by updating your password regularly
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
          {/* Security Tips */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <FiShield className="text-white text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Security Tips
              </h3>
              <ul className="space-y-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <FiCheck className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Use at least 8 characters</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <FiCheck className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Mix uppercase and lowercase letters</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <FiCheck className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Include numbers and symbols</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <FiCheck className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Avoid common words or patterns</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <FiCheck className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Don't reuse old passwords</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Change Password Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiKey className="text-blue-600 text-lg" />
                </div>
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Update Your Password
                </h3>
              </div>

              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Current Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter your current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${
                              passwordStrength.level <= 2 ? 'bg-red-500' :
                              passwordStrength.level <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(passwordStrength.level / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${passwordStrength.color}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          {passwordStrength.text}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Password strength: {passwordStrength.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={newPasswordConfirmation}
                      onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                      required
                      minLength={8}
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {newPasswordConfirmation && newPassword !== newPasswordConfirmation && (
                    <p className="text-xs text-red-600 mt-1 ml-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Passwords do not match
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Changing Password...
                      </>
                    ) : (
                      <>
                        <FiLock /> Change Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-900 font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Keep Your Account Secure
                  </h4>
                  <p className="text-blue-700 text-xs mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    After changing your password, you'll remain logged in on this device. You may need to log in again on other devices.
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

export default ChangePassword;