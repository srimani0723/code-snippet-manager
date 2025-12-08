// src/components/Navbar.jsx
import React from "react";
import { MdSnippetFolder } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../customHooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // or call /auth/logout if you have it; this clears cookie on client
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login", { replace: true });
  };

  const linkClass = (path) =>
    `px-2 py-1 rounded text-sm ${
      location.pathname === path
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white">
      {/* Left: logo + title */}
      <div className="flex items-center gap-2">
        <Link to="/" className="text-3xl text-blue-600">
          <MdSnippetFolder />
        </Link>
        <span className="font-semibold text-gray-800 text-sm sm:text-base">
          Code Snippet Manager
        </span>
      </div>

      {/* Right: nav links */}
      <nav>
        <ul className="flex items-center gap-3 text-gray-700 text-sm">
          <li>
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
          </li>

          {isAuthenticated && !loading && (
            <>
              <li>
                <Link to="/snippets" className={linkClass("/snippets")}>
                  Public Snippets
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                  My Dashboard
                </Link>
              </li>
            </>
          )}

          {!loading && !isAuthenticated && (
            <>
              <li>
                <Link to="/login" className={linkClass("/login")}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={linkClass("/register")}>
                  Register
                </Link>
              </li>
            </>
          )}

          {loading && (
            <li className="text-xs text-gray-500">Checking auth...</li>
          )}

          {isAuthenticated && !loading && (
            <li className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-gray-600 truncate max-w-[100px]">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
