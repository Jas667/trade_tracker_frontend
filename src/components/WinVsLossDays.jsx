import React, { useState, useEffect } from "react";
import PieChart from "./WinVsLossComponents/PieChart";
import StatsForWinLoss from "./WinVsLossComponents/StatsForWinLoss";
import { useGlobalState } from "../../context/GlobalStateContext";

import {
  sortDataForPieChart,
  splitDataIntoWinAndLoss,
} from "../services/winVsLossService";
import { processTradesByDayOfWeek } from "../services/tradeServices";
import BarChart from "./BarChart";
import { getStatistics, transformData } from "../services/statisticsService";
import GrossNetButton from "./GrossNetButton";

const WinVsLossDays = ({ rawTradeData }) => {
  const { radioValue, setRadioValue } = useGlobalState();

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

  const [initialWinDayStatisticData, setInitialWinDayStatisticData] = useState([
    { title: "Total gain/loss:", value: "0.00" },
    { title: "Largest gain:", value: "0.00" },
    { title: "Average daily gain/loss:", value: "0.00" },
    { title: "Largest loss:", value: "0.00" },
    { title: "Average daily volume:", value: "0" },
    { title: "Average per-share gain/loss:", value: "0.00" },
    { title: "Average losing trade:", value: "0.00" },
    { title: "Average winning trade:", value: "0.00" },
    // { title: "Probability of random chance:", value: "0%" },
    { title: "Total number of trades:", value: "0" },
    // { title: "Profit factor:", value: "0" },
    // { title: "Kelly percentage:", value: "0%" },
    { title: "Number of winning trades:", value: "0" },
    { title: "Average Hold Time (winning trades):", value: "0" },
    { title: "Average Hold Time (losing trades):", value: "0" },
    { title: "Number of losing trades:", value: "0" },
    { title: "Max consecutive wins:", value: "0" },
    { title: "Max consecutive losses:", value: "0" },
    { title: "Total commissions:", value: "0.00" },
    { title: "Total fees:", value: "0.00" },
  ]);

  const [initialLossDayStatisticData, setInitialLossDayStatisticData] =
    useState([
      { title: "Total gain/loss:", value: "0.00" },
      { title: "Largest gain:", value: "0.00" },
      { title: "Average daily gain/loss:", value: "0.00" },
      { title: "Largest loss:", value: "0.00" },
      { title: "Average daily volume:", value: "0" },
      { title: "Average per-share gain/loss:", value: "0.00" },
      { title: "Average losing trade:", value: "0.00" },
      { title: "Average winning trade:", value: "0.00" },
      // { title: "Probability of random chance:", value: "0%" },
      { title: "Total number of trades:", value: "0" },
      // { title: "Profit factor:", value: "0" },
      // { title: "Kelly percentage:", value: "0%" },
      { title: "Number of winning trades:", value: "0" },
      { title: "Average Hold Time (winning trades):", value: "0" },
      { title: "Average Hold Time (losing trades):", value: "0" },
      { title: "Number of losing trades:", value: "0" },
      { title: "Max consecutive wins:", value: "0" },
      { title: "Max consecutive losses:", value: "0" },
      { title: "Total commissions:", value: "0.00" },
      { title: "Total fees:", value: "0.00" },
    ]);

  //combined win and loss data for final statistics
  const [finalStatisticData, setFinalStatisticData] = useState([
    { title: "Total gain/loss:", winDayValue: "0.00", lossDayValue: "0.00" },
    { title: "Largest gain:", winDayValue: "0.00", lossDayValue: "0.00" },
    {
      title: "Average daily gain/loss:",
      winDayValue: "0.00",
      lossDayValue: "0.00",
    },
    { title: "Largest loss:", winDayValue: "0.00", lossDayValue: "0.00" },
    { title: "Average daily volume:", winDayValue: "0", lossDayValue: "0" },
    {
      title: "Average per-share gain/loss:",
      winDayValue: "0.00",
      lossDayValue: "0.00",
    },
    {
      title: "Average losing trade:",
      winDayValue: "0.00",
      lossDayValue: "0.00",
    },
    {
      title: "Average winning trade:",
      winDayValue: "0.00",
      lossDayValue: "0.00",
    },
    // { title: "Probability of random chance:", winDayValue: "0%", lossDayValue: "0%" },
    { title: "Total number of trades:", winDayValue: "0", lossDayValue: "0" },
    // { title: "Profit factor:", winDayValue: "0", lossDayValue: "0" },
    // { title: "Kelly percentage:", winDayValue: "0%", lossDayValue: "0%" },
    { title: "Number of winning trades:", winDayValue: "0", lossDayValue: "0" },
    {
      title: "Average Hold Time (winning trades):",
      winDayValue: "0",
      lossDayValue: "0",
    },
    {
      title: "Average Hold Time (losing trades):",
      winDayValue: "0",
      lossDayValue: "0",
    },
    { title: "Number of losing trades:", winDayValue: "0", lossDayValue: "0" },
    { title: "Max consecutive wins:", winDayValue: "0", lossDayValue: "0" },
    { title: "Max consecutive losses:", winDayValue: "0", lossDayValue: "0" },
    { title: "Total commissions:", winDayValue: "0.00", lossDayValue: "0.00" },
    { title: "Total fees:", winDayValue: "0.00", lossDayValue: "0.00" },
  ]);

  useEffect(() => {
    async function processTradeData() {
      const processedTradeDataForPieChart = sortDataForPieChart(rawTradeData, radioValue);

      const { winDays, lossDays } = await splitDataIntoWinAndLoss(rawTradeData);

      const winDayStatisticData = getStatistics(
        winDays,
        initialWinDayStatisticData,
        radioValue
      );
      const lossDayStatisticData = getStatistics(
        lossDays,
        initialLossDayStatisticData,
        radioValue
      );

      const joinedFinalStatisticData = transformData(
        winDayStatisticData,
        lossDayStatisticData
      );

      const byDayOfWeekWinDays = processTradesByDayOfWeek(
        winDays,
        "Wins",
        true,
        radioValue
      );
      const byDayOfWeekLossDays = processTradesByDayOfWeek(
        lossDays,
        "Losses",
        true,
        radioValue
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
      setFinalStatisticData(joinedFinalStatisticData);
    }

    processTradeData();
  }, [rawTradeData, radioValue]);

  return (
    <>
      <GrossNetButton radioValue={radioValue} setRadioValue={setRadioValue} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="col-auto py-3 px-5 px-md-5">
          <p className="font-bold">Winning vs Losing Days</p>
          <PieChart data={tradeDataForPieChart} />
        </div>
        <div className="col-auto py-3 px-5 px-md-5">
          <p className="font-bold">Performance By Day Of the Week</p>
          <BarChart
            labels={dataForHorizontalDayOfWeekBarChart.labels}
            datasets={dataForHorizontalDayOfWeekBarChart.datasets}
            indexAxis="y"
          />
        </div>
      </div>
      <div>
        <StatsForWinLoss data={finalStatisticData} />
      </div>
    </>
  );
};

export default WinVsLossDays;
