// TradeCalendarWrapper.jsx
import React from "react";
import TradeCalendar from "../components/Calendar/TradeCalendar";
import GrossNetButton from "../components/Buttons/GrossNetButton";
import { useGlobalState } from "../../context/GlobalStateContext";

const TradeCalendarView = ({
  trades,
  net,
  setStartDate,
  setEndDate,
  currentView,
  setCurrentView,
  setButtonValue,
}) => {
  const {
    radioValue,
    setRadioValue,
    setMonthClickedStartDate,
    setMonthClickedEndDate,
  } = useGlobalState();
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
      <div className="mt-8 mb-6 max-w-xl mx-auto">
        <ul className="mt-8 mb-6 text-lg leading-relaxed bg-gray-200 p-4 rounded-md shadow-lg text-center list-disc pl-8">
          <li>
            Click on a calendar to switch to the 'Trades View' for that month of
            trades.
          </li>
          <li>
            Click on an individual day that has trade data to view a more
            detailed breakdown of how that day was traded.
          </li>
          <li>
            In expanded day view, hover over a trade to see the tags associated with the trade.
          </li>
        </ul>
      </div>
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
            currentView={currentView}
            setCurrentView={setCurrentView}
            setButtonValue={setButtonValue}
          />
        ))}
      </div>
    </>
  );
};

export default TradeCalendarView;
