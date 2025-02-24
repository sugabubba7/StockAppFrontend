import React, { useState } from "react";
import { motion } from "framer-motion";
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
                  className={`inline-block transition-all duration-300 ease-out ${
                    hoveredIndex === charIndex ? "text-blue-400 scale-125" : "text-white"
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

  const tickerData = [
    "📈 BTC/USD: $42,530",
    "📉 ETH/USD: $3,200",
    "📈 XRP/USD: $0.58",
    "📉 USDT/USD: $1.00",
    "📈 AAPL: $176.40",
    "📉 TSLA: $650.30",
    "📈 GOOG: $2,345",
    "📉 AMZN: $3,120",
    "📈 SOL/USD: $85.50",
    "📉 DOGE/USD: $0.09",
    "📈 MATIC/USD: $1.12",
  ];

  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black">
        <GridBackgroundDemo />
      </div>

      <motion.div
        className="absolute top-0 right-0 w-72 h-72 bg-blue-500/30 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
          rotate: [0, 20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        <Example />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left pt-32"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-auto mx-auto text-center mt-12 leading-tight">
            {renderTextWithHover(firstLine, 0)}
            <br />
            <span className="inline-block mx-1 transition-colors duration-300">
              {renderTextWithHover(secondLine, 1)}
              <Cover>seamlessly</Cover>
            </span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-gray-400 text-center max-w-3xl mx-auto mt-6 px-6"
        >
          Stay ahead with real-time stock data, AI-powered trade insights, and
          advanced market analytics – all in one place.
        </motion.p>
        <div className="relative mt-6 flex justify-center overflow-hidden">
          <div className="ticker-container">
            <div className="ticker-content">
              {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
                <span key={index} className="ticker-item">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gray-100 text-black font-semibold rounded-lg hover:bg-black hover:text-white"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900"
          >
            Know More
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative mt-24"
        >
          <MacbookScroll />
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
