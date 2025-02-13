import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "@/components/ui/background-layout.jsx";
import { SimpleFloatingNav } from "@/components/Header.jsx";
import { LineChart, Line, ResponsiveContainer } from "recharts";

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
        setCryptos(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    }

    fetchCryptoData();
  }, []);

  // Filter cryptos based on search input
  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BackgroundLayout>
      <SimpleFloatingNav />
      <div className="container mx-auto p-6 text-white">
        <h1 className="text-2xl font-bold text-center mb-4">Crypto Market</h1>

        {/* Search Bar */}
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search Crypto..."
            className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Crypto List - Vertical Layout */}
        <div className="flex flex-col space-y-4">
          {filteredCryptos.map((crypto) => (
            <div
              key={crypto.id}
              className="p-4 bg-gray-900 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition flex items-center justify-between"
              onClick={() => navigate(`/crypto/${crypto.id}`)}
            >
              {/* Left Section: Crypto Info */}
              <div>
                <h2 className="text-lg font-semibold">{crypto.name}</h2>
                <p className="text-gray-300">Price: ${crypto.current_price.toFixed(2)}</p>
                <p className="text-gray-300">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
              </div>

              {/* Right Section: Small Trend Graph */}
              <div className="h-16 w-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={crypto.sparkline_in_7d.price.map((price, index) => ({ index, price }))}>
                    <Line type="monotone" dataKey="price" stroke="#4ade80" strokeWidth={2} dot={false} />
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
