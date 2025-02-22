import React from "react";
import { useParams } from "react-router-dom";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { SimpleFloatingNav } from "@/components/Header";

const CandleDetails = () => {
  const { candleName } = useParams();

  const candleDetails = {
    Doji: {
      title: "The Doji Candlestick",
      description: `The Doji candlestick is a key indicator in technical analysis, representing a point of indecision in the market.
      It forms when the opening and closing prices are nearly identical, creating a cross or a plus-shaped pattern.
      Traders often interpret the Doji as a signal to watch for confirmation from the next candlestick before making trading decisions.
      When found in a trend, it may signal a potential reversal or continuation, depending on the surrounding context and volume.`,
      image: "/Doji.png",
      structure: [
        {
          name: "Body",
          detail: "Extremely small or non-existent, reflecting the minimal difference between the opening and closing prices.",
        },
        {
          name: "Shadows (Wicks)",
          detail: "Can be long or short. The shadows' length indicates the price movement range during the period.",
        },
      ],
      interpretation: `The Doji candlestick is a powerful indicator of indecision. Its effectiveness is amplified when found in key support or resistance zones.
      - A Doji near resistance suggests that buyers are struggling, increasing the likelihood of a trend reversal.
      - When a Doji forms near strong support, it may indicate that selling pressure is exhausting, signaling an upward move.
      - Traders often combine Doji patterns with RSI or MACD indicators for enhanced accuracy in predicting market movements.`,
    },
    Hammer: {
      title: "The Hammer Candlestick",
      description: `The Hammer candlestick is a bullish reversal pattern that typically appears at the end of a downtrend.
      It consists of a small real body near the top and a long lower shadow at least twice the body’s size.
      This pattern suggests that buyers have started overpowering sellers, potentially leading to an upward price movement.`,
      image: "/Hammer.png",
      structure: [
        {
          name: "Real Body",
          detail: "Small and positioned at the top of the candlestick.",
        },
        {
          name: "Lower Shadow",
          detail: "Long, at least twice the size of the real body, showing rejection of lower prices.",
        },
      ],
      interpretation: `A Hammer suggests that the market is testing lower levels but failing to hold them, indicating potential reversal.
      - If found at a **major support level**, the Hammer is a strong bullish signal.
      - A Hammer should be confirmed by a bullish candle in the next session before entering a trade.
      - Traders often pair Hammer patterns with **Fibonacci retracement levels** to enhance entry and exit strategies.`,
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
              <img
                src={candleData.image}
                alt={candleName}
                className="w-80 h-80 object-contain mb-8 border-4 border-white rounded-md"
              />
            )}
            <p className="text-lg leading-relaxed text-gray-300 text-justify mb-6">
              {candleData.description}
            </p>
            {candleData.structure && (
              <ul className="list-disc ml-5 text-gray-300 mb-6">
                {candleData.structure.map((item, index) => (
                  <li key={index}>
                    <strong>{item.name}:</strong> {item.detail}
                  </li>
                ))}
              </ul>
            )}
            {candleData.interpretation && (
              <p className="text-lg text-gray-300 italic">
                <strong>Interpretation:</strong> {candleData.interpretation}
              </p>
            )}
          </div>
        </TracingBeam>
      </div>
    </div>
  );
};

export default CandleDetails;
