import { useState } from "react";
import { ThemeContext } from "./Themecontext";

function Themeprovider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };
  return <ThemeContext.Provider value={{darkMode,toggleTheme}}>{children}</ThemeContext.Provider>;
}

export default Themeprovider;
