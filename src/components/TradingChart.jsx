import React, { useState } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  CartesianGrid,
  Line,
  Area,
  ReferenceLine,
} from 'recharts';
import TimeframeSelector from './TimeframeSelector';
import ChartTypeSelector from './ChartTypeSelector';

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isCandle = data.open !== undefined;
    const priceChange = isCandle ? data.close - data.open : 0;
    const percentChange = isCandle ? (priceChange / data.open) * 100 : 0;
    
    const isPositive = priceChange >= 0;
    const changeColor = isPositive ? 'text-chart-bullish' : 'text-chart-bearish';
    
    return (
      <div className={`chart-tooltip ${isDarkMode ? 'bg-chart-tooltip-dark' : 'bg-chart-tooltip-light'}`}>
        <p className="text-xs text-muted-foreground mb-1">
          {new Date(label).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        
        {isCandle ? (
          <>
            <div className="grid grid-cols-2 gap-3 mb-1">
              <p className="text-xs flex justify-between">
                <span className="text-muted-foreground">O:</span>
                <span className="font-medium">${data.open.toFixed(2)}</span>
              </p>
              <p className="text-xs flex justify-between">
                <span className="text-muted-foreground">C:</span>
                <span className="font-medium">${data.close.toFixed(2)}</span>
              </p>
              <p className="text-xs flex justify-between">
                <span className="text-muted-foreground">H:</span>
                <span className="font-medium">${data.high.toFixed(2)}</span>
              </p>
              <p className="text-xs flex justify-between">
                <span className="text-muted-foreground">L:</span>
                <span className="font-medium">${data.low.toFixed(2)}</span>
              </p>
            </div>
            <div className="pt-1 border-t border-border/10">
              <p className={`text-xs font-medium ${changeColor}`}>
                {priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
              </p>
            </div>
          </>
        ) : (
          <p className="text-xs font-medium">
            Price: <span className="ml-1">${(data.price || 0).toFixed(2)}</span>
          </p>
        )}
      </div>
    );
  }

  return null;
};

const TradingChart = ({ chartData, isDarkMode }) => {
  const [timeframe, setTimeframe] = useState('1W');
  const [chartType, setChartType] = useState('candlestick');
  const [showVolume, setShowVolume] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  
  const calculate20DMA = () => {
    if (chartType === 'candlestick' || chartType === 'bar') {
      const data = [...chartData.candle];
      const result = [];
      const period = 5; 
      
      for (let i = 0; i < data.length; i++) {
        if (i >= period - 1) {
          let sum = 0;
          for (let j = 0; j < period; j++) {
            sum += data[i - j].close;
          }
          result.push(sum / period);
        } else {
          result.push(null);
        }
      }
      
      return result;
    }
    return [];
  };
  
  const calculate50DMA = () => {
    if (chartType === 'candlestick' || chartType === 'bar') {
      const data = [...chartData.candle];
      const result = [];
      const period = 10;
      
      for (let i = 0; i < data.length; i++) {
        if (i >= period - 1) {
          let sum = 0;
          for (let j = 0; j < period; j++) {
            sum += data[i - j].close;
          }
          result.push(sum / period);
        } else {
          result.push(null);
        }
      }
      
      return result;
    }
    return [];
  };
  
  const ma20 = calculate20DMA();
  const ma50 = calculate50DMA();
  
  const enhancedCandleData = chartData.candle.map((item, index) => ({
    ...item,
    ma20: ma20[index],
    ma50: ma50[index],
    volume: Math.abs(item.close - item.open) * 1000000 * (Math.random() * 0.5 + 0.5), 
  }));
  
  const findMinMax = () => {
    if (chartType === 'candlestick' || chartType === 'bar') {
      const prices = chartData.candle.flatMap(item => [item.high, item.low]);
      return {
        min: Math.min(...prices) * 0.99,
        max: Math.max(...prices) * 1.01
      };
    } else {
      const prices = chartData.trend.map(item => item.price);
      return {
        min: Math.min(...prices) * 0.99,
        max: Math.max(...prices) * 1.01
      };
    }
  };
  
  const { min, max } = findMinMax();
  
  const calculateLevels = () => {
    if (chartType === 'candlestick' || chartType === 'bar') {
      const closes = chartData.candle.map(item => item.close);
      const support = Math.min(...closes) * 1.005;
      const resistance = Math.max(...closes) * 0.995;
      
      return { support, resistance };
    }
    return { support: null, resistance: null };
  };
  
  const { support, resistance } = calculateLevels();

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <TimeframeSelector activeTimeframe={timeframe} onChange={setTimeframe} />
        <div className="flex items-center space-x-3">
          <ChartTypeSelector activeChartType={chartType} onChange={setChartType} />
          <div className="flex items-center space-x-1">
            <button
              className={`chart-control-btn ${showGrid ? 'active' : ''}`}
              onClick={() => setShowGrid(!showGrid)}
            >
              Grid
            </button>
            <button
              className={`chart-control-btn ${showVolume ? 'active' : ''}`}
              onClick={() => setShowVolume(!showVolume)}
            >
              Volume
            </button>
          </div>
        </div>
      </div>
      
      <div className="chart-container h-[400px] rounded-lg overflow-hidden border border-border/20">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartType === 'candlestick' || chartType === 'bar' ? enhancedCandleData : chartData.trend}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDarkMode ? '#2D3748' : '#E2E8F0'} 
                opacity={0.5}
              />
            )}
            
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
              stroke={isDarkMode ? '#CBD5E0' : '#4A5568'}
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: isDarkMode ? '#4A5568' : '#CBD5E0', opacity: 0.3 }}
            />
            
            <YAxis
              domain={[min, max]}
              orientation="right"
              stroke={isDarkMode ? '#CBD5E0' : '#4A5568'}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              width={60}
              axisLine={{ stroke: isDarkMode ? '#4A5568' : '#CBD5E0', opacity: 0.3 }}
            />
            
            <Tooltip 
              content={<CustomTooltip isDarkMode={isDarkMode} />} 
              position={{ y: -5 }}
              cursor={{ stroke: isDarkMode ? '#CBD5E0' : '#4A5568', strokeDasharray: '5 5' }}
            />
            
            {chartType === 'candlestick' && (
              <Bar
                dataKey="close"
                fill="#8884d8"
                shape={({ x, y, width, height, payload }) => {
                  const open = payload.open;
                  const close = payload.close;
                  const isPositive = close >= open;
                  
                  const bodyY = isPositive ? y + (height * (payload.high - close)) / (payload.high - payload.low) : y + (height * (payload.high - open)) / (payload.high - payload.low);
                  const bodyHeight = isPositive 
                    ? (height * (close - open)) / (payload.high - payload.low)
                    : (height * (open - close)) / (payload.high - payload.low);
                  
                  const wickX = x + width / 2;
                  const topWickY = y;
                  const bottomWickY = y + height;
                  
                  return (
                    <g>
                      <line
                        x1={wickX}
                        x2={wickX}
                        y1={topWickY}
                        y2={bodyY}
                        stroke={isPositive ? '#10B981' : '#EF4444'}
                        strokeWidth={1}
                      />
                      
                      <rect
                        x={x + 1}
                        y={bodyY}
                        width={Math.max(1, width - 2)}
                        height={Math.max(1, bodyHeight)}
                        fill={isPositive ? '#10B981' : '#EF4444'}
                        fillOpacity={0.9}
                        stroke={isPositive ? '#10B981' : '#EF4444'}
                        strokeWidth={1}
                      />
                      
                      <line
                        x1={wickX}
                        x2={wickX}
                        y1={bodyY + bodyHeight}
                        y2={bottomWickY}
                        stroke={isPositive ? '#10B981' : '#EF4444'}
                        strokeWidth={1}
                      />
                    </g>
                  );
                }}
              />
            )}
            
            {chartType === 'bar' && (
              <Bar
                dataKey="close"
                shape={({ x, y, width, height, payload }) => {
                  const open = payload.open;
                  const close = payload.close;
                  const color = close >= open ? '#10B981' : '#EF4444';
                  
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={color}
                      fillOpacity={0.7}
                    />
                  );
                }}
              />
            )}
            
            {chartType === 'line' && (
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3B82F6"
                dot={false}
                strokeWidth={2}
                animationDuration={500}
              />
            )}
            
            {chartType === 'area' && (
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3B82F6"
                fillOpacity={0.2}
                fill="url(#colorPrice)"
                dot={false}
                strokeWidth={2}
                animationDuration={500}
              />
            )}
            
            {(chartType === 'candlestick' || chartType === 'bar') && (
              <>
                <Line
                  type="monotone"
                  dataKey="ma20"
                  stroke="#F59E0B"
                  dot={false}
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                />
                <Line
                  type="monotone"
                  dataKey="ma50"
                  stroke="#EC4899"
                  dot={false}
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                />
              </>
            )}
            
            {support && chartType === 'candlestick' && (
              <ReferenceLine
                y={support}
                stroke="#10B981"
                strokeDasharray="3 3"
                label={{
                  value: 'Support',
                  position: 'insideTopLeft',
                  fill: '#10B981',
                  fontSize: 10,
                }}
              />
            )}
            
            {resistance && chartType === 'candlestick' && (
              <ReferenceLine
                y={resistance}
                stroke="#EF4444"
                strokeDasharray="3 3"
                label={{
                  value: 'Resistance',
                  position: 'insideBottomLeft',
                  fill: '#EF4444',
                  fontSize: 10,
                }}
              />
            )}
            
            {showVolume && (chartType === 'candlestick' || chartType === 'bar') && (
              <Bar
                dataKey="volume"
                barSize={4}
                shape={({ x, y, width, height, payload }) => {
                  const isPositive = payload.close >= payload.open;
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={isPositive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}
                    />
                  );
                }}
                yAxisId={1}
              />
            )}
            
            {showVolume && (chartType === 'candlestick' || chartType === 'bar') && (
              <YAxis
                yAxisId={1}
                orientation="left"
                domain={['dataMin', 'dataMax']}
                axisLine={false}
                tickLine={false}
                tick={false}
                width={0}
              />
            )}
            
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TradingChart;