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
import { FaTerminal } from "react-icons/fa";

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
      className={`cursor-pointer rounded-full p-1 transition-all duration-100 ${theme === themes.DARK ? "bg-primary-border " : "bg-gray-300 "} ${extraClass}`}
    >
      {theme === themes.DARK ? (
        <FaSun className="text-xl text-yellow-200" />
      ) : (
        <FaMoon className="text-xl text-gray-800" />
      )}
    </button>
  );

  const toggleNavbar = () => setIsNavOpen((prev) => !prev);

  const closeNavbar = () => setIsNavOpen(false);

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
      className={`border-box sticky top-0 z-100 flex w-full items-center justify-center px-4 py-2 backdrop-blur-md ${
        theme === themes.DARK
          ? "bg-primary-bg2 border-b border-gray-600 "
          : "border-b border-gray-300 bg-white/60 shadow-md/5"
      }`}
    >
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-between md:flex-row lg:max-w-[90%]">
        {/* Logo */}
        <div className="flex w-full items-center justify-between md:w-fit">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-3xl font-semibold"
          >
            <FaTerminal
              className={`rounded-lg p-2.5 px-3 font-mono text-[45px] font-bold ${theme === themes.DARK ? "bg-primary-bg3 text-gray-100" : "bg-emerald-200 text-teal-800"}`}
              fontWeight="bold"
            />
            <span
              className={`font-mono text-xs font-semibold lg:text-[15px] ${theme === themes.DARK ? "text-primary-text " : "text-gray-800 "}`}
            >
              Code Snippet Manager
            </span>
          </NavLink>

          <div className="flex items-center gap-4">
            {themeButton("block md:hidden")}
            <button
              className="block cursor-pointer transition-all duration-100 hover:scale-120 md:hidden"
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
          className={`ml-0 w-full origin-top overflow-hidden transition-all duration-200 ease-in-out md:ml-auto md:max-h-full md:w-auto md:scale-y-100 md:opacity-100 ${
            isNavOpen
              ? "max-h-fit scale-y-100 pt-4 opacity-100 md:pt-0"
              : "max-h-0 scale-y-95 pt-0 opacity-0 md:pt-0"
          }`}
        >
          <ul className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-center md:justify-between md:p-0">
            {themeButton("hidden md:block")}

            <NavLink to="/snippets" className={"w-full md:w-fit"}>
              <li className={linkClass("/snippets")} onClick={closeNavbar}>
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

            {isAuthenticated && !loading && (
              <NavLink to="/code-editor/new" className={"w-full md:w-fit"}>
                <li
                  className={linkClass("/code-editor")}
                  onClick={toggleNavbar}
                >
                  Playground
                </li>
              </NavLink>
            )}

            {!loading && !isAuthenticated && (
              <button
                className="w-full cursor-pointer rounded-3xl bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600 md:w-fit"
                onClick={handleLogin}
              >
                Login
              </button>
            )}

            {isAuthenticated && !loading && (
              <button
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-2 rounded-full bg-red-300 px-4 py-2 text-sm font-semibold text-red-900 shadow-sm hover:bg-red-400 md:w-fit"
              >
                <PiSignOutBold />
                Logout
              </button>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
