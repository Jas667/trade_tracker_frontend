import React from "react";
import ColorSchemesExample from "../components/NavBar";
import LineChart from "../components/LineChart";
import { useState, useEffect } from "react";
import { processTrades, getTradesByDateRange } from "../services/tradeServices";
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


  const [tradeData, setTradeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Trades Profit/Loss",
        data: [],
      },
    ],
  });

  useEffect(() => {
    async function fetchAndProcessTrades() {
      const response = await getTradesByDateRange(startDate, endDate);
      const trades = response.data.trades;

      if (trades) {
        const processedTrades = processTrades(trades, label);
        setTradeData(processedTrades);
      }
    }

    fetchAndProcessTrades();
  }, []); // Run this effect only once, on component mount

  return (
    <>
      <ColorSchemesExample />
      <div className="my-3 mx-5 bg-gray-50 flex flex-col justify-center">
        <TradeFilterBar />
        <div className="my-3">
          <LineChart labels={tradeData.labels} datasets={tradeData.datasets}  />
        </div>
      </div>
    </>
  );
}
