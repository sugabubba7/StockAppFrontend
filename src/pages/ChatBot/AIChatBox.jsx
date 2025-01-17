import React from 'react';

function AIChatBox() {
  return (
    <div className="flex justify-start items-center gap-3 m-4">
      <img src="./AI-Image.png" alt="AI Image" width={85} className="rounded-full" />
      <div className="w-3/5 p-5 bg-gray-500 text-white border rounded-lg">
        <p className="break-words">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae repudiandae at similique nemo? Aliquid aspernatur velit blanditiis commodi iusto, perspiciatis veniam quaerat? Beatae, doloremque nemo? Adipisci ea eveniet reprehenderit dolores.
        </p>
      </div>
    </div>
  );
}

export default AIChatBox;
