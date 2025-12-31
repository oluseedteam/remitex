import React, { useEffect, useState } from "react";
import CalculateTransfer from "./CalculateTransfer";

const DashboardMain = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.remitex.co/api/dashboard", {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setDashboardData(data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!dashboardData) return <p>Error loading dashboard data</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <p>
        <strong>Countries:</strong> {dashboardData.countries}
      </p>
      <p>
        <strong>Transfer Routes:</strong> {dashboardData.transfer_routes}
      </p>

      <CalculateTransfer routes={dashboardData.transfer_routes || []} />
    </div>
  );
};

export default DashboardMain;
