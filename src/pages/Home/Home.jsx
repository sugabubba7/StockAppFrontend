import React, { useState } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Cover } from "@/components/ui/cover";
import Example from "@/components/Header";
import { GridBackgroundDemo } from "@/components/ui/GridBackgroundDemo";

function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const firstLine = "Analyze and Trade";
  const secondLine = "with real-time insights";

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const renderTextWithHover = (text, wordIndex) => {
    return (
      <span>
        {text.split(" ").map((word, wIndex) => (
          <span key={wIndex} className="inline-block mr-2">
            {word.split("").map((char, cIndex) => {
              const charIndex = `${wordIndex}-${wIndex}-${cIndex}`;
              return (
                <span
                  key={cIndex}
                  onMouseEnter={() => handleMouseEnter(charIndex)}
                  onMouseLeave={handleMouseLeave}
                  className={`inline-block transition-all duration-500 ease-out ${
                    hoveredIndex === charIndex
                      ? "text-gray-400 scale-125 transform transition-transform"
                      : "text-white"
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
      <div className="absolute inset-0 z-0 bg-black">
        <GridBackgroundDemo />
      </div>
      <div className="relative z-10">
        <Example />
        <div className="text-left pt-32">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-auto mx-auto text-center mt-12 leading-tight">
            {renderTextWithHover(firstLine, 0)}
            <br />
            <span className="inline-block mx-1 transition-colors duration-300">
              {renderTextWithHover(secondLine, 1)}
              <Cover>seamlessly</Cover>
            </span>
          </h1>
        </div>

        <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mt-6 px-6">
          Stay ahead with real-time stock data, AI-powered trade insights, and
          advanced market analytics – all in one place.
        </p>

        <div className="flex justify-center gap-6 mt-8">
          <button className="px-6 py-3 bg-gray-100 text-black font-semibold rounded-lg transition-all duration-500 ease-in-out hover:bg-black hover:text-white hover:shadow-lg">
            Get Started
          </button>

          <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-900 hover:shadow-lg">
            Know More
          </button>
        </div>

        <div className="relative mt-24">
          <MacbookScroll />
        </div>
      </div>
    </div>
  );
}

export default Home;
