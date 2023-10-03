import React, { useState, useEffect } from "react";
import PieChart from "./WinVsLossComponents/PieChart";
import {
  sortDataForPieChart,
  splitDataIntoWinAndLoss,
} from "../services/winVsLossService";
import { processTradesByDayOfWeek } from "../services/tradeServices";
import BarChart from "./BarChart";

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
        label: "Performance by Day of Week",
        data: [],
        backgroundColor: "aqua",
      },
      {
        label: "",
        data: [],
        backgroundColor: "red",
      },
    ],
  });

  useEffect(() => {
    async function processTradeData() {
      const processedTradeDataForPieChart = sortDataForPieChart(rawTradeData);

      const { winDays, lossDays } = splitDataIntoWinAndLoss(rawTradeData);
      const byDayOfWeekWinDays = processTradesByDayOfWeek(
        winDays,
        "Wins",
        true
      );
      const byDayOfWeekLossDays = processTradesByDayOfWeek(
        lossDays,
        "Losses",
        true
      );

      // 1. Process the data for day of week
      const processedWinData = {
        label: "Win Days",
        data: byDayOfWeekWinDays.data,
        backgroundColor: "aqua",
      };

      const processedLossData = {
        label: "Loss Days",
        data: byDayOfWeekLossDays.data,
        backgroundColor: "red",
      };

      // 2. Integrate and set the data to state
      setDataForHorizontalDayOfWeekBarChart((prevState) => ({
        ...prevState,
        labels: byDayOfWeekWinDays.labels, // assuming both responses have the same labels
        datasets: [processedWinData, processedLossData],
      }));

      setTradeDataForPieChart(processedTradeDataForPieChart);
    }

    processTradeData();
  }, []);

  return (
    <>
      <p>Winning vs Losing Days</p>
      <PieChart data={tradeDataForPieChart} />
      <p>Performance By Day Of the Week</p>
      <BarChart
                        labels={
                          dataForHorizontalDayOfWeekBarChart.labels
                        }
                        datasets={
                          dataForHorizontalDayOfWeekBarChart.datasets
                        }
                        indexAxis="y"
      />
    </>
  );
};

export default WinVsLossDays;
