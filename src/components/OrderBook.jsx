import React, { useState, useEffect } from 'react';

const OrderBook = ({ symbol, price, isDarkMode }) => {
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  
  useEffect(() => {
    const generateOrderBook = () => {
      const basePrice = price;
      const bids = [];
      const asks = [];
      
      for (let i = 0; i < 10; i++) {
        const bidPrice = basePrice * (1 - (0.001 * (i + 1) * (Math.random() * 0.5 + 0.75)));
        const bidSize = Math.random() * 10 + 0.5;
        bids.push({
          price: bidPrice,
          size: bidSize,
          total: bidPrice * bidSize
        });
      }
      
      for (let i = 0; i < 10; i++) {
        const askPrice = basePrice * (1 + (0.001 * (i + 1) * (Math.random() * 0.5 + 0.75)));
        const askSize = Math.random() * 10 + 0.5;
        asks.push({
          price: askPrice,
          size: askSize,
          total: askPrice * askSize
        });
      }
      
      bids.sort((a, b) => b.price - a.price);
      
      asks.sort((a, b) => a.price - b.price);
      
      setOrderBook({ bids, asks });
    };
    
    generateOrderBook();
    const interval = setInterval(() => {
      generateOrderBook();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [price]);

  const maxBidVolume = Math.max(...orderBook.bids.map(bid => bid.size));
  const maxAskVolume = Math.max(...orderBook.asks.map(ask => ask.size));
  
  return (
    <div className={`rounded-lg shadow-lg overflow-hidden border border-border/30 transition-all duration-300 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
      <div className="px-4 py-3 border-b border-border/10">
        <h3 className="font-medium">Order Book</h3>
      </div>
      <div className="max-h-[320px] overflow-y-auto">
        <div className="grid grid-cols-3 text-xs px-4 py-2 border-b border-border/10">
          <div className="font-medium text-left text-muted-foreground">Price (USD)</div>
          <div className="font-medium text-center text-muted-foreground">Size</div>
          <div className="font-medium text-right text-muted-foreground">Total</div>
        </div>
        
        <div className="border-b border-border/10">
          {orderBook.asks.map((ask, index) => (
            <div 
              key={`ask-${index}`} 
              className="grid grid-cols-3 text-xs px-4 py-1.5 relative"
            >
              <div className="absolute inset-0 right-0 z-0" style={{ 
                width: `${(ask.size / maxAskVolume) * 100}%`,
                background: 'rgba(239, 68, 68, 0.1)'
              }}></div>
              <div className="font-medium text-left text-chart-bearish z-10">
                {ask.price.toFixed(2)}
              </div>
              <div className="text-center z-10">{ask.size.toFixed(4)}</div>
              <div className="text-right z-10">{ask.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
        
        <div className="bg-primary/5 py-2 px-4 text-center font-medium border-b border-border/10">
          <span className="text-sm">{price.toFixed(2)} USD</span>
        </div>
        
        <div>
          {orderBook.bids.map((bid, index) => (
            <div 
              key={`bid-${index}`} 
              className="grid grid-cols-3 text-xs px-4 py-1.5 relative"
            >
              <div className="absolute inset-0 right-0 z-0" style={{ 
                width: `${(bid.size / maxBidVolume) * 100}%`,
                background: 'rgba(16, 185, 129, 0.1)'
              }}></div>
              <div className="font-medium text-left text-chart-bullish z-10">
                {bid.price.toFixed(2)}
              </div>
              <div className="text-center z-10">{bid.size.toFixed(4)}</div>
              <div className="text-right z-10">{bid.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
