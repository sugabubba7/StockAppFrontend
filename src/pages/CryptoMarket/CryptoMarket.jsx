import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "@/components/ui/background-layout.jsx";
import { SimpleFloatingNav } from "@/components/Header.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Crypto() {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCryptoData() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true"
        );
        const data = await response.json();

        const formattedCryptos = data.map((crypto) => {
          const currentTimestamp = Date.now();
          const timeGap = 7 * 24 * 60 * 60 * 1000;
          const priceHistory = crypto.sparkline_in_7d.price.map(
            (price, index) => ({
              timestamp: currentTimestamp - timeGap + index * (60 * 60 * 1000),
              price,
            })
          );

          const latestPrice =
            priceHistory.length > 0
              ? priceHistory[priceHistory.length - 1].price
              : crypto.current_price;
          const previousPrice =
            priceHistory.length > 1
              ? priceHistory[priceHistory.length - 2].price
              : latestPrice;
          const isUptrend = latestPrice >= previousPrice;

          return {
            ...crypto,
            priceHistory,
            isUptrend,
          };
        });

        setCryptos(formattedCryptos);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    }

    fetchCryptoData();
  }, []);

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

  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (active && payload && payload.length) {
      const { timestamp, price } = payload[0].payload;

      return (
        <div
          className="bg-gray-900 text-white p-2 rounded-lg shadow-lg text-sm absolute"
          style={{
            minWidth: "120px",
            textAlign: "center",
            left: `${coordinate.x}px`,
            top: `${coordinate.y + 10}px`,
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          <p className="whitespace-nowrap">
            📅 {formatTimestampToIST(timestamp)}
          </p>
          <p className="whitespace-nowrap">💰 Price: ${price.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BackgroundLayout>
      <SimpleFloatingNav />
      <div className="container mx-auto p-6 text-white">
        <h1 className="text-2xl font-bold text-center mb-4">Crypto Market</h1>

        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search Crypto..."
            className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-4">
          {filteredCryptos.map((crypto) => (
            <div
              key={crypto.id}
              className="p-4 bg-gray-900 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition flex items-center justify-between"
              onClick={() => navigate(`/crypto/${crypto.id}`)}
            >
              <div>
                <h2 className="text-lg font-semibold">{crypto.name}</h2>
                <p className="text-gray-300">
                  Price: ${crypto.current_price.toFixed(2)}
                </p>
                <p className="text-gray-300">
                  Market Cap: ${crypto.market_cap.toLocaleString()}
                </p>
              </div>

              <div className="h-20 w-36">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={crypto.priceHistory}>
                    <XAxis dataKey="timestamp" hide />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={crypto.isUptrend ? "#10B981" : "#EF4444"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default Crypto;
