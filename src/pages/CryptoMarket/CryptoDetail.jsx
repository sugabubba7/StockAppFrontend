import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import BackgroundLayout from "@/components/ui/background-layout";
import { SimpleFloatingNav } from "@/components/Header";
import TradingChart from "@/components/TradingChart";
import MarketStatsCard from "@/components/MarketStatsCard";
import OrderBook from "@/components/OrderBook";
import MarketDepth from "@/components/MarketDepth";
import PriceAlert from "@/components/PriceAlert";
import ThemeToggle from "@/components/ThemeToggle";

function CryptoDetail() {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [chartData, setChartData] = useState({ trend: [], candle: [] });
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const dataRefreshInterval = useRef(null);
  
  useEffect(() => {
    const fetchCryptoDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=true`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
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
            const isBullish = close >= open;
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

        const cryptoData = { 
          data, 
          chartData: { trend: priceHistory, candle: candleData }, 
          timestamp: currentTimestamp 
        };

        localStorage.setItem(`crypto_${id}`, JSON.stringify(cryptoData));
        setCrypto(data);
        setChartData(cryptoData.chartData);
        setLastUpdated(new Date(currentTimestamp));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching crypto details:", error);
        setIsLoading(false);
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
        setLastUpdated(new Date(parsedData.timestamp));
        setIsLoading(false);
        return;
      }
    }

    fetchCryptoDetail();
    dataRefreshInterval.current = setInterval(fetchCryptoDetail, 60000 * 5); 
    
    return () => {
      if (dataRefreshInterval.current) {
        clearInterval(dataRefreshInterval.current);
      }
    };
  }, [id]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isLoading) {
    return (
      <BackgroundLayout>
        <SimpleFloatingNav />
        <div className="min-h-screen flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            <div className="absolute animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <div className="absolute h-10 w-10 rounded-full bg-white dark:bg-gray-900"></div>
            <div className="mt-24 text-center">
              <p className="text-lg font-medium">Loading cryptocurrency data...</p>
              <p className="text-sm text-muted-foreground">Please wait a moment</p>
            </div>
          </div>
        </div>
      </BackgroundLayout>
    );
  }

  if (!crypto) {
    return (
      <BackgroundLayout>
        <SimpleFloatingNav />
        <div className="container mx-auto p-6 text-center mt-20">
          <h2 className="text-xl font-bold">Cryptocurrency not found</h2>
          <p className="mt-2">The cryptocurrency you're looking for doesn't exist or couldn't be loaded.</p>
          <a href="/" className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Back to Dashboard
          </a>
        </div>
      </BackgroundLayout>
    );
  }

  return (
    <BackgroundLayout>
      <SimpleFloatingNav />
      <div className={`transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <div className="container mx-auto px-4 py-20 dark:text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={crypto.image.large}
                alt={crypto.name}
                className="w-12 h-12 animate-scale-in"
              />
              <div>
                <h1 className="text-3xl font-bold tracking-tight animate-fade-in">
                  {crypto.name} <span className="text-muted-foreground">({crypto.symbol.toUpperCase()})</span>
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  Last updated: {lastUpdated?.toLocaleString() || 'Unknown'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-3xl font-bold animate-fade-in">
                  ${crypto.market_data.current_price.usd.toFixed(2)}
                </p>
                <p className={`text-sm font-medium animate-fade-in ${
                  crypto.market_data.price_change_percentage_24h >= 0
                    ? 'text-chart-bullish'
                    : 'text-chart-bearish'
                }`}>
                  {crypto.market_data.price_change_percentage_24h >= 0 ? '▲' : '▼'} 
                  {Math.abs(crypto.market_data.price_change_percentage_24h).toFixed(2)}% (24h)
                </p>
              </div>
              <ThemeToggle isDarkMode={darkMode} onToggle={toggleDarkMode} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl glass-card p-5 animate-fade-in">
              <h2 className="section-title">Price Chart</h2>
              <TradingChart chartData={chartData} isDarkMode={darkMode} />
            </div>
            
            <div className="space-y-6">
              <MarketStatsCard crypto={crypto} isDarkMode={darkMode} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                <div className="flex space-x-2">
                  <button className="bg-green-400 rounded-lg trade-btn btn-buy flex-1">
                    Buy {crypto.symbol.toUpperCase()}
                  </button>
                  <button className="bg-red-500 rounded-lg trade-btn btn-sell flex-1">
                    Sell {crypto.symbol.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <OrderBook 
                symbol={crypto.symbol.toUpperCase()} 
                price={crypto.market_data.current_price.usd} 
                isDarkMode={darkMode} 
              />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <MarketDepth 
                symbol={crypto.symbol.toUpperCase()} 
                price={crypto.market_data.current_price.usd} 
                isDarkMode={darkMode} 
              />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <PriceAlert 
                currentPrice={crypto.market_data.current_price.usd} 
                symbol={crypto.symbol.toUpperCase()} 
                isDarkMode={darkMode} 
              />
            </div>
          </div>
          
          <div className="mt-6 glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h2 className="section-title">About {crypto.name}</h2>
            <div className="mt-4 whitespace-pre-line">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {crypto.description?.en 
                  ? crypto.description.en.substring(0, 500) + (crypto.description.en.length > 500 ? '...' : '')
                  : `No description available for ${crypto.name}.`}
              </p>
              
              {crypto.links?.homepage?.[0] && (
                <div className="mt-4">
                  <a 
                    href={crypto.links.homepage[0]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <span>Visit Official Website</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default CryptoDetail;
