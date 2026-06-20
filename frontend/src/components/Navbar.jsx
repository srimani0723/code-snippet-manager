// src/components/Navbar.jsx
import { FaCode } from "react-icons/fa6";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { VscThreeBars } from "react-icons/vsc";
import { useState, useContext } from "react";
import useAuth from "../hooks/useAuth";
import useFetchMutation from "../hooks/useFetchMutation";
import { toast } from "react-toastify";
import ThemeContext from "../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, themes, toggleTheme } = useContext(ThemeContext);

  const { isAuthenticated, loading, resetAuth } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const logoutMutation = useFetchMutation({ key: "logout", method: "POST" });

  const handleLogin = () => {
    navigate("/login");
    toggleNavbar();
  };

  const handleLogout = () => {
    logoutMutation.mutate(
      { url: "/auth/logout" },
      {
        onSuccess: () => {
          resetAuth();
          toast.success("Logged out successfully!");
        },
        onError: (error) => {
          toast.error(`Logout failed! ${error.message}`);
        },
      },
    );
    setIsNavOpen(false);
    navigate("/", { replace: true });
  };

  const themeButton = (extraClass = "") => (
    <button
      type="button"
      onClick={toggleTheme}
      className={`hover:scale-110 transition-all duration-100 cursor-pointer rounded-full p-1 ${theme === themes.DARK ? "bg-primary-border " : "bg-gray-300 "} ${extraClass}`}
    >
      {theme === themes.DARK ? (
        <FaSun className="text-xl text-yellow-200" />
      ) : (
        <FaMoon className="text-xl text-gray-800" />
      )}
    </button>
  );

  const toggleNavbar = () => setIsNavOpen((prev) => !prev);

  const linkClass = (path) =>
    `py-2 px-3 text-sm rounded-3xl w-full md:w-fit transition-all duration-100 cursor-pointer ${
      location.pathname === path
        ? theme === themes.DARK
          ? "bg-primary-bg3 text-gray-100 font-semibold"
          : "bg-blue-100 text-blue-600 font-semibold"
        : theme === themes.DARK
          ? "text-primary-text font-semibold hover:bg-primary-bg3 hover:text-gray-100"
          : "text-gray-700 font-semibold hover:bg-blue-100 hover:text-blue-600"
    }`;

  return (
    <header
      className={`flex items-center px-4 py-3 backdrop-blur-md sticky w-full top-0 z-10  flex-col md:flex-row ${theme === themes.DARK ? "bg-primary-bg2 border-b border-primary-border shadow-md/5 " : "bg-white/60 border-b border-gray-300 shadow-md/5 "}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between w-full md:w-fit">
        <NavLink
          to="/"
          className="text-3xl text-teal-500 flex items-center gap-2 font-semibold"
        >
          <FaCode />

          <span
            className={`font-semibold text-xs lg:text-[15px] font-mono ${theme === themes.DARK ? "text-primary-text " : "text-gray-800 "}`}
          >
            Code Snippet Manager
          </span>
        </NavLink>

        <div className="flex items-center gap-4">
          {themeButton("block md:hidden")}
          <button
            className="block md:hidden hover:scale-120 transition-all duration-100 cursor-pointer"
            type="button"
            onClick={toggleNavbar}
          >
            <VscThreeBars
              className={`text-2xl ${theme === themes.DARK ? "text-primary-text " : "text-gray-800 "}`}
            />
          </button>
        </div>
      </div>

      {/* All Navigations */}
      <nav
        className={`w-full md:w-auto md:ml-auto ml-0 transition-all duration-200 ease-in-out overflow-hidden md:max-h-full md:opacity-100 md:scale-y-100 origin-top
    ${
      isNavOpen
        ? "max-h-fit opacity-100 scale-y-100 pt-4 md:pt-0"
        : "max-h-0 opacity-0 scale-y-95 pt-0 md:pt-0"
    }`}
      >
        <ul className="flex flex-col items-start justify-center md:flex-row md:items-center md:justify-between gap-2 md:p-0 ">
          {themeButton("hidden md:block")}

          <NavLink to="/snippets" className={"w-full md:w-fit"}>
            <li className={linkClass("/snippets")} onClick={toggleNavbar}>
              Explore
            </li>
          </NavLink>

          {isAuthenticated && !loading && (
            <NavLink to="/dashboard" className={"w-full md:w-fit"}>
              <li className={linkClass("/dashboard")} onClick={toggleNavbar}>
                My Dashboard
              </li>
            </NavLink>
          )}

          {!loading && !isAuthenticated && (
            <button
              className="px-3 py-2 bg-blue-500 rounded-3xl text-white text-sm cursor-pointer hover:bg-blue-600 font-semibold w-full md:w-fit"
              onClick={handleLogin}
            >
              Login
            </button>
          )}

          {isAuthenticated && !loading && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-300 text-red-900 text-sm cursor-pointer flex items-center gap-2 rounded-full hover:bg-red-400 shadow-sm font-semibold w-full md:w-fit"
            >
              <PiSignOutBold />
              Logout
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
