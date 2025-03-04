import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const MarketDepth = ({ symbol, price, isDarkMode }) => {
  const generateMarketDepth = () => {
    const basePrice = price;
    const data = [];
    
    for (let i = 20; i > 0; i--) {
      const pricePoint = basePrice * (1 - (0.005 * i));
      const cumulativeVolume = Math.exp(20 - i) * 10;
      data.push({
        price: pricePoint,
        cumulativeBid: cumulativeVolume,
        cumulativeAsk: 0,
      });
    }
    
    data.push({
      price: basePrice,
      cumulativeBid: Math.exp(20) * 10,
      cumulativeAsk: Math.exp(20) * 10,
    });
    
    for (let i = 1; i <= 20; i++) {
      const pricePoint = basePrice * (1 + (0.005 * i));
      const cumulativeVolume = Math.exp(20) * 10 - Math.exp(i) * 10;
      data.push({
        price: pricePoint,
        cumulativeBid: 0,
        cumulativeAsk: cumulativeVolume,
      });
    }
    
    return data;
  };
  
  const depthData = generateMarketDepth();
  
  return (
    <div className={`rounded-lg shadow-lg overflow-hidden border border-border/30 transition-all duration-300 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
      <div className="px-4 py-3 border-b border-border/10">
        <h3 className="font-medium">Market Depth</h3>
      </div>
      <div className="p-3">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={depthData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#2D3748' : '#E2E8F0'} opacity={0.5} />
            <XAxis 
              dataKey="price"
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => value.toFixed(2)}
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: isDarkMode ? '#4A5568' : '#CBD5E0', opacity: 0.3 }}
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: isDarkMode ? '#4A5568' : '#CBD5E0', opacity: 0.3 }}
            />
            <Tooltip 
              formatter={(value, name) => [
                `${value.toFixed(2)}`, 
                name === 'cumulativeBid' ? 'Bid Volume' : 'Ask Volume'
              ]}
              labelFormatter={(value) => `Price: $${value.toFixed(2)}`}
            />
            <Area 
              type="monotone" 
              dataKey="cumulativeBid" 
              stroke="#10B981" 
              fill="#10B981" 
              fillOpacity={0.2} 
            />
            <Area 
              type="monotone" 
              dataKey="cumulativeAsk" 
              stroke="#EF4444" 
              fill="#EF4444" 
              fillOpacity={0.2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketDepth;
