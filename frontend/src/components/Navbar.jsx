// src/components/Navbar.jsx
import { FaCode } from "react-icons/fa6";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../customHooks/useAuth";
import { PiSignOutBold } from "react-icons/pi";

const Navbar = () => {
  const { isAuthenticated, loading, logout, resetAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    resetAuth();
    navigate("/", { replace: true });
  };

  const linkClass = (path) =>
    `py-2 px-3 rounded text-sm rounded-3xl ${
      location.pathname === path
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-700 font-semibold hover:bg-gray-100"
    }`;

  return (
    <header className="flex items-center px-4 py-3 border-b border-gray-300 shadow-md/5 bg-gray-100/10 backdrop-blur-md sticky top-0 z-10 h-[10vh]">
      <div className="">
        <NavLink
          to="/"
          className="text-3xl text-teal-500 flex items-center gap-2 font-semibold"
        >
          <FaCode />

          <span className="font-semibold text-gray-800 text-sm sm:text-base">
            Code Snippet Manager
          </span>
        </NavLink>
      </div>

      <nav className="flex items-center justify-between ml-auto">
        <ul className="flex items-center gap-3 rounded-2xl p-2">
          <li>
            <NavLink to="/snippets" className={linkClass("/snippets")}>
              Explore
            </NavLink>
          </li>

          {isAuthenticated && !loading && (
            <li>
              <NavLink to="/dashboard" className={linkClass("/dashboard")}>
                My Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {!loading && !isAuthenticated && (
        <div className="flex items-center">
          <button
            className="px-3 py-2 bg-blue-500 rounded-3xl text-white text-sm cursor-pointer hover:bg-blue-600 font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}

      {isAuthenticated && !loading && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-300 text-red-900 text-sm cursor-pointer flex items-center gap-2 rounded-full hover:bg-red-400 shadow-sm font-semibold"
        >
          <PiSignOutBold />
          Logout
        </button>
      )}
    </header>
  );
};

export default Navbar;
