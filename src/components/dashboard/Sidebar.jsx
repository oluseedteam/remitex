import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/android.png";
import { FaExchangeAlt, FaHistory, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const menu = [
    { name: "Exchange", path: "/exchange", icon: <FaExchangeAlt /> },
    { name: "History", path: "/history", icon: <FaHistory /> },
    { name: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <>
      {/* Desktop Sidebar (always visible) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1D1F1A] text-white shadow-lg py-6">
        <div className="flex items-center justify-center mb-10 px-4">
          <img src={logo} alt="Dashboard Logo" className="w-40" />
        </div>
        <nav>
          {menu.map((item) => (
            <NavLink
              style={{fontFamily: "Outfit"}}
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 mb-2 no-underline rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#0328EE] font-semibold"
                    : "text-[#8C8C8C] hover:bg-[#2A2D24] hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar (slide in/out) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={toggleSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar itself */}
            <motion.aside
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-[#1D1F1A] text-white shadow-lg py-6 z-50"
            >
              <div className="flex items-center justify-center mb-10 px-4">
                <img src={logo} alt="Dashboard Logo" className="w-20" />
              </div>
              <nav>
                {menu.map((item) => (
                  <NavLink
                    to={item.path}
                    key={item.name}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-5 py-3 mb-2 no-underline rounded-md transition-all duration-200 ${
                        isActive
                          ? "bg-white text-[#0328EE] font-semibold"
                          : "text-[#8C8C8C] hover:bg-[#2A2D24] hover:text-white"
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
