import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Filler } from "chart.js";

ChartJS.register(Filler);

function CumulativePLChart({ trades, net }) {
  const selectedField = net ? "profit_loss" : "gross_profit_loss";

  // Compute cumulative data
  const cumulativeData = trades.map((trade, idx, allTrades) =>
    idx === 0
      ? parseFloat(trade[selectedField])
      : parseFloat(trade[selectedField]) +
        parseFloat(allTrades[idx - 1][selectedField])
  );

  cumulativeData.unshift(0); // Prepend a zero to the beginning of the array

  // Adjust the labels: Starting with '0' and then "Trade 1", "Trade 2", and so on
  const tradeLabels = trades.map((_, idx) => `Trade ${idx + 1}`);
  tradeLabels.unshift("0");

  //   const getGradient = (canvas, color) => {
  //     const ctx = canvas.getContext("2d");
  //     const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Assuming the height of your chart is 400. Adjust if necessary
  //     gradient.addColorStop(0, color);
  //     gradient.addColorStop(1, "rgba(255,255,255,0)");
  //     return gradient;
  //   };

  const data = {
    labels: tradeLabels,
    datasets: [
      {
        data: cumulativeData,
        borderColor: "black",
        pointRadius: 3,
        pointHoverRadius: 5,
        borderJoinStyle: "round",
        borderCapStyle: "round",
        fill: {
          target: "origin", // fill to the origin
          above: "rgba(87, 188, 247, 0.4)", // blue fill if value is above target
          below: "rgba(255, 0, 0, 0.4)", // red fill if value is below target
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10, // Adjust to control the number of ticks displayed on the x-axis
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default CumulativePLChart;