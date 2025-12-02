import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiUsers,
  FiHome,
  FiSettings,
  FiDollarSign,
  FiBarChart2,
  FiMenu,
  FiX
} from "react-icons/fi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { path: "/admin", label: "Dashboard", icon: <FiHome /> },
    { path: "/admin/users", label: "Users", icon: <FiUsers /> },
    { path: "/admin/transactions", label: "Transactions", icon: <FiDollarSign /> },
    { path: "/admin/settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-700 text-white p-3 rounded-lg shadow-lg"
        onClick={() => setOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-linear-to-b from-blue-900 to-blue-700 text-white p-6 shadow-xl z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close button (mobile only) */}
        <button
          className="md:hidden text-white absolute top-5 right-5"
          onClick={() => setOpen(false)}
        >
          <FiX size={26} />
        </button>

        <h1 className="text-3xl font-bold tracking-wide mb-10">Remitex Admin</h1>

        <nav className="flex flex-col gap-4">
          {links.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/admin"}
              onClick={() => setOpen(false)} // Auto close on mobile
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-lg 
                ${isActive ? "bg-blue-600 shadow-md" : "hover:bg-blue-500/40"}`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
