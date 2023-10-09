// TradeCalendarWrapper.jsx
import React from 'react';
import TradeCalendar from './TradeCalendar';

const TradeCalendarWrapper = ({ trades, net }) => {
  // Extract unique months from trades
  const getUniqueMonths = () => {
    const months = trades.map(trade => {
      const date = new Date(trade.open_date);
      return `${date.getMonth()}-${date.getFullYear()}`;
    });
    return [...new Set(months)].map(item => ({
      month: parseInt(item.split('-')[0], 10),
      year: parseInt(item.split('-')[1], 10)
    }));
  };

  const uniqueMonths = getUniqueMonths();

  return (
    <div className="flex flex-wrap">
      {uniqueMonths.map(({ month, year }) => (
        <TradeCalendar
          key={`${month}-${year}`}
          trades={trades}
          net={net}
          month={month}
          year={year}
        />
      ))}
    </div>
  );
};

export default TradeCalendarWrapper;
