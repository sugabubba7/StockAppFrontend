
import React from 'react';

const ChartTypeSelector = ({ activeChartType, onChange }) => {
  const chartTypes = [
    { value: 'candlestick', label: 'Candlestick' },
    { value: 'line', label: 'Line' },
    { value: 'area', label: 'Area' },
    { value: 'bar', label: 'Bar' },
  ];

  return (
    <div className="flex items-center space-x-1">
      {chartTypes.map((chartType) => (
        <button
          key={chartType.value}
          className={`chart-control-btn ${activeChartType === chartType.value ? 'active' : ''}`}
          onClick={() => onChange(chartType.value)}
        >
          {chartType.label}
        </button>
      ))}
    </div>
  );
};

export default ChartTypeSelector;
