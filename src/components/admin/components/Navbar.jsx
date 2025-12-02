// src/components/Navbar.jsx
import { FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <header
      className="
        h-16 bg-white shadow-md flex items-center px-6
        fixed top-0 right-0 z-30 w-full 
        transition-all duration-300
        md:ml-64
      "
    >
      {/* Spacer to push icons to the far right */}
      <div className="flex-1"></div>

      <div className="flex items-center gap-6">
        <FiBell className="text-xl cursor-pointer hover:text-blue-600 transition" />
        <FiUser className="text-xl cursor-pointer hover:text-blue-600 transition" />
      </div>
    </header>
  );
};

export default Navbar;
