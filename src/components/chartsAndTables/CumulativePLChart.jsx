import React from "react";
import { Line } from "react-chartjs-2";

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
  tradeLabels.unshift('0');

  const data = {
    labels: tradeLabels,
    datasets: [
      {
        data: cumulativeData,
        fill: true,
        backgroundColor: function (context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          return value >= 0 ? "#57bcf7" : "red";
        },
        borderColor: "black",
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
          maxTicksLimit: 10 // Adjust to control the number of ticks displayed on the x-axis
        }
      }
    }
  };

  return <Line data={data} options={options} />;
}

export default CumulativePLChart;
