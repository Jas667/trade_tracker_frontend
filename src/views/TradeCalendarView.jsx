// TradeCalendarWrapper.jsx
import React from "react";
import TradeCalendar from "../components/Calendar/TradeCalendar";
import GrossNetButton from "../components/Buttons/GrossNetButton";
import { useGlobalState } from "../../context/GlobalStateContext";

const TradeCalendarView = ({ trades, net, setStartDate, setEndDate}) => {
  const { radioValue, setRadioValue, setMonthClickedStartDate, setMonthClickedEndDate } = useGlobalState();
  // Extract unique months from trades
  const getUniqueMonths = () => {
    const months = trades.map((trade) => {
      const date = new Date(trade.open_date);
      return `${date.getMonth()}-${date.getFullYear()}`;
    });
    return [...new Set(months)].map((item) => ({
      month: parseInt(item.split("-")[0], 10),
      year: parseInt(item.split("-")[1], 10),
    }));
  };

  const uniqueMonths = getUniqueMonths();

  return (
    <>
      <GrossNetButton radioValue={radioValue} setRadioValue={setRadioValue} />
      <div className="flex flex-wrap">
        {uniqueMonths.map(({ month, year }) => (
          <TradeCalendar
            key={`${month}-${year}`}
            trades={trades}
            net={net}
            month={month}
            year={year}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setMonthClickedStartDate={setMonthClickedStartDate}
            setMonthClickedEndDate={setMonthClickedEndDate}
          />
        ))}
      </div>
    </>
  );
};

export default TradeCalendarView;
