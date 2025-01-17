import React, { useState } from 'react';

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

  return (
    <div className="fixed bottom-0 left-0 w-full p-3 flex gap-2 items-center justify-center">
      <input
        type="text"
        placeholder="Ask Doubt..."
        value={input}
        onChange={handleChange}
        className="border-gray-950 shadow-black rounded-lg p-2 bg-black flex-grow max-w-lg text-white"
      />
      <button type="submit" onClick={handleSubmit}>
        <img
          src="./Submit.png"
          alt="Submit Button"
          className="rounded-full hover:scale-105 transition-all hover:shadow-md hover:bg-gray-500"
          width={30}
        />
      </button>
    </div>
  );
}

export default PromptBox;
