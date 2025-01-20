import React from 'react';
import { useParams } from 'react-router-dom';

const CandleDetails = () => {
  const { candleName } = useParams();

  const candleDetails = {
    Doji: {
      title: "The Doji Candlestick",
      description: `
        The Doji candlestick is a key indicator in technical analysis, representing a point of indecision in the market. 
        It forms when the opening and closing prices are nearly identical, creating a cross or a plus-shaped pattern.
        Traders often interpret the Doji as a signal to watch for confirmation from the next candlestick before making trading decisions. 
        When found in a trend, it may signal a potential reversal or continuation, depending on the surrounding context and volume.
      `,
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
      interpretation: `
        Traders often interpret the Doji as a signal of market indecision. When found in a trend, it may signal a potential reversal or continuation, 
        depending on the surrounding context and volume.
      `,
    },
    // Add other candlestick patterns here
    Hammer: {
      description: `
        The Hammer candlestick pattern is a bullish reversal signal that typically appears at the end of a downtrend. 
        It features a small real body near the top of the candle with a long lower shadow at least twice the length of the body. 
        This indicates strong buying pressure after a period of selling.
      `,
      image: "/Hammer.png",
    },
    // Additional patterns ...
  };

  const defaultMessage = "Details for this candlestick pattern are currently unavailable.";
  const candleData = candleDetails[candleName] || { description: defaultMessage, image: null };

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        backgroundImage: 'url("/stock.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-screen-lg p-10">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-white">
          {candleData.title || candleName}
        </h1>
        <div className="flex flex-col items-center shadow-lg p-8 rounded-lg bg-white border border-gray-200">
          {candleData.image && (
            <img
              src={candleData.image}
              alt={candleName}
              className="w-80 h-80 object-contain mb-8 border-4 border-black rounded-md"
            />
          )}
          <p className="text-xl leading-relaxed text-gray-700 text-justify mb-6">
            {candleData.description}
          </p>
          {candleData.structure && (
            <ul className="list-disc ml-5 text-gray-700 mb-6">
              {candleData.structure.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}:</strong> {item.detail}
                </li>
              ))}
            </ul>
          )}
          {candleData.interpretation && (
            <p className="text-lg text-gray-700 italic">
              <strong>Interpretation:</strong> {candleData.interpretation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandleDetails;
