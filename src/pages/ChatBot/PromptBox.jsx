import React, { useState } from 'react';
import Pattern from './Pattern.jsx';

function PromptBox({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <Pattern />
      <div className="flex items-center gap-3 w-full max-w-lg">
        <input
          type="text"
          placeholder="Ask anything..."
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-grow px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
        >
          <img
            src="./Submit.png"
            alt="Submit Button"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}

export default PromptBox;
