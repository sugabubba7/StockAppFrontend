import React from 'react';
import { useParams } from 'react-router-dom';

const CandleDetails = () => {
  const { candleName } = useParams();

  const candleDetails = {
    Doji: {
      description: `
        The Doji candlestick pattern signifies market indecision and often acts as a potential reversal signal. 
        It forms when the opening and closing prices are nearly identical, creating a cross or a plus-shaped pattern.
        Traders often interpret the Doji as a sign to watch for confirmation from the next candlestick before making 
        trading decisions. A Doji appearing after a strong trend can indicate the trend is losing momentum, 
        suggesting a reversal or consolidation phase.
      `,
      image: "/Doji.png",
    },
    Hammer: {
      description: `
        The Hammer candlestick pattern is a bullish reversal signal that typically appears at the end of a downtrend. 
        It features a small real body near the top of the candle with a long lower shadow at least twice the length of the body. 
        This indicates that sellers pushed the price lower during the session, but strong buying pressure drove the price 
        back up to close near the opening price. Confirmation with a bullish candle following the Hammer strengthens its significance.
      `,
      image: "/Hammer.png",
    },
    Engulfing: {
      description: `
        The Engulfing pattern is a two-candlestick pattern that can signal a reversal in the market. 
        A Bullish Engulfing pattern occurs in a downtrend and consists of a small bearish candle followed by 
        a larger bullish candle that completely engulfs the previous candle's body. 
        Conversely, a Bearish Engulfing pattern appears in an uptrend, where a small bullish candle is 
        followed by a larger bearish candle. These patterns indicate a shift in market sentiment.
      `,
      image: "/Engulfing.png",
    },
    "Morning Star": {
      description: `
        The Morning Star is a powerful bullish reversal pattern formed over three candlesticks. 
        The first candle is a long bearish candle, reflecting strong selling pressure. The second is a 
        smaller-bodied candle (bullish or bearish), indicating indecision or reduced selling momentum. 
        The third candle is a long bullish candle that closes well into the first candle's body, signaling 
        a reversal and potential uptrend.
      `,
      image: "/Morning-star.png",
    },
    "Evening Star": {
      description: `
        The Evening Star is the bearish counterpart to the Morning Star. It is a three-candlestick pattern 
        that signals a potential reversal from an uptrend to a downtrend. The first candle is a long bullish 
        candle, followed by a small-bodied candle (indicating indecision), and the third is a long bearish 
        candle that closes well into the first candle's body. It often marks the peak of an uptrend.
      `,
      image: "/Evening-star.png",
    },
    "Piercing Line": {
      description: `
        The Piercing Line is a bullish reversal pattern that occurs during a downtrend. It consists of two 
        candles: the first is a long bearish candle, and the second is a bullish candle that opens lower but 
        closes above the midpoint of the previous candle. This pattern indicates a shift in sentiment from 
        selling pressure to buying pressure, often signaling the start of an uptrend.
      `,
      image: "/Piercing-line.png",
    },
    "Dark Cloud Cover": {
      description: `
        The Dark Cloud Cover is a bearish reversal pattern that forms during an uptrend. It is made up of two 
        candles: the first is a long bullish candle, and the second is a bearish candle that opens above the 
        previous high but closes below the midpoint of the first candle. This pattern suggests that selling 
        pressure is overpowering the bulls, signaling a potential downtrend.
      `,
      image: "/Darkcloud-cover.png",
    },
    "Three White Soldiers": {
      description: `
        The Three White Soldiers pattern is a strong bullish reversal signal that appears after a downtrend or 
        consolidation. It consists of three consecutive long bullish candles with small or no shadows. Each 
        candle opens within the previous candle's body and closes higher, showing sustained buying momentum and 
        a potential shift to an uptrend.
      `,
      image: "/Three-White-Soldiers.png",
    },
    Marubozu: {
      description: `
        The Marubozu candlestick pattern is characterized by the absence of shadows, indicating strong momentum 
        in the direction of the candle. A Bullish Marubozu has no upper or lower shadow, with prices opening 
        at the low and closing at the high, reflecting strong buying pressure. A Bearish Marubozu is the opposite, 
        with prices opening at the high and closing at the low, showing strong selling pressure. It often signifies 
        the beginning or continuation of a trend.
      `,
      image: "/Marubozu.png",
    },
  };

  const defaultMessage = "Details for this candlestick pattern are currently unavailable.";
  const candleData = candleDetails[candleName] || { description: defaultMessage, image: null };

  return (
    <div className="flex flex-col items-center min-h-screen" 
         style={{ backgroundImage: 'url("/stock.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="flex flex-col items-center justify-center w-full max-w-screen-lg p-10"> 
        <h1 className="text-4xl font-extrabold mb-6 text-center text-white"> 
          {candleName} 
        </h1> 
        <div className="flex flex-col items-center shadow-lg p-8 rounded-lg bg-white border border-gray-200">
          {candleData.image && (
            <img
              src={candleData.image}
              alt={candleName}
              className="w-80 h-80 object-contain mb-8 border-4 border-black rounded-md"
            />
          )}
          <p className="text-xl leading-relaxed text-gray-700 text-justify">
            {candleData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandleDetails;
