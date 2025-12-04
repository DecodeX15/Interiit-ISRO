import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { useTheme } from '../../Context/theme/Themecontext';

const QueryTypeSelector = ({ selectedQueryType, onQueryTypeChange }) => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const queryTypes = [
    {
      category: 'Captioning',
      options: [
        { id: 'Captioning', name: 'Captioning', icon: '◆' },
      ]
    },
    {
      category: 'Grounding',
      options: [
        { id: 'Grounding', name: 'Grounding', icon: 'A' },
      ]
    },
    {
      category: 'Attributes',
      options: [
        { id: 'Binary', name: 'binary', icon: '+' },
        { id: 'Numeric', name: 'numeric', icon: '+' },
        { id: 'Semantic', name: 'semantic', icon: '+' },
      ]
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQueryTypeSelect = (queryTypeId) => {
    onQueryTypeChange(queryTypeId);
    setIsOpen(false);
  };

  const getSelectedQueryType = () => {
    for (const category of queryTypes) {
      const queryType = category.options.find(m => m.id === selectedQueryType);
      if (queryType) return queryType.name;
    }
    return 'Captioning';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
          darkMode
            ? 'bg-gray-900/50 border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300'
            : 'bg-white border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700'
        }`}
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">{getSelectedQueryType()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute bottom-full right-0 mb-2 w-64 rounded-xl border shadow-2xl overflow-hidden ${
          darkMode
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          {queryTypes.map((category, idx) => (
            <div key={category.category}>
              {/* Category Header */}
              <div className={`px-4 py-2 text-xs font-semibold ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {category.category}
              </div>

              {/* Query Options */}
              {category.options.map((queryType) => (
                <button
                  key={queryType.id}
                  onClick={() => handleQueryTypeSelect(queryType.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                    darkMode
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-50 text-gray-700'
                  } ${selectedQueryType === queryType.id ? (darkMode ? 'bg-gray-800' : 'bg-gray-50') : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 flex items-center justify-center text-xs font-bold ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {queryType.icon}
                    </span>
                    <span className="text-sm font-medium">{queryType.name}</span>
                  </div>
                  {selectedQueryType === queryType.id && (
                    <Check className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  )}
                </button>
              ))}

              {/* Divider */}
              {idx < queryTypes.length - 1 && (
                <div className={`h-px mx-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueryTypeSelector;