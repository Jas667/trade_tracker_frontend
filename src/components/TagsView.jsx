import React, { useEffect } from "react";
import { useGlobalState } from "../../context/GlobalStateContext";
import GrossNetButton from "./GrossNetButton";
import { useState } from "react";
import {
  getStatsForTags,
  getTagNamesForLabels,
  getTotalPLForTags,
} from "../services/tagService";
import StatsForTags from "./TagsViewComponents.jsx/StatsForTags";
import BarChart from "./BarChart";

const TagsView = ({ rawTradeData }) => {
  const { radioValue, setRadioValue } = useGlobalState();

  const [calculatedStatsForTags, setCalculatedStatsForTags] = useState([]);

  // const [tagNames, setTagNames] = useState([]);

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
      <StatsForTags calculatedStatsForTags={calculatedStatsForTags} />
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
