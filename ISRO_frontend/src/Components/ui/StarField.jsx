
import React from 'react'
import { useTheme } from "../../Context/theme/Themecontext";

function StarField() {
  const {darkMode, toggleTheme} = useTheme();
  return (

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 rounded-full
          ${darkMode ? 'bg-white' : 'bg-gray-900'}
             `}
            
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default StarField;
