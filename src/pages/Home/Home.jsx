import React, { useState } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Cover } from "@/components/ui/cover";
import Example from "@/components/Header";
import { GridBackgroundDemo } from "@/components/ui/GridBackgroundDemo";

function Home() {
  const [lastHoveredIndex, setLastHoveredIndex] = useState(-1);

  const firstLine = "Analyze the real-time stock market";
  const secondLine = "at";

  const handleMouseMove = (wordIndex, charIndex) => {
    const currentIndex = wordIndex * 100 + charIndex; // Unique index
    setLastHoveredIndex(currentIndex); // Update based on cursor position
  };

  const renderTextWithHover = (text, wordIndex) => {
    return (
      <span>
        {text.split(" ").map((word, wIndex) => (
          <span key={wIndex} className="inline-block mr-2">
            {word.split("").map((char, cIndex) => {
              const currentIndex = wIndex * 100 + cIndex;
              return (
                <span
                  key={cIndex}
                  onMouseEnter={() => handleMouseMove(wIndex, cIndex)}
                  className={`inline-block transition-colors duration-300 ${
                    currentIndex <= lastHoveredIndex ? "text-white" : "text-neutral-500"
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="relative bg-black min-h-screen">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-black">
        <GridBackgroundDemo />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <Example />
        <div className="text-left pt-32">
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-auto mx-auto text-center">
            {renderTextWithHover(firstLine, 0)}
            <br />
            <span
              className={`inline-block mx-1 transition-colors duration-300`}
            >
              {renderTextWithHover(secondLine, 1)}
              <Cover>warp speed</Cover>
            </span>
          </h1>
        </div>
        <div className="relative">
          <MacbookScroll />
        </div>
      </div>
    </div>
  );
}

export default Home;
