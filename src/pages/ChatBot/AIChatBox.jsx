import React from 'react';

function AIChatBox({ message }) {
  return (
    <div className="flex justify-start items-center gap-3 m-6"> 
      <img src="./AI-Image.png" alt="AI Image" width={85} className="rounded-full" />
      <div className="w-2/5 p-5 bg-gray-500 text-white border rounded-lg">
        <p className="break-words text-[15px]">{message}</p>
      </div>
    </div>
  );
}

export default AIChatBox;
