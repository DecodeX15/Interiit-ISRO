import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from '../../Context/theme/Themecontext';
import QueryTypeSelector from './query-type-selector.jsx';

const ChatInput = ({ onSend, disabled = false, placeholder = "What would you like to know?" }) => {
  const { darkMode } = useTheme();
  const [message, setMessage] = useState('');
  const [selectedQueryType, setSelectedQueryType] = useState('Captioning');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(e,message, selectedQueryType);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`w-full px-6 py-4 border-t ${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
        <div className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
          darkMode
            ? 'bg-gray-800 border-gray-700 focus-within:border-orange-500'
            : 'bg-gray-50 border-gray-300 focus-within:border-orange-400'
        }`}>
          {/* Input Field */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={`flex-1 bg-transparent outline-none text-base ${
              darkMode
                ? 'text-white placeholder-gray-500'
                : 'text-gray-900 placeholder-gray-400'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          />

          {/* Query Type Selector */}
          <QueryTypeSelector
            selectedQueryType={selectedQueryType}
            onQueryTypeChange={setSelectedQueryType}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className={`p-2.5 rounded-lg transition-all ${
              darkMode
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>

  );
};

export default ChatInput;