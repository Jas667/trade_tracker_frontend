import React from "react";
import ColorSchemesExample from "../components/NavBar";
import LineChart from "../components/LineChart";
import { useState, useEffect } from "react";
import {
  processTrades,
  getTradesByDateRange,
  filterTradesBySymbol,
} from "../services/tradeServices";
import { retrieveTradesByTag } from "../services/tagService";
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
  //set selected tags to correct info
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState("");

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
    filteredSelectedTagOptions
  ) => {
    setStartDate(filteredStartDate);
    setEndDate(filteredEndDate);
    
    // Check if the dates are default or not
    if (filteredStartDate === thirtyDaysAgo && filteredEndDate === today) {
      setLabel("Trades for Last 30 days");
    } else {
      setLabel(`Trades from ${filteredStartDate} to ${filteredEndDate}`);
    }
    
    setSymbol(filteredSymbol);
    setSelectedTags(filteredTags);
    setTagOptions(filteredSelectedTagOptions);
    // Once you set the new date range, useEffect will automatically trigger to fetch new data
  };
  

  useEffect(() => {
    async function fetchAndProcessTrades() {
      //variable to hold the trades
      let trades;

      //check if tags are provided, as that will change the data we need to fetch
      if (selectedTags.length > 0) {
        let onlyWithAllTags = false;

        if (tagOptions === "all") {
          onlyWithAllTags = true;
        }

        const data = {
          tagIds: selectedTags,
          onlyWithAllTags: onlyWithAllTags,
          startDate: startDate,
          endDate: endDate,
        };

        const response = await retrieveTradesByTag(data);
        if (response.message === "Trades found") {
          trades = response.data.trades;
        }

      } else {
        const response = await getTradesByDateRange(startDate, endDate);
        if (response.message === "Trades found") { 
          trades = response.data.trades;
        }
      }

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
  }, [startDate, endDate, symbol, selectedTags, tagOptions]);

  return (
    <>
      <ColorSchemesExample />
      <div className="my-3 mx-5 bg-gray-50 flex flex-col justify-center">
        <TradeFilterBar
          startDate={startDate}
          endDate={endDate}
          onFilter={handleTradeFilter}
          today={today}
          thirtyDaysAgo={thirtyDaysAgo}
        />
        <div className="my-3">
          <LineChart labels={tradeData.labels} datasets={tradeData.datasets} />
        </div>
      </div>
    </>
  );
}
