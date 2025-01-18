import React from 'react';
import { useParams } from 'react-router-dom';

const CandleDetails = () => {
  const { candleName } = useParams();

  const candleDetails = {
    Doji: {
      title: "The Doji Candlestick",
      description: "The Doji candlestick is a key indicator in technical analysis, representing a point of indecision in the market. It is characterized by the following structure:",
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
      interpretation: "Traders often interpret the Doji as a signal of market indecision. When found in a trend, it may signal a potential reversal or continuation, depending on the surrounding context and volume.",
    },
    Hammer: "The Hammer is a bullish reversal pattern that forms at the end of a downtrend. It has a small real body and a long lower shadow, indicating strong buying pressure after a period of selling.",
    Engulfing: "The Engulfing pattern can be bullish or bearish. In a bullish engulfing pattern, a larger green candle fully engulfs the previous red candle, signaling a reversal to an uptrend. Conversely, a bearish engulfing pattern involves a red candle engulfing the previous green candle.",
    "Morning Star": "The Morning Star is a bullish reversal pattern that forms over three candles. It consists of a long bearish candle, a small-bodied candle (indicating indecision), and a long bullish candle, signaling the end of a downtrend.",
    "Evening Star": "The Evening Star is the opposite of the Morning Star. It is a bearish reversal pattern with a long bullish candle, a small-bodied candle, and a long bearish candle, signaling the end of an uptrend.",
    "Piercing Line": "The Piercing Line is a bullish reversal pattern that occurs in a downtrend. It consists of a long bearish candle followed by a bullish candle that opens lower but closes above the midpoint of the previous candle.",
    "Dark Cloud Cover": "The Dark Cloud Cover is a bearish reversal pattern that forms in an uptrend. It consists of a long bullish candle followed by a bearish candle that opens above the previous high but closes below its midpoint.",
    "Three White Soldiers": "The Three White Soldiers pattern is a bullish reversal pattern that consists of three consecutive long bullish candles with small wicks, indicating strong buying pressure and a reversal to an uptrend.",
    Marubozu: "The Marubozu is a candlestick with no shadows, indicating strong momentum in the direction of the candle (either bullish or bearish). A green Marubozu suggests strong buying, while a red Marubozu indicates strong selling.",
  };

  const defaultMessage = "Details for this candlestick pattern are currently unavailable.";

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">
        {details?.title || `Details for ${candleName}`}
      </h1>
      {details ? (
        <div>
          <p className="mb-4">{details.description}</p>
          <ul className="list-disc ml-5 mb-4">
            {details.structure.map((item, index) => (
              <li key={index}>
                <strong>{item.name}:</strong> {item.detail}
              </li>
            ))}
          </ul>
          <p>{details.interpretation}</p>
        </div>
      ) : (
        <p>{defaultMessage}</p>
      )}
    </div>
  );
};

export default CandleDetails;