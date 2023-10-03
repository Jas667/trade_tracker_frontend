import React, { useState, useEffect } from "react";
import PieChart from "./WinVsLossComponents/PieChart";
import { sortDataForPieChart, splitDataIntoWinAndLoss } from "../services/winVsLossService";
import { processTradesByDayOfWeek } from "../services/tradeServices";

const WinVsLossDays = ({ rawTradeData }) => {
  const [tradeDataForPieChart, setTradeDataForPieChart] = useState({
    labels: [],
    datasets: [
      {
        label: "Trades Profit/Loss",
        data: [],
      },
    ],
  });

  const [
    dataForHorizontalDayOfWeekBarChart,
    setDataForHorizontalDayOfWeekBarChart,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Win Days",
        data: [],
        backgroundColor: "aqua",
      },
      {
        label: "Loss Days",
        data: [],
        backgroundColor: "red",
      }
    ],
  });

  useEffect(() => {
    async function processTradeData() {
      const processedTradeDataForPieChart = sortDataForPieChart(rawTradeData);

      const {winDays, lossDays} = splitDataIntoWinAndLoss(rawTradeData);
          

      setTradeDataForPieChart(processedTradeDataForPieChart);
    }

    processTradeData();
  }, []);

  return (
    <>
      <div>Win Vs Loss Days</div>
              <PieChart data={tradeDataForPieChart} />
    </>
  );
};

export default WinVsLossDays;
