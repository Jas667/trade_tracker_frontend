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

function BarChart({ labels, datasets, customOptions }) {
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
  };

  // merge default options with custom options
  const options = { ...defaultOptions, ...customOptions };

  // Ensure each dataset in datasets has default visual properties, if not provided in props.
  const enhancedDatasets = datasets.map((dataset) => ({
    ...BarChart.defaultProps.singleDatasetDefaults,
    ...dataset,
  }));

  return (
    <>
      <div className="">
        <div className="">
          <Bar
            data={{ labels, datasets: enhancedDatasets }}
            options={options}
          ></Bar>
        </div>
      </div>
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
    backgroundColor: "aqua",
    borderColor: "black",
    borderWidth: 1,
  },
};

export default BarChart;
