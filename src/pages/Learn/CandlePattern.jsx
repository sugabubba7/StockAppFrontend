import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function CandlePattern() {
  const candles = [
    { name: "Doji", image: "/path/to/image1.jpg" },
    { name: "Hammer", image: "/path/to/image2.jpg" },
    { name: "Engulfing", image: "/path/to/image3.jpg" },
    { name: "Morning Star", image: "/path/to/image4.jpg" },
    { name: "Evening Star", image: "/path/to/image5.jpg" },
    { name: "Piercing Line", image: "/path/to/image6.jpg" },
    { name: "Dark Cloud Cover", image: "/path/to/image7.jpg" },
    { name: "Three White Soldiers", image: "/path/to/image8.jpg" },
    { name: "Marubozu", image: "/path/to/image3.jpg" },
  ];

  return (
    <div className="container mx-auto p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {candles.map((candle, index) => (
          <Link key={index} to={`/candle/${candle.name}`} className="w-full">
            <Card className="hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dotted border-gray-400">
              <CardHeader>
                <CardTitle candleName={candle.name} imageSrc={candle.image} />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CandlePattern;
