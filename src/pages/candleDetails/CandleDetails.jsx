import React from "react";
import { useParams } from "react-router-dom";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { SimpleFloatingNav } from "@/components/Header";

const CandleDetails = () => {
  const { candleName } = useParams();

  const candleDetails = {
    Doji: {
      title: "Doji Candle Stick",
      description: "The Doji candlestick is one of the most recognized candlestick patterns in technical analysis. It represents market indecision and forms when the opening and closing prices of a financial asset are almost identical, creating a candlestick with a very small or non-existent real body. The appearance of a Doji suggests that neither the buyers (bulls) nor the sellers (bears) have gained full control over the market during that trading session.",
      image: "/Doji.png",
      structure: [
        { name: "Body", detail: "Extremely small or non-existent, reflecting market indecision." },
        { name: "Shadows", detail: "Can be long or short, indicating price movement range." },
      ],
      interpretation: "A Doji near resistance suggests a potential bearish reversal, while near support, it may indicate a bullish reversal. Confirmation is needed from subsequent candles.ewbsduobesuci ",
    },
    Hammer: {
      title: "The Hammer Candlestick",
      description: "A bullish reversal pattern appearing after a downtrend. It has a small body and a long lower shadow, showing strong rejection of lower prices.",
      image: "/Hammer.png",
      structure: [
        { name: "Real Body", detail: "Small, positioned at the top of the candlestick." },
        { name: "Lower Shadow", detail: "Long, at least twice the size of the real body, indicating buying pressure." },
      ],
      interpretation: "A Hammer at key support levels is a strong bullish signal, confirmed by a bullish candle in the next session. Volume increase strengthens the reversal.",
    },
    Engulfing: {
      title: "The Engulfing Candlestick",
      description: "A strong reversal pattern where a larger candle completely engulfs the previous one, signaling a potential trend change.",
      image: "/Engulfing.png",
      structure: [
        { name: "First Candle", detail: "Smaller in size, showing initial trend direction." },
        { name: "Second Candle", detail: "Larger and opposite in color, engulfing the first candle." },
      ],
      interpretation: "A bullish Engulfing at support is a buy signal, while a bearish Engulfing at resistance suggests selling pressure. Higher volume confirms the strength.",
    },
    "Morning Star": {
      title: "The Morning Star Candlestick",
      description: "A three-candle bullish reversal pattern appearing after a downtrend, indicating increasing buying pressure.",
      image: "/Morning-star.png",
      structure: [
        { name: "First Candle", detail: "A large bearish candle reflecting strong selling pressure." },
        { name: "Second Candle", detail: "A small-bodied candle, showing market indecision." },
        { name: "Third Candle", detail: "A strong bullish candle confirming the reversal." },
      ],
      interpretation: "The Morning Star signals a potential uptrend, confirmed with high volume in the third candle. It is more reliable on higher timeframes.",
    },
    "Evening Star": {
      title: "The Evening Star Candlestick",
      description: "A three-candle bearish reversal pattern appearing after an uptrend, signaling weakening bullish momentum.",
      image: "/Evening-star.png",
      structure: [
        { name: "First Candle", detail: "A large bullish candle showing strong buying pressure." },
        { name: "Second Candle", detail: "A small-bodied candle, indicating indecision." },
        { name: "Third Candle", detail: "A strong bearish candle confirming the reversal." },
      ],
      interpretation: "An Evening Star suggests a potential downtrend, especially if supported by high trading volume. It is confirmed when the next candle continues downward.",
    },
    "Piercing Line": {
      title: "The Piercing Line Candlestick",
      description: "A two-candle bullish reversal pattern where a bullish candle closes above the midpoint of the previous bearish candle.",
      image: "/Piercing-line.png",
      structure: [
        { name: "First Candle", detail: "A large bearish candle closing near its low." },
        { name: "Second Candle", detail: "A bullish candle opening below the first but closing above its midpoint." },
      ],
      interpretation: "This pattern signals strong buying pressure and potential trend reversal upwards, especially if followed by another bullish candle.",
    },
    "Dark Cloud Cover": {
      title: "The Dark Cloud Cover Candlestick",
      description: "A two-candle bearish reversal pattern where the bearish candle closes below the midpoint of the previous bullish candle.",
      image: "/Darkcloud-cover.png",
      structure: [
        { name: "First Candle", detail: "A large bullish candle closing near its high." },
        { name: "Second Candle", detail: "A bearish candle opening above the first but closing below its midpoint." },
      ],
      interpretation: "Indicates a potential downtrend and weakening bullish momentum. Confirmation comes from a further bearish candle.",
    },
    "Three White Soldiers": {
      title: "The Three White Soldiers Candlestick",
      description: "A bullish reversal pattern consisting of three consecutive strong bullish candles, indicating sustained buying pressure.",
      image: "/Three-White-Soldiers.png",
      structure: [
        { name: "Candle Formation", detail: "Three consecutive bullish candles with small wicks and strong bodies." },
      ],
      interpretation: "This pattern signals strong bullish momentum, especially when occurring at key support levels. It suggests the start of a new uptrend.",
    },
    Marubozu: {
      title: "The Marubozu Candlestick",
      description: "A single candlestick pattern with no shadows, indicating strong momentum in the direction of the trend.",
      image: "/Marubozu.png",
      structure: [
        { name: "Body", detail: "Large and dominant with no shadows, reflecting complete control by either buyers or sellers." },
      ],
      interpretation: "A bullish Marubozu suggests strong buying pressure, while a bearish Marubozu indicates aggressive selling. Volume increase strengthens the signal.",
    },
  };

  const defaultMessage = "Details for this candlestick pattern are currently unavailable.";
  const candleData = candleDetails[candleName] || { description: defaultMessage, image: null };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black">
      <SimpleFloatingNav />
      <div className="w-full max-w-4xl p-10 mt-24">
        <TracingBeam>
          <div className="flex flex-col items-center shadow-xl p-8 rounded-lg bg-black border border-gray-700 text-white">
            <h1 className="text-4xl font-extrabold mb-6 text-center">{candleData.title || candleName}</h1>
            {candleData.image && (
              <img src={candleData.image} alt={candleName} className="w-80 h-80 object-contain mb-8 border-4 border-white rounded-md" />
            )}
            <p className="text-lg leading-relaxed text-gray-300 text-justify mb-6">{candleData.description}</p>
            {candleData.structure && (
              <ul className="list-disc ml-5 text-gray-300 mb-6">
                {candleData.structure.map((item, index) => (
                  <li key={index}><strong>{item.name}:</strong> {item.detail}</li>
                ))}
              </ul>
            )}
            {candleData.interpretation && (
              <p className="text-lg text-gray-300 italic"><strong>Interpretation:</strong> {candleData.interpretation}</p>
            )}
          </div>
        </TracingBeam>
      </div>
    </div>
  );
};

export default CandleDetails;
