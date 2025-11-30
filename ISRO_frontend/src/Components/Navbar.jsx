// src/components/Navbar.jsx
import { useContext } from "react";
import { ThemeContext } from "../Context/theme/Themecontext";
import { Sun, Moon, LogIn, LogOut, UserCircle2 } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const bg = isDark ? "#0b0b0d" : "#F8F2E9";
  const text = isDark ? "#ffffff" : "#000000";
  const border = isDark ? "#1f1f22" : "#e3e3e3";

  return (
    <nav
      className="fixed top-0 left-0 w-full h-16 px-6 flex items-center justify-between z-50 shadow-sm"
      style={{
        background: bg,
        color: text,
        borderBottom: `1px solid ${border}`,
      }}
    >
      {/* Logo */}
      <h1 className="text-2xl font-semibold tracking-wide select-none">
        GeoNLI
      </h1>

      <div className="flex items-center gap-4">

        {/* Fake Login/Logout */}
        <button
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition border cursor-pointer"
          style={{
            background: isDark ? "#1a1a1d" : "#f4f4f4",
            color: text,
            borderColor: border,
          }}
        >
          <UserCircle2 size={18} />
          Login
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition border cursor-pointer"
          style={{
            background: isDark ? "#1a1a1d" : "#f4f4f4",
            color: text,
            borderColor: border,
          }}
        >
          {isDark ? (
            <>
              <Moon size={18} />
              Dark
            </>
          ) : (
            <>
              <Sun size={18} />
              Light
            </>
          )}
        </button>
      </div>
    </nav>
  );
}
