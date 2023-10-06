import React, { useEffect } from "react";
import { useGlobalState } from "../../context/GlobalStateContext";
import GrossNetButton from "../components/GrossNetButton";
import { useState } from "react";
import {
  getStatsForTags,
  getTagNamesForLabels,
  getTotalPLForTags,
} from "../services/tagService";
import StatsForTags from "../components/TagsViewComponents.jsx/StatsForTags";
import BarChart from "../components/BarChart";

const TagsView = ({
  rawTradeData,
  onFilter,
  startDate,
  endDate,
  symbol,
  tagOptions,
  fetchAndProcessTrades,
}) => {
  const { radioValue, setRadioValue } = useGlobalState();

  const [calculatedStatsForTags, setCalculatedStatsForTags] = useState([]);

  const [localSelectedTag, setLocalSelectedTag] = useState([]);

  const handleFilter = () => {
    onFilter(startDate, endDate, symbol, localSelectedTag, tagOptions); // send the filter criteria back to parent
  };

  const [tagDataForHorizontalBarChart, setTagDataForHorizontalBarChart] =
    useState({
      labels: [],
      datasets: [
        {
          label: "Trades Profit/Loss",
          data: [],
        },
      ],
    });
  
    useEffect(() => {
    handleFilter();
    fetchAndProcessTrades();
  }, [localSelectedTag]);

  useEffect(() => {
    if (rawTradeData) {
      const tagStatData = getStatsForTags(rawTradeData);

      setCalculatedStatsForTags(tagStatData);

      //for bar chart
      const tagNamesForLabels = getTagNamesForLabels(tagStatData);
      const tagPL = getTotalPLForTags(tagStatData, radioValue);

      setTagDataForHorizontalBarChart({
        labels: tagNamesForLabels,
        datasets: [
          {
            label: "Trades Profit/Loss",
            data: tagPL,
          },
        ],
      });
    }
  }, [rawTradeData]);

  return (
    <>
      <GrossNetButton radioValue={radioValue} setRadioValue={setRadioValue} />
      <StatsForTags
        calculatedStatsForTags={calculatedStatsForTags}
        setLocalSelectedTag={setLocalSelectedTag}
        handleFilter={handleFilter}
        fetchAndProcessTrades={fetchAndProcessTrades}
        localSelectedTag={localSelectedTag}
      />
      <div className="col-auto py-3 px-5 px-md-5">
        <div className="w-2/3 h-2/3 mx-auto">
          <p className="font-bold">Performance By Tag</p>
          <BarChart
            labels={tagDataForHorizontalBarChart.labels}
            datasets={tagDataForHorizontalBarChart.datasets}
            indexAxis="y"
          />
        </div>
      </div>
    </>
  );
};

export default TagsView;
