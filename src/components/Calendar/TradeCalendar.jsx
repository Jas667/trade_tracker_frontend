// TradeCalendar.jsx
import React from "react";

const TradeCalendar = ({ trades, net, month, year, setStartDate, setEndDate, setMonthClickedStartDate, setMonthClickedEndDate }) => {
  const generateDays = () => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const days = [];

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      days.push(new Date(date));
    }
    return days;
  };

  const findTradeForDay = (day) => {
    return trades.find(
      (trade) => new Date(trade.open_date).toDateString() === day.toDateString()
    );
  };

  const renderDay = (day) => {
    const trade = findTradeForDay(day);
    let bgColor = "bg-gray-200";
    let valueDisplay = "";

    if (trade) {
      const value = net ? trade.profit_loss : trade.gross_profit_loss;
      bgColor = parseFloat(value) > 0 ? "bg-green-400" : "bg-red-400";
      valueDisplay = `$${parseFloat(value).toFixed(2)}`; // added dollar sign and formatted to 2 decimal places
    }

    return (
      <div
        key={trade?.id || day.toString()}
        className={`p-2 min-w-20 flex items-center justify-center ${bgColor}`}
      >
        <div className="text-center text-xs">
          <span className="font-bold underline">{day.getDate()}</span>
          <br />
          <span className="truncate block max-w-full">{valueDisplay}</span>
        </div>
      </div>
    );
  };

  const days = generateDays();
  const placeholderDays = new Date(year, month, 1).getDay();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generatePlaceholderDays = () => {
    return new Array(placeholderDays).fill(null);
  };

  const placeholderDaysArray = generatePlaceholderDays();

  const startDateString = `${year}-${(month + 1)
    .toString()
    .padStart(2, "0")}-01`;
  const endDate = new Date(year, month + 1, 0);
  const endDateString = `${year}-${(month + 1)
    .toString()
    .padStart(2, "0")}-${endDate.getDate()}`;

  const handleMonthClick = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setMonthClickedStartDate(start);
    setMonthClickedEndDate(end);
  };

  return (
    <div
      className="border border-black m-4 rounded p-2"
      key={`${startDateString} to ${endDateString}`}
      onClick={() => handleMonthClick(startDateString, endDateString)}
    >
      <div className="font-bold text-xl text-center my-2">
        {new Date(year, month).toLocaleString("default", { month: "long" })}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="p-2 min-w-20 flex items-center justify-center"
          >
            <div className="text-center text-xs font-bold">{day}</div>
          </div>
        ))}
        {placeholderDaysArray.map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="p-2 min-w-20 flex items-center justify-center bg-gray-200"
          >
            {/* Empty cell */}
          </div>
        ))}
        {days.map((day) => renderDay(day))}
      </div>
    </div>
  );
};

export default TradeCalendar;
