import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackgroundLayout from "@/components/ui/background-layout.jsx";
import { SimpleFloatingNav } from "@/components/Header.jsx";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

function CryptoDetail() {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isCandlestick, setIsCandlestick] = useState(true);

  useEffect(() => {
    const fetchCryptoDetail = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=true`
        );
        const data = await response.json();
        const currentTimestamp = Date.now();

        const priceHistory = data.market_data.sparkline_7d.price.map(
          (price, index) => ({
            timestamp:
              currentTimestamp -
              7 * 24 * 60 * 60 * 1000 +
              index * (60 * 60 * 1000),
            price,
          })
        );

        const candleData = [];
        for (let i = 1; i < priceHistory.length; i += 4) {
          const chunk = priceHistory.slice(i, i + 4);
          if (chunk.length > 0) {
            const open = chunk[0].price;
            const close = chunk[chunk.length - 1].price;
            const high = Math.max(...chunk.map((p) => p.price));
            const low = Math.min(...chunk.map((p) => p.price));
            const isBullish = close > open;
            const color = isBullish ? "#10B981" : "#EF4444";

            candleData.push({
              timestamp: chunk[0].timestamp,
              open,
              close,
              high,
              low,
              color,
            });
          }
        }

        const cryptoData = { data, chartData: { trend: priceHistory, candle: candleData }, timestamp: currentTimestamp };

        localStorage.setItem(`crypto_${id}`, JSON.stringify(cryptoData));
        setCrypto(data);
        setChartData(cryptoData.chartData);
      } catch (error) {
        console.error("Error fetching crypto details:", error);
      }
    };

    const cachedData = localStorage.getItem(`crypto_${id}`);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = Date.now();
      const timeDifference = currentTime - parsedData.timestamp;

      if (timeDifference < 15 * 60 * 1000) {
        setCrypto(parsedData.data);
        setChartData(parsedData.chartData);
        return;
      }
    }

    fetchCryptoDetail();
  }, [id]);

  const formatTimestampToIST = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!crypto) return <div className="text-white text-center">Loading...</div>;

  return (
    <BackgroundLayout>
      <SimpleFloatingNav />
      <div className="container mx-auto p-6 text-white">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mt-6">
          <div className="flex items-center justify-center text-center mb-4">
            <img
              src={crypto.image.large}
              alt={crypto.name}
              className="w-12 h-12 mr-4"
            />
            <h1 className="text-2xl font-bold">
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </h1>
          </div>

          <h2 className="text-xl font-bold mb-4">Price History (7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            {isCandlestick ? (
              <ComposedChart
                data={chartData.candle}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatTimestampToIST}
                  hide
                />
                <YAxis
                  domain={[
                    (dataMin) => Math.floor(dataMin * 0.95),
                    (dataMax) => Math.ceil(dataMax * 1.05),
                  ]}
                  hide
                />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Bar
                  dataKey="close"
                  fill="#8884d8"
                  shape={({ x, y, width, height, payload }) => {
                    const chartTop = 20;
                    const chartBottom = 430;
                    let wickTop =
                      y +
                      height / 2 -
                      (payload.high - Math.max(payload.open, payload.close)) / 2;
                    let wickBottom =
                      y +
                      height / 2 +
                      (Math.min(payload.open, payload.close) - payload.low) / 2;
                    wickTop = Math.max(wickTop, chartTop + 5);
                    wickBottom = Math.min(wickBottom, chartBottom - 5);
                    return (
                      <g>
                        <rect
                          x={x}
                          y={y + height / 4}
                          width={width}
                          height={Math.abs(height) / 2}
                          fill={payload.color}
                        />
                        <line
                          x1={x + width / 2}
                          x2={x + width / 2}
                          y1={wickTop}
                          y2={wickBottom}
                          stroke={payload.color}
                          strokeWidth={2}
                        />
                      </g>
                    );
                  }}
                />
              </ComposedChart>
            ) : (
              <LineChart data={chartData.trend}>
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatTimestampToIST}
                  hide
                />
                <YAxis hide />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setIsCandlestick(!isCandlestick)}
          >
            {isCandlestick ? "Show Moving Trend" : "Show Candlestick Chart"}
          </button>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mt-5">
          <p className="text-lg font-semibold">
            💰 Price: ${crypto.market_data.current_price.usd.toFixed(2)}
          </p>
          <p>
            📈 Market Cap: ${crypto.market_data.market_cap.usd.toLocaleString()}
          </p>
          <p>
            💹 24h Volume: $
            {crypto.market_data.total_volume.usd.toLocaleString()}
          </p>
          <p>
            📊 Circulating Supply:{" "}
            {crypto.market_data.circulating_supply.toLocaleString()}{" "}
            {crypto.symbol.toUpperCase()}
          </p>
          <p>
            📉 Max Supply:{" "}
            {crypto.market_data.max_supply
              ? crypto.market_data.max_supply.toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default CryptoDetail;
