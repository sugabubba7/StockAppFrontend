import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "@/components/ui/background-layout.jsx";
import { SimpleFloatingNav } from "@/components/Header.jsx";
import { LineChart, Line, ResponsiveContainer } from "recharts";

function StockMarket() {
  const [stocks, setStocks] = useState([]);
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

      const url = `https://api.twelvedata.com/time_series?symbol=${stockSymbols.join(
        ","
      )}&interval=5min&apikey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === "error") {
        console.error("API Error:", data.message);
        return;
      }

      const formattedStocks = Object.keys(data)
        .filter((key) => data[key]?.meta && data[key]?.values) 
        .map((key) => ({
          name: data[key].meta.symbol,
          symbol: data[key].meta.symbol,
          price: parseFloat(data[key].values[0]?.close || 0),
          marketCap: "N/A",
          priceHistory: data[key].values.map((entry) => ({
            time: entry.datetime,
            price: parseFloat(entry.close),
          })),
        }));

      setStocks(formattedStocks);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchStockData(); 

    const interval = setInterval(() => {
      fetchStockData(); 
    }, 120000);

    return () => clearInterval(interval); 
  }, []);

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
                <h2 className="text-lg font-semibold text-white">
                  {stock.name}
                </h2>
                <p className="text-gray-300">
                  Price: ₹{stock.price ? stock.price.toFixed(2) : "N/A"}
                </p>
                <p className="text-gray-300">Market Cap: {stock.marketCap}</p>
              </div>

              <div className="h-16 w-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stock.priceHistory}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#ffffff"
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
