// src/layouts/AdminLayout.jsx
import Sidebar from "../../admin/components/Sidebar";
import Navbar from "../../admin/components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Navbar />
      <main className="p-6 pt-20 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
