// src/components/Navbar.jsx
import { useContext, useState } from "react";
// import { ThemeContext } from "../Context/theme/Themecontext";
import { Sun, Moon, LogIn, LogOut, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Isro from "../assets/ISRO-Color.svg";
import { useTheme } from "../Context/theme/Themecontext.jsx";
export default function Navbar() {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();
  // const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
    <>
      {/* Navigation */}
      <nav
        className={`  top-0 left-0 right-0 z-50 transition-all duration-300
         ${
           darkMode
             ? "bg-gray-900 backdrop-blur-lg shadow-lg"
             : "bg-gray-300 backdrop-blur-lg shadow-lg"
         }
      `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${
                darkMode ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
              } shadow-lg`}> */}
              {/* <Rocket className="w-7 h-7 text-white" style={{ transform: 'rotate(-45deg)' }} /> */}
              <button
                onClick={() => navigate("/")}
                className="focus:outline-none cursor-pointer"
              >
                <img src={Isro} alt="Logo" className="w-20 h-20" />
              </button>
              {/* <div className="absolute inset-0 rounded-xl bg-white opacity-0 hover:opacity-20 transition-opacity" /> */}
              {/* </div> */}
              <button onClick={() => navigate("/")}>
                <span
                  className={`text-xl font-bold block  cursor-pointer ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  GeoNLI
                </span>
                <span
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Inter IIT Tech Meet 14.0
                </span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                  darkMode
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transform hover:scale-110`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
