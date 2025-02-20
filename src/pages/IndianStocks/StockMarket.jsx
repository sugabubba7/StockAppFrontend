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

function StockMarket() {
  const [stocks, setStocks] = useState(() => {
    const savedStocks = localStorage.getItem("stocks");
    return savedStocks ? JSON.parse(savedStocks) : [];
  });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_TWELVE_DATA_API_KEY;
  const stockSymbols = [
    "RELIANCE",
    "TCS",
    "HDFCBANK",
    "ICICIBANK",
    "INFY",
    "HINDUNILVR",
  ];

  const fetchStockData = async () => {
    try {
      console.log("Fetching stock data...");

      const url = `https://api.twelvedata.com/time_series?symbol=${stockSymbols.join(",")}&interval=5min&apikey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === "error") {
        console.error("API Error:", data.message);
        return;
      }

      const formattedStocks = Object.keys(data)
        .filter((key) => data[key]?.meta && data[key]?.values)
        .map((key) => {
          const priceHistory = data[key].values.map((entry) => ({
            timestamp: new Date(entry.datetime).getTime(),
            time: entry.datetime.slice(11, 16), 
            price: parseFloat(entry.close),
          }));

          const latestPrice = priceHistory[0]?.price || 0;
          const previousPrice = priceHistory[1]?.price || latestPrice;
          const isUptrend = latestPrice >= previousPrice; 

          return {
            name: data[key].meta.symbol,
            symbol: data[key].meta.symbol,
            price: latestPrice,
            marketCap: "N/A",
            priceHistory,
            isUptrend, 
          };
        });

      setStocks(formattedStocks);
      localStorage.setItem("stocks", JSON.stringify(formattedStocks));
      localStorage.setItem("lastFetchTime", Date.now());
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    const currentTime = Date.now();
    const twoMinutes = 2 * 60 * 1000;

    if (!lastFetchTime || currentTime - lastFetchTime > twoMinutes) {
      fetchStockData();
    }

    const interval = setInterval(fetchStockData, 120000);
    return () => clearInterval(interval);
  }, []);

  const formatTimestampToIST = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (active && payload && payload.length) {
      const { timestamp, price } = payload[0].payload;

      return (
        <div
          className="bg-gray-900 text-white p-2 rounded-lg shadow-lg text-sm absolute"
          style={{
            minWidth: "140px",
            textAlign: "center",
            left: `${coordinate.x}px`,
            top: `${coordinate.y + 10}px`,
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          <p className="whitespace-nowrap">📅 {formatTimestampToIST(timestamp)}</p>
          <p className="whitespace-nowrap">💰 Price: ₹{price.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BackgroundLayout>
      <SimpleFloatingNav />
      <div className="container mx-auto p-6 text-white">
        <h1 className="text-2xl font-bold text-center mb-4 text-white">
          Indian Stock Market
        </h1>

        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search Stocks..."
            className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-4">
          {filteredStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="p-4 bg-gray-900 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition flex items-center justify-between text-white"
              onClick={() => navigate(`/stock/${stock.symbol}`)}
            >
              <div>
                <h2 className="text-lg font-semibold text-white">{stock.name}</h2>
                <p className="text-gray-300">Price: ₹{stock.price ? stock.price.toFixed(2) : "N/A"}</p>
                <p className="text-gray-300">Market Cap: {stock.marketCap}</p>
              </div>

              <div className="h-20 w-36">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stock.priceHistory}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={stock.isUptrend ? "#10B981" : "#EF4444"}
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

export default StockMarket;
