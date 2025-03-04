import React from 'react';

const TimeframeSelector = ({ activeTimeframe, onChange }) => {
  const timeframes = [
    { value: '1H', label: '1H' },
    { value: '4H', label: '4H' },
    { value: '1D', label: '1D' },
    { value: '1W', label: '1W' },
    { value: '1M', label: '1M' },
  ];

  return (
    <div className="flex items-center space-x-1">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe.value}
          className={`chart-control-btn ${activeTimeframe === timeframe.value ? 'active' : ''}`}
          onClick={() => onChange(timeframe.value)}
        >
          {timeframe.label}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
