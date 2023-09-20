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
    },
  };

  // merge default options with custom options
  const options = { ...defaultOptions, ...customOptions };

  // Ensure each dataset in datasets has default visual properties, if not provided in props.
  const enhancedDatasets = datasets.map((dataset) => ({
    ...LineChart.defaultProps.singleDatasetDefaults,
    ...dataset,
  }));

  // const data = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       label: "Sales for 2020 (M)",
  //       data: [3, 2, 2, 1, 5, 6],
  //       borderColor: "black",
  //       backgroundColor: "aqua",
  //       pointBackgroundColor: "aqua",
  //       pointBorderColor: "aqua",
  //     },
  //   ],
  // };

  // const options = {
  //   plugins: {
  //     legend: true,
  //   },
  // };

  return (
    <>
      <div className="h-screen">
        <div className="h-1/2 flex justify-center items-center">
        <Line
          data={{ labels, datasets: enhancedDatasets }}
          options={options}
        ></Line>
        </div>
        </div>
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
    backgroundColor: "aqua",
    pointBackgroundColor: "aqua",
    pointBorderColor: "aqua",
  },
};

export default LineChart;
