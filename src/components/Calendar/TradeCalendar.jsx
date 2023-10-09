// TradeCalendar.jsx
import React from 'react';

const TradeCalendar = ({ trades, net, month, year }) => {
  const generateDays = () => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const days = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date));
    }
    return days;
  };

  const findTradeForDay = (day) => {
    return trades.find(trade => new Date(trade.open_date).toDateString() === day.toDateString());
  };

  const renderDay = (day) => {
      const trade = findTradeForDay(day);
      let bgColor = "bg-gray-200";
      let valueDisplay = "";
    
      if (trade) {
        const value = net ? trade.profit_loss : trade.gross_profit_loss;
        bgColor = parseFloat(value) > 0 ? "bg-green-500" : "bg-red-500";
        valueDisplay = `$${parseFloat(value).toFixed(2)}`; // added dollar sign and formatted to 2 decimal places
      }
  
      return (
        <div key={trade?.id || day.toString()} className={`p-2 min-w-20 flex items-center justify-center ${bgColor}`}>
          <div className="text-center text-xs">
            <span className="font-bold underline">{day.getDate()}</span><br/>
            <span className="truncate block max-w-full">{valueDisplay}</span>
          </div>
        </div>
      );
  };
  
  const days = generateDays();
  

  return (
      <div className="border border-black m-4 rounded p-2">
        <div className="font-bold text-xl text-center my-2">{new Date(year, month).toLocaleString('default', { month: 'long' })}</div>
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => renderDay(day))}
        </div>
      </div>
    );
};

export default TradeCalendar;
