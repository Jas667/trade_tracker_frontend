import React from "react";
import ColorSchemesExample from "../../components/NavBar/NavBar";
import LineChart from "../../components/chartsAndTables/LineChart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  processTrades,
  filterTradesBySymbol,
  processTradesByDayOfWeek,
  performanceByIntradayHoldTime,
  performanceByStockPrice,
  findAccuracyPercentage,
} from "../../services/tradeServices";
import { getStatistics } from "../../services/statisticsService";
import { retrieveTradesOptionalTags } from "../../services/tagService";
import TradeFilterBar from "../../components/TradeFilterBar/TradeFilterBar";
import BarChart from "../../components/chartsAndTables/BarChart";
import TableForStats from "../../components/chartsAndTables/TableForStats";
import GrossNetButton from "../../components/Buttons/GrossNetButton";
import Trades from "../../views/Trades";
import WinVsLossDays from "../../views/WinVsLossDays";
import { useGlobalState } from "../../../context/GlobalStateContext";
import TagsView from "../../views/TagsView";
import TradeViewsButtons from "../../components/Buttons/TradeViewsButtons";
import TradeCalendarWrapper from "../../views/TradeCalendarView";
import AccuracyCircle from "../../components/chartsAndTables/AccuracyChart";

export default function LoggedIn() {
  const { isTradeNoteBeingAltered, radioValue, setRadioValue, reRenderAfterTagUpdate } =
    useGlobalState();

  const navigate = useNavigate();
  //variables
  //date values for default date range for line chart of last 30 days in format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  //subtract 30 days from today in format YYYY-MM-DD
  const thirtyDaysAgoDate = new Date(
    new Date().getTime() - 30 * 24 * 60 * 60 * 1000
  );
  const thirtyDaysAgo = thirtyDaysAgoDate.toISOString().split("T")[0];

  //state to manage which view we are displaying on the page. This is used to switch between things like chart views or trade views etc.
  const [currentView, setCurrentView] = useState("chartView");
  const [buttonValue, setButtonValue] = useState("chartView");

  //start and end date states
  const [startDate, setStartDate] = useState(thirtyDaysAgo);
  const [endDate, setEndDate] = useState(today);
  //Set legend to correct info
  //base chart labels so name for each can be set
  const [baseChartLabels, setBaseChartLabels] = useState({
    barChart: "Daily P&L",
    lineChart: "Cumulative P&L",
    horizontalDayOfWeek: "Performance by Day of Week",
    horizontalIntradayDuration: "Performance by Intraday Hold Time",
    horizontalByStockPrice: "Performance by Stock Price",
  });
  const [label, setLabel] = useState("(Trades for Last 30 days)");
  //set symbol to correct info
  const [symbol, setSymbol] = useState("");
  //set selected tags to correct info
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState("");
  //radio buttons for net/gross display

  //moved to global state
  // const [radioValue, setRadioValue] = useState(true);

  //statistic data for table
  const [statisticData, setStatisticData] = useState([
    { title: "Total gain/loss:", value: "0.00" },
    { title: "Largest gain:", value: "0.00" },
    { title: "Average daily gain/loss:", value: "0.00" },
    { title: "Largest loss:", value: "0.00" },
    { title: "Average daily volume:", value: "0" },
    { title: "Average per-share gain/loss:", value: "0.00" },
    { title: "Average losing trade:", value: "0.00" },
    { title: "Average winning trade:", value: "0.00" },
    { title: "Probability of random chance:", value: "0%" },
    { title: "Total number of trades:", value: "0" },
    { title: "Profit factor:", value: "0" },
    { title: "Kelly percentage:", value: "0%" },
    { title: "Number of winning trades:", value: "0" },
    { title: "Average Hold Time (winning trades):", value: "0" },
    { title: "Average Hold Time (losing trades):", value: "0" },
    { title: "Number of losing trades:", value: "0" },
    { title: "Max consecutive wins:", value: "0" },
    { title: "Max consecutive losses:", value: "0" },
    { title: "Total commissions:", value: "0.00" },
    { title: "Total fees:", value: "0.00" },
  ]);

  const [rawTradeData, setRawTradeData] = useState([]);

  const [tradeData, setTradeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Trades Profit/Loss",
        data: [],
      },
    ],
  });

  const [tradeDataForBarChart, setTradeDataForBarChart] = useState({
    labels: [],
    datasets: [
      {
        label: "Trades Profit/Loss",
        data: [],
      },
    ],
  });

  const [
    tradeDataForHorizontalDayOfWeekBarChart,
    setTradeDataForHorizontalDayOfWeekBarChart,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Trades Profit/Loss",
        data: [],
      },
    ],
  });

  const [
    tradeDataForHorizontalByPriceBarChart,
    setTradeDataForHorizontalByPriceBarChart,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Trades Profit/Loss",
        data: [],
      },
    ],
  });

  const [
    tradeDataForIntradayPerformanceHorizontalBarChart,
    setTradeDataForIntradayPerformanceHorizontalBarChart,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Trades Profit/Loss",
        data: [],
      },
    ],
  });

  const [accuracy, setAccuracy] = useState(0);

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
      setLabel("(Trades for Last 30 days)");
    } else {
      setLabel(`(${filteredStartDate} to ${filteredEndDate})`);
    }

    setSymbol(filteredSymbol);
    setSelectedTags(filteredTags);
    setTagOptions(filteredSelectedTagOptions);
    // Once you set the new date range, useEffect will automatically trigger to fetch new data
  };

  const fetchAndProcessTrades = async () => {
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

      const response = await retrieveTradesOptionalTags(data);
      if (response.statusCode === 403 || response.statusCode === 401) {
        navigate("/login");
      }

      if (response.message === "Trades found") {
        trades = response.data.trades;
      }
    } else {
      const dataWithNoTags = {
        tagIds: [],
        onlyWithAllTags: false,
        startDate: startDate,
        endDate: endDate,
      };

      const response = await retrieveTradesOptionalTags(dataWithNoTags);
      if (response.statusCode === 403 || response.statusCode === 401) {
        navigate("/login");
      }
      if (response.message === "Trades found") {
        trades = response.data.trades;
      }
    }

    // If there is a symbol, filter the trades by symbol before processing
    if (symbol !== "") {
      trades = filterTradesBySymbol(trades, symbol);
    }

    if (trades) {
      //set raw trade data for use in trades table
      setRawTradeData(trades);
      console.log("rawTradeData", rawTradeData);
      //update statistics table
      const updatedStatistics = getStatistics(
        trades,
        statisticData,
        radioValue
      );

      const processedTradesBarChart = processTrades(
        trades,
        `${baseChartLabels.barChart} ${label}`,
        false,
        radioValue
      );
      const processedTradesLineChart = processTrades(
        trades,
        `${baseChartLabels.lineChart} ${label}`,
        true,
        radioValue
      );
      //process trades by day of the week for bar chart
      const processedTradesByDayOfWeek = processTradesByDayOfWeek(
        trades,
        `${baseChartLabels.horizontalDayOfWeek} ${label}`,
        false,
        radioValue
      );
      //process trades by intraday performance for horizontal bar chart
      const processedTradesByIntradayPerformance =
        performanceByIntradayHoldTime(
          trades,
          `${baseChartLabels.horizontalIntradayDuration} ${label}`,
          radioValue
        );
      //process trades by stock price for horizontal bar chart
      const processedTradesByStockPrice = performanceByStockPrice(
        trades,
        `${baseChartLabels.horizontalByStockPrice} ${label}`,
        radioValue
      );

      const accuracyForCircle = findAccuracyPercentage(trades);


      setStatisticData(updatedStatistics);
      setTradeData(processedTradesLineChart);
      setTradeDataForBarChart(processedTradesBarChart);
      setTradeDataForHorizontalDayOfWeekBarChart(processedTradesByDayOfWeek);
      setTradeDataForIntradayPerformanceHorizontalBarChart(
        processedTradesByIntradayPerformance
      );
      setTradeDataForHorizontalByPriceBarChart(processedTradesByStockPrice);
      setAccuracy(accuracyForCircle);
    }
  };

  useEffect(() => {
    fetchAndProcessTrades();
  }, [
    startDate,
    endDate,
    symbol,
    selectedTags,
    tagOptions,
    radioValue,
    isTradeNoteBeingAltered,
    reRenderAfterTagUpdate
  ]);

  return (
    <>
      <ColorSchemesExample />
      {/* <SideBar /> */}
      <div className="my-3 mx-40 bg-gray-50 flex flex-col justify-center overflow-hidden">
        <TradeFilterBar
          startDate={startDate}
          endDate={endDate}
          onFilter={handleTradeFilter}
          today={today}
          thirtyDaysAgo={thirtyDaysAgo}
        />
        <TradeViewsButtons
          currentView={currentView}
          setCurrentView={setCurrentView}
          buttonValue={buttonValue}
          setButtonValue={setButtonValue}
        />
        {currentView === "chartView" && (
          <>
            <GrossNetButton
              radioValue={radioValue}
              setRadioValue={setRadioValue}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="col-auto py-3 px-5 px-md-5">
                <BarChart
                  labels={tradeDataForBarChart.labels}
                  datasets={tradeDataForBarChart.datasets}
                />
              </div>
              <div className="col-auto py-3 px-5 px-md-5">
                <LineChart
                  labels={tradeData.labels}
                  datasets={tradeData.datasets}
                />
              </div>
              <div className="col-auto py-3 px-5 px-md-5">
                <BarChart
                  labels={tradeDataForHorizontalDayOfWeekBarChart.labels}
                  datasets={tradeDataForHorizontalDayOfWeekBarChart.datasets}
                  indexAxis="y"
                />
              </div>
              <div className="col-auto py-3 px-5 px-md-5">
                <BarChart
                  labels={
                    tradeDataForIntradayPerformanceHorizontalBarChart.labels
                  }
                  datasets={
                    tradeDataForIntradayPerformanceHorizontalBarChart.datasets
                  }
                  indexAxis="y"
                />
              </div>
              <div className="col-auto py-3 px-5 px-md-5">
                <BarChart
                  labels={tradeDataForHorizontalByPriceBarChart.labels}
                  datasets={tradeDataForHorizontalByPriceBarChart.datasets}
                  indexAxis="y"
                  // AccuracyCircle
                />
              </div>
              <div className="col-auto py-3 px-5 px-md-5 d-flex justify-content-center align-items-center">
                <AccuracyCircle accuracy={accuracy}/>
              </div>
            </div>
            <div>
              <TableForStats statisticData={statisticData} />
            </div>
          </>
        )}
        {currentView === "tradeView" && (
          <>
            <div>
              <Trades rawTradeData={rawTradeData} />
            </div>
          </>
        )}
        {currentView === "winVsLossDays" && (
          <>
            <div>
              <WinVsLossDays rawTradeData={rawTradeData} />
            </div>
          </>
        )}
        {currentView === "tagsView" && (
          <>
            <div>
              <TagsView
                rawTradeData={rawTradeData}
                startDate={startDate}
                endDate={endDate}
                handleTradeFilter={handleTradeFilter}
                today={today}
                thirtyDaysAgo={thirtyDaysAgo}
                label={label}
                symbol={symbol}
                tagOptions={tagOptions}
                selectedTags={selectedTags}
                fetchAndProcessTrades={fetchAndProcessTrades}
              />
            </div>
          </>
        )}
        {currentView === "calendarView" && (
          <>
            <div>
              <TradeCalendarWrapper
                trades={rawTradeData}
                net={radioValue}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                currentView={currentView}
                setCurrentView={setCurrentView}
                setButtonValue={setButtonValue}
                buttonValue={buttonValue}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

// const [selectedTags, setSelectedTags] = useState([]);
