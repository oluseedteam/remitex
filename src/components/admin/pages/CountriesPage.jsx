import React, { useEffect, useState } from "react";

const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    currency_code: "",
    currency_name: "",
    flag_url: "",
    is_active: true,
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  // Fetch all countries
  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.remitex.co/api/admin/countries", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to fetch countries");
        setLoading(false);
        return;
      }

      setCountries(data?.data?.countries || []);
      setLoading(false);
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Open modal for create or edit
  const openModal = (country = null) => {
    if (country) {
      setEditingCountry(country);
      setFormData(country);
    } else {
      setEditingCountry(null);
      setFormData({
        name: "",
        code: "",
        currency_code: "",
        currency_name: "",
        flag_url: "",
        is_active: true,
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // Submit Create or Update
  const handleSubmit = async () => {
    const url = editingCountry
      ? `https://api.remitex.co/api/admin/countries/${editingCountry.id}`
      : "https://api.remitex.co/api/admin/countries";

    const method = editingCountry ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error saving country");
        return;
      }

      alert(editingCountry ? "Country updated" : "Country created");

      closeModal();
      fetchCountries();
    } catch (err) {
      alert("Network error");
    }
  };

  // Filter countries
  const filteredCountries = countries.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === "all" || 
                         (filterActive === "active" && c.is_active) ||
                         (filterActive === "inactive" && !c.is_active);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-DMSans font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Countries Manager
              </h1>
              <p className="text-slate-600">Manage your global country configurations</p>
            </div>
            
            <button
              onClick={() => openModal()}
              className="group relative px-6 py-3 bg-linear-to-r from-blue-600 cursor-pointer to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              <span className="flex font-Outfit items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Country
              </span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-Outfit">Total Countries</p>
                  <p className="text-2xl font-bold text-slate-800">{countries.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-Outfit">Active</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {countries.filter(c => c.is_active).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-Outfit">Inactive</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {countries.filter(c => !c.is_active).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 mb-6 font-Outfit">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setFilterActive("all")}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                  filterActive === "all"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterActive("active")}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                  filterActive === "active"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterActive("inactive")}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                  filterActive === "inactive"
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          </div>
        )}

        {/* Countries Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.length === 0 ? (
              <div className="col-span-full bg-white rounded-xl p-12 text-center shadow-md border border-slate-200">
                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-slate-500 text-lg">No countries found</p>
              </div>
            ) : (
              filteredCountries.map((c) => (
                <div
                  key={c.id}
                  className="group bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {c.flag_url ? (
                        <img src={c.flag_url} alt={c.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                          {c.code?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 font-DMSans">{c.name}</h3>
                        <p className="text-sm text-slate-500 font-Outfit">{c.code}</p>
                      </div>
                    </div>
                    
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {c.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-slate-600">
                        <span className="font-semibold font-Outfit">{c.currency_code}</span> - {c.currency_name}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => openModal(c)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-blue-50 text-blue-600 font-medium rounded-lg transition-all duration-200 border border-slate-200 hover:border-blue-300"
                  >
                    Edit Country
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="animate-in zoom-in duration-200">
            <div className="bg-white h-130 w-full max-w-2xl rounded-2xl shadow-2xl overflow-scroll">
              <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6">
                <h2 className="text-2xl font-bold text-white font-DMSans">
                  {editingCountry ? "Update Country" : "Create New Country"}
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2 font-DMSans">
                      Country Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g., United States"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 font-DMSans">
                      Country Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      placeholder="e.g., USA"
                      value={formData.code}
                      onChange={handleChange}
                      maxLength={3}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all uppercase"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 font-DMSans">
                      Currency Code
                    </label>
                    <input
                      type="text"
                      name="currency_code"
                      placeholder="e.g., USD"
                      value={formData.currency_code}
                      onChange={handleChange}
                      maxLength={3}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all uppercase"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2 font-DMSans">
                      Currency Name
                    </label>
                    <input
                      type="text"
                      name="currency_name"
                      placeholder="e.g., US Dollar"
                      value={formData.currency_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2 font-DMSans">
                      Flag URL
                    </label>
                    <input
                      type="url"
                      name="flag_url"
                      placeholder="https://example.com/flag.png"
                      value={formData.flag_url}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-all">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-700 font-DMSans">
                        Set as Active Country
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2.5 cursor-pointer font-DMSans bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-linear-to-r font-DMSans cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    {editingCountry ? "Update Country" : "Create Country"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountriesPage;