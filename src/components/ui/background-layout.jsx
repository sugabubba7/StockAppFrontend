import React from "react";

function BackgroundLayout({ children }) {
  return (
    <div className="bg-black min-h-screen">
      <div className="text-left pt-32">
        {children}
      </div>
    </div>
  );
}

export default BackgroundLayout;