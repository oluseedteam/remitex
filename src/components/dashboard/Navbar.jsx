import React from "react";
import { Bell } from "lucide-react";
import { HiOutlineMenu } from "react-icons/hi";
// import { FaBars } from "react-icons/fa";
import user from "../../assets/Avatar.png";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav
      className="flex items-center justify-between px-4 py-3 md:px-8 border-b border-gray-200 shadow-sm"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Left: Menu icon (visible only on mobile) */}
      <button
        className="md:hidden text-gray-700 text-2xl hover:text-blue-600 transition-colors"
        onClick={toggleSidebar}
      >
        <HiOutlineMenu />
      </button>

      {/* Right: Notification + User (always visible) */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Notification Icon */}
        <Bell className="w-5 h-5 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors" />

        {/* User Info */}
        <div className="flex items-center gap-2">
          <img
            src={user}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-gray-800 hidden sm:inline">
            John Doe
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
