import React from 'react';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center px-2 py-1.5 rounded-full transition-colors duration-300 focus:outline-none ${
        isDarkMode 
          ? 'bg-gray-700 hover:bg-gray-600' 
          : 'bg-gray-200 hover:bg-gray-300'
      }`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        className={`absolute ${
          isDarkMode ? 'translate-x-5' : 'translate-x-0'
        } transition-transform duration-300 ease-in-out h-5 w-5 rounded-full bg-white shadow-md`}
      />
      
      <span className={`w-10 h-5 flex items-center ${isDarkMode ? 'justify-start' : 'justify-end'}`}>
        {isDarkMode ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 ml-5 text-yellow-200" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 mr-5 text-yellow-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;