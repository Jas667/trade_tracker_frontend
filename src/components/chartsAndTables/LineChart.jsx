import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x-axis
  LinearScale, //y-axis
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

function LineChart({ labels, datasets, customOptions }) {
  const defaultOptions = {
    plugins: {
      legend: true,
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Cumulative P&L: $${tooltipItem.formattedValue}`;
          },
        },
      },
    },
  };

  // merge default options with custom options
  const options = { ...defaultOptions, ...customOptions };

  // Ensure each dataset in datasets has default visual properties, if not provided in props.
  const enhancedDatasets = datasets.map((dataset) => ({
    ...LineChart.defaultProps.singleDatasetDefaults,
    ...dataset,
  }));

  return (
    <>
      <Line
        className="w-full h-full justify-center"
        data={{ labels, datasets: enhancedDatasets }}
        options={options}
      ></Line>
    </>
  );
}

//default props for LineChart
LineChart.defaultProps = {
  labels: [],
  datasets: [],
  customOptions: {},
  singleDatasetDefaults: {
    label: "",
    borderColor: "black",
    backgroundColor: "#57bcf7",
    pointBackgroundColor: "#57bcf7",
    pointBorderColor: "#57bcf7",
    borderWidth: 2,
  },
};

export default LineChart;
