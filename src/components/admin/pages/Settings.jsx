import React, { useState } from 'react';
import { FiKey, FiMail, FiUser, FiBell, FiShield, FiCamera, FiGlobe, FiMonitor, FiLock, FiSmartphone, FiCheck, FiX } from "react-icons/fi";

const Settings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(false);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium text-sm whitespace-nowrap">
              General
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm whitespace-nowrap">
              Security
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm whitespace-nowrap">
              Notifications
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm whitespace-nowrap">
              Preferences
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                  AU
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <FiCamera size={16} />
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Admin User</h3>
              <p className="text-gray-500 text-sm mb-4">admin@remitex.com</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                Active
              </span>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Member since</span>
                <span className="font-medium text-gray-900">Jan 2024</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Account Type</span>
                <span className="font-medium text-gray-900">Administrator</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Last Login</span>
                <span className="font-medium text-gray-900">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* Main Settings Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* PROFILE SETTINGS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiUser className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                  <p className="text-sm text-gray-500">Update your personal details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      defaultValue="Admin User"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      defaultValue="admin@remitex.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiSmartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    Save Changes
                  </button>
                  <button className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* SECURITY SETTINGS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiShield className="text-green-600 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
                  <p className="text-sm text-gray-500">Keep your account secure</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Password Change */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <FiKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <FiKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium">
                    Update Password
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FiSmartphone className="text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={twoFactorAuth}
                      onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* NOTIFICATION SETTINGS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FiBell className="text-yellow-600 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                  <p className="text-sm text-gray-500">Manage how you receive updates</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FiMail className="text-gray-600 text-xl" />
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={emailAlerts}
                    onChange={() => setEmailAlerts(!emailAlerts)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FiShield className="text-gray-600 text-xl" />
                    <div>
                      <p className="font-medium text-gray-900">Login Alerts</p>
                      <p className="text-sm text-gray-500">Get notified of new logins</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={loginAlerts}
                    onChange={() => setLoginAlerts(!loginAlerts)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FiBell className="text-gray-600 text-xl" />
                    <div>
                      <p className="font-medium text-gray-900">Transaction Alerts</p>
                      <p className="text-sm text-gray-500">Alerts for all transactions</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={transactionAlerts}
                    onChange={() => setTransactionAlerts(!transactionAlerts)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FiMail className="text-gray-600 text-xl" />
                    <div>
                      <p className="font-medium text-gray-900">Marketing Emails</p>
                      <p className="text-sm text-gray-500">Promotional content and updates</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={marketingEmails}
                    onChange={() => setMarketingEmails(!marketingEmails)}
                  />
                </div>
              </div>
            </div>

            {/* PREFERENCES */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FiMonitor className="text-indigo-600 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
                  <p className="text-sm text-gray-500">Customize your experience</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <div className="relative">
                    <FiGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>French</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <div className="relative">
                    <FiGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                      <option>(GMT+01:00) Lagos</option>
                      <option>(GMT+00:00) London</option>
                      <option>(GMT-05:00) New York</option>
                      <option>(GMT+08:00) Singapore</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;