import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackgroundLayout from "@/components/ui/background-layout.jsx";
import { SimpleFloatingNav } from "@/components/Header.jsx";

function CryptoDetail() {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    async function fetchCryptoDetails() {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await response.json();
        setCrypto(data);
      } catch (error) {
        console.error("Error fetching crypto details:", error);
      }
    }

    fetchCryptoDetails();
  }, [id]);

  if (!crypto) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <BackgroundLayout>
      <SimpleFloatingNav />
      <div className="container mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold text-center">{crypto.name}</h1>
        <div className="flex flex-col items-center mt-6">
          <img src={crypto.image.large} alt={crypto.name} className="w-32 h-32 mb-4" />
          <p className="text-lg">Current Price: ${crypto.market_data.current_price.usd.toFixed(2)}</p>
          <p className="text-lg">Market Cap: ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
          <p className="text-lg">24h High: ${crypto.market_data.high_24h.usd.toFixed(2)}</p>
          <p className="text-lg">24h Low: ${crypto.market_data.low_24h.usd.toFixed(2)}</p>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default CryptoDetail;
