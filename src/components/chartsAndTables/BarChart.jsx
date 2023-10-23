import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, //x-axis
  LinearScale, //y-axis
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart({ labels, datasets, customOptions, indexAxis = "x" }) {
  const formatLossValue = (value) => {
    let formattedWithoutMinus = value.split("-")[1];
    let parts = formattedWithoutMinus.split(".");

    // Check if the part after the decimal has only one digit
    if (parts[1].length === 1) {
      parts[1] += "0";
    }

    let formattedWithZero = parts.join(".");
    return `P&L: -$${formattedWithZero}`;
  };

  const defaultOptions = {
    plugins: {
      legend: true,
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.formattedValue[0] === "-"
              ? formatLossValue(tooltipItem.formattedValue)
              : `P&L: $${tooltipItem.formattedValue}`;
          },
        },
      },
    },
    indexAxis: indexAxis,
  };

  // merge default options with custom options
  const options = { ...defaultOptions, ...customOptions };

  // Ensure each dataset in datasets has default visual properties, if not provided in props.
  const enhancedDatasets = datasets.map((dataset) => ({
    ...BarChart.defaultProps.singleDatasetDefaults,
    ...dataset,
    backgroundColor: dataset.data.map((value) =>
      value >= 0 ? "#57bcf7" : "#d20005"
    ),
  }));

  return (
    <>
      <Bar
        style={{ width: "100%", height: "100%", margin: "auto" }}
        // className="w-full h-full justify-center"
        data={{ labels, datasets: enhancedDatasets }}
        options={options}
      ></Bar>
    </>
  );
}

//default props for BarChart
BarChart.defaultProps = {
  labels: [],
  datasets: [],
  customOptions: {},
  singleDatasetDefaults: {
    label: "",
    backgroundColor: "#57bcf7",
    borderColor: "black",
    borderWidth: 2,
  },
};

export default BarChart;
