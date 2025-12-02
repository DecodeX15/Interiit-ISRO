import React from 'react'
import { useState } from 'react';
import Isro from '../assets/ISRO-Color.svg'
import { useTheme } from "../Context/theme/Themecontext";
function Footer
() {
    const {darkMode, toggleTheme} = useTheme();
    // const [darkMode, setDarkMode] = useState(true);
    // const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
    <div>

        {/* Footer */}
      <footer className={`z-10 px-6 border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-300 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {/* <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
              }`}>
                <Rocket className="w-6 h-6 text-white" style={{ transform: 'rotate(-45deg)' }} />
              </div> */}
               <img src={Isro} alt="Logo" className="w-20 h-20" />
              <div>
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>GeoNLI</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Inter IIT Tech Meet 14.0</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="https://github.com/DecodeX15/Interiit-ISRO" target='blank' className={`text-sm hover:underline ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Codebase
              </a>
              <a href="#" className={`text-sm hover:underline ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Report
              </a>
              
            </div>
            
            
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

