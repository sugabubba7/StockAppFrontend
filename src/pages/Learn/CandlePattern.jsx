import React from "react";
import { Link } from "react-router-dom";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { SimpleFloatingNav } from "@/components/Header";

function CandleChart({ name, image }) {
  return (
    <div className="flex flex-col items-center">
      <img src={image} alt={name} className="h-40 w-40 object-cover radius-full" />
      <p className="text-black mt-2 text-center font-bold text-lg">{name}</p>
    </div>
  );
}

function CandlePattern() {
  const candles = [
    { name: "Doji", image: "/Doji.png" },
    { name: "Hammer", image: "/Hammer.png" },
    { name: "Engulfing", image: "/Engulfing.png" },
    { name: "Morning Star", image: "/Morning-star.png" },
    { name: "Evening Star", image: "/Evening-star.png" },
    { name: "Piercing Line", image: "/Piercing-line.png" },
    { name: "Dark Cloud Cover", image: "/Darkcloud-cover.png" },
    { name: "Three White Soldiers", image: "/Three-White-Soldiers.png" },
    { name: "Marubozu", image: "Marubozu.png" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      {/* <header className="bg-gray-800 text-white py-4 fixed top-0 left-0 right-0 z-10 text-center">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Candle Charts</h1>
        </div>
      </header> */}

      <SimpleFloatingNav />

      {/* Main Content */}
      <div className="mt-20">
        <div className="container mx-auto p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {candles.map((candle, index) => (
              <Link key={index} to={`/candle/${candle.name}`}>
                <BackgroundGradient
                  containerClassName="hover:scale-105 transition-all hover:shadow-md cursor-pointer"
                >
                  <div className="p-2 flex flex-col items-center bg-white">
                    <CandleChart name={candle.name} image={candle.image} />
                  </div>
                </BackgroundGradient>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default CandlePattern;
