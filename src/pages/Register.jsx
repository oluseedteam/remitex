import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle, FiArrowRight } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required';
    } else if (formData.full_name.length > 255) {
      errors.full_name = 'Full name must be less than 255 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    } else if (formData.email.length > 255) {
      errors.email = 'Email must be less than 255 characters';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!formData.password_confirmation) {
      errors.password_confirmation = 'Please confirm your password';
    } else if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    const url = 'https://api.remitex.co/api/auth/register';
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData)
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from server
        if (response.status === 422 && data.errors) {
          setValidationErrors(data.errors);
          setError('Please check the form for errors');
        } else {
          setError(data.message || 'Registration failed. Please try again.');
        }
        return;
      }

      // Success
      setSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      });

    } catch (err) {
      console.error('Registration error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success Screen
  if (success) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="text-white text-4xl" />
            </div>
            <h2 style={{fontFamily: 'Dm Sans'}} className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your account has been created successfully. Please wait for admin approval before logging in.
            </p>
            <div className="bg-blue-50 rounded-2xl p-4 mb-6">
              <p className="text-sm text-blue-900 font-medium">
                We'll send you an email notification once your account is approved.
              </p>
            </div>
            <a
              href="/login"
              style={{fontFamily: 'Dm Sans'}}
              className="inline-flex items-center gap-2 bg-[#0328ee] text-white px-8 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Go to Login <FiArrowRight />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Registration Form
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* Registration Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <FiAlertCircle className="text-red-600 text-xl shrink-0 mt-0.5" />
              <div>
                <h4 className="text-red-900 font-semibold text-sm">Registration Error</h4>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label style={{fontFamily: 'Dm Sans'}} className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all ${
                    validationErrors.full_name
                      ? 'border-red-300 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                  maxLength={255}
                />
              </div>
              {validationErrors.full_name && (
                <p className="text-red-600 text-xs mt-1 ml-1">{validationErrors.full_name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={{fontFamily: 'Dm Sans'}} className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all ${
                    validationErrors.email
                      ? 'border-red-300 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                  maxLength={255}
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-600 text-xs mt-1 ml-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label style={{fontFamily: 'Dm Sans'}} className="block text-[16px] font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full pl-12 pr-12 py-2.5 border-2 rounded-xl focus:outline-none transition-all ${
                    validationErrors.password
                      ? 'border-red-300 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-red-600 text-xs mt-1 ml-1">{validationErrors.password}</p>
              )}
              <p className="text-xs text-gray-500 mt-1 ml-1">Must be at least 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{fontFamily: 'Dm Sans'}} className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full pl-12 pr-12 py-2.5 border-2 rounded-xl focus:outline-none transition-all ${
                    validationErrors.password_confirmation
                      ? 'border-red-300 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {validationErrors.password_confirmation && (
                <p className="text-red-600 text-xs mt-1 ml-1">{validationErrors.password_confirmation}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{fontFamily: 'Dm Sans'}}
              className="w-full bg-[#0328ee] text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <FiArrowRight />
                </>
              )}
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-6">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>

          {/* Login Link */}
          <div style={{fontFamily: 'Dm Sans'}} className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 font-semibold hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <FiAlertCircle className="text-blue-600 text-xl shrink-0 mt-0.5" />
            <div>
              <h4 style={{fontFamily: 'Dm Sans'}} className="text-blue-900 font-semibold text-sm">Account Approval Required</h4>
              <p className="text-blue-700 text-xs mt-1">
                After registration, your account will be reviewed by our admin team. You'll receive an email once approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;