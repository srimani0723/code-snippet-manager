import { createContext } from "react";

const ThemeContext = createContext({
  theme: "dark",
  dispatch: () => {},
  toggleTheme: () => {},
  setTheme: () => {},
  themes: {
    LIGHT: "light",
    DARK: "dark",
  },
  themeActions: {
    TOGGLE: "TOGGLE_THEME",
    SET: "SET_THEME",
  },
});

export default ThemeContext;
