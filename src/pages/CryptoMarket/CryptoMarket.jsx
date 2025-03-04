import React, { useState, useEffect, useCallback } from "react";
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
  Area,
  AreaChart,
} from "recharts";
import { Search, Loader2, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion"; 

function Crypto() {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCryptoData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true"
      );

      if (!response.ok) {
        throw new Error("API rate limit exceeded or network issue");
      }

      const data = await response.json();

      const formattedCryptos = data.map((crypto) => {
        const currentTimestamp = Date.now();
        const timeGap = 7 * 24 * 60 * 60 * 1000;
        const priceHistory = crypto.sparkline_in_7d?.price?.map(
          (price, index) => ({
            timestamp: currentTimestamp - timeGap + index * (60 * 60 * 1000),
            price,
          })
        );

        const latestPrice =
          priceHistory?.length > 0
            ? priceHistory[priceHistory.length - 1]?.price
            : crypto.current_price;

        const previousPrice =
          priceHistory?.length > 1
            ? priceHistory[priceHistory.length - 2]?.price
            : latestPrice;

        const isUptrend = latestPrice >= previousPrice;
        const priceChangePercentage = previousPrice
          ? ((latestPrice - previousPrice) / previousPrice) * 100
          : 0;

        return {
          ...crypto,
          priceHistory,
          isUptrend,
          priceChangePercentage,
        };
      });

      localStorage.setItem("cryptoData", JSON.stringify(formattedCryptos));
      localStorage.setItem("cryptoFetchTimestamp", Date.now().toString());
      setCryptos(formattedCryptos);

      toast.success("Market data updated", {
        description: "Latest cryptocurrency prices loaded",
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      toast.error("Failed to load data", {
        description: "Please try again later or check your connection",
        position: "bottom-right",
      });

      const cachedData = localStorage.getItem("cryptoData");
      if (cachedData) {
        setCryptos(JSON.parse(cachedData));
        toast.info("Using cached data", {
          description: "Showing your last updated market data",
          position: "bottom-right",
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const cachedData = localStorage.getItem("cryptoData");
    const lastFetchTime = localStorage.getItem("cryptoFetchTimestamp");
    const THIRTY_MINUTES = 30 * 60 * 1000;

    if (
      cachedData &&
      lastFetchTime &&
      Date.now() - lastFetchTime < THIRTY_MINUTES
    ) {
      setCryptos(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetchCryptoData();
    }
  }, [fetchCryptoData]);

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap === undefined || marketCap === null) return "N/A";

    if (marketCap >= 1_000_000_000) {
      return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
    } else if (marketCap >= 1_000_000) {
      return `$${(marketCap / 1_000_000).toFixed(2)}M`;
    } else {
      return `$${(marketCap / 1_000).toFixed(2)}K`;
    }
  };

  const formatTimestampToIST = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "short",
    });
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { timestamp, price } = payload[0].payload;
      return (
        <div className="bg-black/80 backdrop-blur-md border border-crypto-border-light rounded-lg p-3 shadow-xl text-sm text-white">
          <p className="mb-1 font-medium">{formatTimestampToIST(timestamp)}</p>
          <p className="font-semibold">{formatPrice(price)}</p>
        </div>
      );
    }
    return null;
  };

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BackgroundLayout>
      <SimpleFloatingNav />
      <div className="container mx-auto px-4 sm:px-6 pb-16 pt-24 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 relative flex justify-between items-center">
            <motion.div
              className="text-4xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Cryptocurrency Market
            </motion.div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search Crypto..."
                className="w-full bg-crypto-card-bg border border-crypto-border-light text-white px-12 py-3 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder:text-crypto-text-secondary placeholder:text-opacity-75 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
              <p className="text-white">Loading market data...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCryptos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-white">
                    No cryptocurrencies found matching your search
                  </p>
                </div>
              ) : (
                filteredCryptos.map((crypto, index) => (
                  <div
                    key={crypto.id}
                    className="bg-crypto-card-bg border border-crypto-border-light rounded-xl backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:bg-crypto-card-hover hover:border-opacity-30 p-4 animate-slide-up hover:scale-[1.02] cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => navigate(`/crypto/${crypto.id}`)}
                  >
                    <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={crypto.image}
                          alt={crypto.name}
                          className="h-12 w-12 rounded-full object-contain bg-white/5 p-1"
                          loading="lazy"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-white">
                              {crypto.name}
                            </h2>
                            <span className="text-white uppercase text-xs font-medium bg-white/5 px-2 py-1 rounded-md">
                              {crypto.symbol}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-1.5 text-sm text-white">
                            <p>
                              <span className="text-crypto-text-secondary mr-1">
                                Price:
                              </span>
                              <span className="font-semibold">
                                {formatPrice(crypto.current_price)}
                              </span>
                            </p>
                            <p>
                              <span className="text-crypto-text-secondary mr-1">
                                Market Cap:
                              </span>
                              <span className="font-medium">
                                {formatMarketCap(crypto.market_cap)}
                              </span>
                            </p>
                            <p
                              className={`flex items-center ${
                                crypto.isUptrend
                                  ? "text-crypto-accent-green"
                                  : "text-crypto-accent-red"
                              }`}
                            >
                              {crypto.isUptrend ? (
                                <TrendingUp className="h-3.5 w-3.5 mr-1" />
                              ) : (
                                <TrendingDown className="h-3.5 w-3.5 mr-1" />
                              )}
                              <span className="font-medium">
                                {crypto.priceChangePercentage?.toFixed(2)}%
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="h-[120px] w-full sm:w-[240px] flex-shrink-0 rounded-lg overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={crypto.priceHistory}>
                            <defs>
                              <linearGradient
                                id={`gradient-${crypto.id}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor={
                                    crypto.isUptrend
                                      ? "rgba(16, 185, 129, 0.6)"
                                      : "rgba(239, 68, 68, 0.6)"
                                  }
                                />
                                <stop
                                  offset="100%"
                                  stopColor={
                                    crypto.isUptrend
                                      ? "rgba(16, 185, 129, 0)"
                                      : "rgba(239, 68, 68, 0)"
                                  }
                                />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="timestamp" hide />
                            <YAxis
                              hide
                              domain={["dataMin - 5", "dataMax + 5"]}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="price"
                              stroke={crypto.isUptrend ? "#10B981" : "#EF4444"}
                              strokeWidth={2}
                              fillOpacity={1}
                              fill={`url(#gradient-${crypto.id})`}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default Crypto;
