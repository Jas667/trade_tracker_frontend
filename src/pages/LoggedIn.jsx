import React from "react";
import ColorSchemesExample from "../components/NavBar";
import LineChart from "../components/LineChart";
import { useState, useEffect } from "react";
import {getTrades, processTrades} from "../services/tradeServices";

export default function LoggedIn() {
  const [tradeData, setTradeData] = useState({
    labels: [],
    datasets: [{
      label: "Trades Profit/Loss",
      data: []
    }]
  });

  useEffect(() => {
    async function fetchAndProcessTrades() {
      const response = await getTrades(); // fetch trades from the API
      const trades = response.data.trades;
      console.log('Raw Trades:', trades);
      
      if (trades) {
        const processedTrades = processTrades(trades);
        setTradeData(processedTrades);

      }
    }

    fetchAndProcessTrades();
  }, []); // Run this effect only once, on component mount
  

  return (
    <>
      <ColorSchemesExample />
      <LineChart labels={tradeData.labels} datasets={tradeData.datasets} />
    </>
  );
}
