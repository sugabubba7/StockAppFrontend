import React from 'react';

const StatItem = ({ label, value, className = '' }) => {
  return (
    <div className="flex flex-col space-y-1">
      <span className="metric-label">{label}</span>
      <span className={`metric-value ${className}`}>{value}</span>
    </div>
  );
};

const MarketStatsCard = ({ crypto, isDarkMode }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: value >= 1000000 ? 'compact' : 'standard',
      maximumFractionDigits: value >= 1000000 ? 2 : 2,
    }).format(value);
  };
  
  const formatChange = (value) => {
    const isPositive = value > 0;
    return (
      <span className={isPositive ? 'indicator-up' : 'indicator-down'}>
        {isPositive ? '↑' : '↓'} {Math.abs(value).toFixed(2)}%
      </span>
    );
  };

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden transition-all duration-300 border border-border/30 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
      <div className="px-5 py-4 border-b border-border/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={crypto.image.small} alt={crypto.name} className="w-8 h-8 mr-3" />
            <div>
              <h2 className="font-semibold">{crypto.name}</h2>
              <p className="text-xs text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">{formatCurrency(crypto.market_data.current_price.usd)}</p>
            <p className="text-xs">
              {formatChange(crypto.market_data.price_change_percentage_24h)}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-6 mb-4">
          <StatItem 
            label="Market Cap" 
            value={formatCurrency(crypto.market_data.market_cap.usd)} 
          />
          <StatItem 
            label="24h Volume" 
            value={formatCurrency(crypto.market_data.total_volume.usd)} 
          />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <StatItem 
            label="Circulating Supply" 
            value={`${crypto.market_data.circulating_supply.toLocaleString()} ${crypto.symbol.toUpperCase()}`} 
          />
          <StatItem 
            label="Max Supply" 
            value={crypto.market_data.max_supply 
              ? `${crypto.market_data.max_supply.toLocaleString()} ${crypto.symbol.toUpperCase()}`
              : 'Unlimited'} 
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <StatItem 
            label="Fully Diluted Val." 
            value={formatCurrency(crypto.market_data.fully_diluted_valuation.usd || 0)} 
          />
          <StatItem 
            label="All-Time High" 
            value={formatCurrency(crypto.market_data.ath.usd)} 
            className="indicator-up"
          />
        </div>
      </div>
    </div>
  );
};

export default MarketStatsCard;
