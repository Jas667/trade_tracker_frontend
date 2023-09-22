import React from "react";
import ColorSchemesExample from "../components/NavBar";
import LineChart from "../components/LineChart";
import { useState, useEffect } from "react";
import {
  processTrades,
  getTradesByDateRange,
  filterTradesBySymbol,
} from "../services/tradeServices";
import TradeFilterBar from "../components/TradeFilterBar";

export default function LoggedIn() {
  //variables
  //date values for default date range for line chart of last 30 days in format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  //subtract 30 days from today in format YYYY-MM-DD
  const thirtyDaysAgoDate = new Date(
    new Date().getTime() - 30 * 24 * 60 * 60 * 1000
  );
  const thirtyDaysAgo = thirtyDaysAgoDate.toISOString().split("T")[0];

  //start and end date states
  const [startDate, setStartDate] = useState(thirtyDaysAgo);
  const [endDate, setEndDate] = useState(today);
  //Set legend to correct info
  const [label, setLabel] = useState("Trades for Last 30 days");
  //set symbol to correct info
  const [symbol, setSymbol] = useState("");

  //trade tags state
  const [tags, setTags] = useState("At least one");
  //selected tags state
  const [selectedTags, setSelectedTags] = useState([]);

  const [tradeData, setTradeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Trades Profit/Loss",
        data: [],
      },
    ],
  });

  const handleTradeFilter = (
    filteredStartDate,
    filteredEndDate,
    filteredSymbol,
    filteredTags,
    filteredSelectedTags
  ) => {
    setStartDate(filteredStartDate);
    setEndDate(filteredEndDate);
    setLabel(`Trades from ${filteredStartDate} to ${filteredEndDate}`);
    setSymbol(filteredSymbol);
    setTags(filteredTags);
    setSelectedTags(filteredSelectedTags);
  };

  useEffect(() => {
    async function fetchAndProcessTrades() {
      const response = await getTradesByDateRange(startDate, endDate);
      let trades = response.data.trades;

      // console.log(tags);
      // console.log(selectedTags);

      // If there is a symbol, filter the trades by symbol before processing
      if (symbol !== "") {
        trades = filterTradesBySymbol(trades, symbol);
      }

      if (trades) {
        const processedTrades = processTrades(trades, label);
        setTradeData(processedTrades);
      }
    }

    fetchAndProcessTrades();
  }, [startDate, endDate, symbol, tags, selectedTags]);

  return (
    <>
      <ColorSchemesExample />
      <div className="my-3 mx-5 bg-gray-50 flex flex-col justify-center">
        <TradeFilterBar
          startDate={startDate}
          endDate={endDate}
          onFilter={handleTradeFilter}
        />
        <div className="my-3">
          <LineChart labels={tradeData.labels} datasets={tradeData.datasets} />
        </div>
      </div>
    </>
  );
}
