import React from "react";

export function GridBackgroundDemo() {
  return (
    <div className="h-[50rem] w-full bg-black dark:bg-black bg-grid-white/[0.2] dark:bg-grid-white/[0.2] relative flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
}
