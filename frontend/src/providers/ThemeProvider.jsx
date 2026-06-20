import { useReducer, useEffect } from "react";
import ThemeContext from "../contexts/ThemeContext";

const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

const THEME_ACTIONS = {
  TOGGLE: "TOGGLE_THEME",
  SET: "SET_THEME",
};

const initialState = {
  theme: localStorage.getItem("theme") || "light",
};

function themeReducer(state, action) {
  switch (action.type) {
    case THEME_ACTIONS.TOGGLE:
      return {
        theme: state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
      };
    case THEME_ACTIONS.SET:
      return { theme: action.payload };
    default:
      return state;
  }
}

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  const toggleTheme = () => dispatch({ type: THEME_ACTIONS.TOGGLE });

  const setTheme = (theme) =>
    dispatch({ type: THEME_ACTIONS.SET, payload: theme });

  const value = {
    theme: state.theme,
    dispatch,
    toggleTheme,
    setTheme,
    themes: THEMES,
    themeActions: THEME_ACTIONS,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
