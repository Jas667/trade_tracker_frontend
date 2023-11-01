// TradeCalendar.jsx
import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const TradeCalendar = ({
  trades,
  net,
  month,
  year,
  setStartDate,
  setEndDate,
  setMonthClickedStartDate,
  setMonthClickedEndDate,
  setCurrentView,
  setButtonValue,
}) => {
  const [show, setShow] = useState(false);
  const [selectedDayTradeValues, setSelectedDayTradeValues] = useState(null);
  const [modalClosed, setModalClosed] = useState(false);

  const calendarRef = React.useRef(null);

  const handleClose = (event) => {
    if (event) event.stopPropagation();
    setShow(false);
    setModalClosed(true);
    setTimeout(() => setModalClosed(false), 100);
  };

  const handleShow = (day) => {
    const tradeValues = aggregateTradesForDay(day);
    setSelectedDayTradeValues(tradeValues);
    setShow(true);
  };

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

  const aggregateTradesForDay = (day) => {
    return trades
      .filter(
        (trade) =>
          new Date(trade.open_date).toDateString() === day.toDateString()
      )
      .reduce(
        (acc, trade) => {
          acc.gross += parseFloat(trade.gross_profit_loss);
          acc.net += parseFloat(trade.profit_loss);
          return acc;
        },
        { gross: 0, net: 0 }
      );
  };

  const renderDay = (day) => {
    const tradeValues = aggregateTradesForDay(day);
    let bgColor = "bg-gray-200";
    let valueDisplay = "";
    let hasTrades = false;

    // Check if either gross or net value exists for the day
    if (tradeValues.gross !== 0 || tradeValues.net !== 0) {
      const value = net ? tradeValues.net : tradeValues.gross;
      bgColor =
        value > 0
          ? "bg-green-400 hover:bg-green-200"
          : "bg-red-400 hover:bg-red-200";
      valueDisplay = `$${parseFloat(value).toFixed(2)}`;
      hasTrades = true;
    }

    return (
      <div
        key={day.toString()}
        className={`p-2 min-w-20 flex items-center justify-center ${bgColor}`}
        onClick={(e) => {
          e.stopPropagation(); // prevent month's click event
          if (hasTrades) {
            handleShow(day);
          }
        }}
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
    if (show || modalClosed) return;
    if (modalClosed) return;

    setStartDate(start);
    setEndDate(end);
    setMonthClickedStartDate(start);
    setMonthClickedEndDate(end);
    setCurrentView("tradeView");
    setButtonValue("tradeView");
  };

  return (
    <div
      ref={calendarRef}
      className="border border-black m-4 rounded p-2 hover:bg-gray-300 cursor-pointer"
      key={`${startDateString} to ${endDateString}`}
      onClick={(e) => {
        e.stopPropagation();
        handleMonthClick(startDateString, endDateString)
      }}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Trades for{" "}
            {selectedDayTradeValues
              ? new Date(selectedDayTradeValues.open_date).toLocaleDateString()
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display trades for the selected day. This is just an example. */}
          Gross: $
          {selectedDayTradeValues ? selectedDayTradeValues.gross.toFixed(2) : 0}
          <br />
          Net: $
          {selectedDayTradeValues ? selectedDayTradeValues.net.toFixed(2) : 0}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => handleClose(e)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TradeCalendar;
