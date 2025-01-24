import React, { useState } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Cover } from "@/components/ui/cover";
// import Header from "@/components/Header";
import Example from "@/components/Header";

function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isAtHovered, setIsAtHovered] = useState(false);

  const firstLine = "Analyze the real-time stock market";
  const secondLine = "at";

  const handleMouseMove = (wordIndex, charIndex) => {
    setHoveredIndex(`${wordIndex}-${charIndex}`);
  };

  const renderTextWithHover = (text, wordIndex) => {
    return text.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block mr-2">
        {word.split("").map((char, charIndex) => (
          <span
            key={charIndex}
            onMouseEnter={() => handleMouseMove(wordIndex, charIndex)}
            className={`inline-block transition-colors duration-300 ${
              `${wordIndex}-${charIndex}` <= hoveredIndex
                ? "text-white"
                : "text-neutral-500"
            }`}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <div className="bg-black min-h-screen">
      <Example />
      <div className="text-left pt-32">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold mx-w-auto mx-auto text-center relative z-20">
          {renderTextWithHover(firstLine, 0)}

          <br />
          <span
            className={`inline-block mx-1 transition-colors duration-300 ${
              isAtHovered ? "text-white" : "text-neutral-500"
            }`}
            onMouseEnter={() => setIsAtHovered(true)}
            onMouseLeave={() => setIsAtHovered(false)}
          >
            {renderTextWithHover(secondLine, 1)}
            <Cover>warp speed</Cover>
          </span>
        </h1>
      </div>

      <div className="relative z-10">
        <MacbookScroll />
      </div>
    </div>
  );
}

export default Home;
