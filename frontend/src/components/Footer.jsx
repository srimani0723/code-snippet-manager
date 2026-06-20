import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const Footer = () => {
  const { theme, themes } = useContext(ThemeContext);
  return (
    <footer
      className={`flex justify-center items-center  px-4 py-3 h-[10vh] border-t ${theme === themes.DARK ? "bg-primary-bg2 border-primary-border" : "bg-gray-50 border-gray-300"}`}
    >
      <p
        className={`text-sm font-semibold ${theme === themes.DARK ? "text-primary-text" : ""}`}
      >
        © 2026{" "}
        <span className="bg-linear-to-r from-blue-600 via-green-600 to-red-600 bg-clip-text text-transparent">
          Code Snippet Manager
        </span>{" "}
        | All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
