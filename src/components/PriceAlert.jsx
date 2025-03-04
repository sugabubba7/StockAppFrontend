import React, { useState } from 'react';

const PriceAlert = ({ currentPrice, symbol, isDarkMode }) => {
  const [alertPrice, setAlertPrice] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [condition, setCondition] = useState('above'); 
  
  const handleAddAlert = () => {
    if (!alertPrice || isNaN(parseFloat(alertPrice))) return;
    
    const newAlert = {
      id: Date.now(),
      price: parseFloat(alertPrice),
      condition,
      symbol,
      active: true,
      created: new Date().toISOString()
    };
    
    setAlerts([...alerts, newAlert]);
    setAlertPrice('');
  };
  
  const handleRemoveAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden border border-border/30 transition-all duration-300 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
      <div className="px-4 py-3 border-b border-border/10">
        <h3 className="font-medium">Price Alerts</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className={`px-3 py-2 rounded-md text-sm ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-300'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
          <input
            type="number"
            placeholder="Alert price..."
            value={alertPrice}
            onChange={(e) => setAlertPrice(e.target.value)}
            className={`px-3 py-2 rounded-md text-sm flex-1 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-300'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
          />
          <button
            onClick={handleAddAlert}
            className="px-3 py-2 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          >
            Add
          </button>
        </div>
        
        {alerts.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground text-sm">
            No price alerts set
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-3 rounded-md flex items-center justify-between ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                }`}
              >
                <div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      alert.condition === 'above'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {alert.condition === 'above' ? 'Above' : 'Below'}
                    </span>
                    <span className="ml-2 font-medium">${alert.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(alert.created).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveAlert(alert.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceAlert;