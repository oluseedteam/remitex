import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";
import { Button } from "./button"; // Button Component
import Logo from "../assets/remlogo.png";
import { linkRoutes } from "../data";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop View */}
      <header className="hidden z-50 md:block fixed top-0 left-0 right-0 text-white" style={{fontFamily: 'Dm Sans'}}>
        <nav className="flex items-center bg-[#0328ee] px-8 md:px-10 py-4 justify-between xl:px-[100px]">
          <div className="flex items-center gap-6">
            <a href="/home"><img src={Logo} alt="Remitlex Logo" className="h-8 w-auto" /></a>
            <span className="text-white mx-4">|</span>

            <ul className="flex items-center gap-5 lg:gap-6 p-0 list-none text-white">
              {linkRoutes.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    end
                    className={({ isActive }) =>
                      ` font-medium text-[14px] lg:text-[16px] transition-all duration-300 ${(isActive ||
                        (link.path === "/" && (location.pathname === "/" || location.pathname === "/home")) ||
                        (link.path === "/home" && (location.pathname === "/" || location.pathname === "/home"))
                      )
                        ? "underline text-white border-b-2 border-blue-400 pb-1"
                        : "no-underline text-white hover:text-blue-300"
                      }`
                    }




                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section: Button */}
          <Button
            clickHandler={() => navigate("/dashboard")}
            title="Signup / Login"
            type="light"
          />
        </nav>
      </header>

      {/* Mobile */}
      <header className="block fixed z-50 top-0 left-0 right-0 bg-[#0328ee] text-white md:hidden px-8 py-5">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <img src={Logo} alt="Remitlex Logo" className="h-8 w-auto" />

          {/* Hamburger Menu */}
          {isOpen ? (
            <MdClose
              size={25}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <MdMenu
              size={25}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer"
            />
          )}
        </nav>

        {/* Mobile Dropdown Menu with Animation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg py-4"
          >
            <ul className="pr-8 flex flex-col items-center justify-center list-none  text-blue-900 ">
              {linkRoutes.map((link, index) => (
                <li key={index} className="w-full text-center">
                  <NavLink
                    to={link.path}
                    end
                    className={({ isActive }) =>
                      `block py-3 w-full transition-all no-underline duration-300 relative ${(isActive ||
                        (link.path === "/" && (location.pathname === "/" || location.pathname === "/home")) ||
                        (link.path === "/home" && (location.pathname === "/" || location.pathname === "/home"))
                      )
                        ? "text-blue-400 before:content-['•'] before:text-2xl before:text-blue-400 before:absolute before:left-[30%] before:top-[12%] before:transform before:translate-y-[-5%]"
                        : "text-[#97A7FD] hover:text-blue-500"
                      }`
                    }

                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                  {index < linkRoutes.length - 1 && (
                    <hr className="w-4/5 mx-auto border-gray-200" />
                  )}
                </li>
              ))}
              <div className="w-full flex justify-center mt-3">
                <Button
                  clickHandler={() => {
                    navigate("/");
                    setIsOpen(false);
                  }}
                  title="Signup/Login"
                  type="dark"
                />
              </div>
            </ul>
          </motion.div>
        )}
      </header>
    </>
  );
};

export default Navbar;
