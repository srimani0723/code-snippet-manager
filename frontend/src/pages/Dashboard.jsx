// src/pages/Dashboard.jsx
import { useContext } from "react";
import { IoMdAdd } from "react-icons/io";

import Spinner from "../components/Spinner";
import SnippetForm from "../components/SnippetForm";
import UserSnippetCard from "../components/UserSnippetCard";

import ThemeContext from "../contexts/ThemeContext";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;

  const tabs = [
    { name: "Snippets", key: "snippets", link: "/dashboard/snippets" },
    { name: "Collections", key: "collections", link: "/dashboard/collections" },
    // { name: "Settings", key: "settings", link: "/dashboard/settings" },
    // { name: "Profile", key: "profile", link: "/dashboard/profile" },
  ];

  return (
    <section className="relative mx-auto flex min-h-[90vh] w-full flex-col md:flex-row md:items-start">
      <aside
        className={`sticky top-15 z-10 flex h-fit w-full flex-row gap-2 p-3 shadow-md/10 backdrop-blur-md md:h-[90vh] md:w-fit md:flex-col md:self-start ${isDark ? "bg-primary-bg2/60" : "bg-white/60"}`}
      >
        {tabs.map((tab) => (
          <NavLink
            to={tab.link}
            key={tab.key}
            className={({ isActive }) =>
              `w-fit cursor-pointer rounded-full px-4 py-2 md:w-full ${
                isActive
                  ? isDark
                    ? "bg-primary-bg3 text-white"
                    : "bg-emerald-200 text-emerald-800"
                  : isDark
                    ? "hover:bg-primary-bg3 text-gray-300"
                    : "text-gray-700 hover:bg-emerald-200"
              }`
            }
          >
            <button
              className={`w-full cursor-pointer rounded-full font-mono text-sm font-semibold transition-all duration-150`}
            >
              {tab.name}
            </button>
          </NavLink>
        ))}
      </aside>

      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
