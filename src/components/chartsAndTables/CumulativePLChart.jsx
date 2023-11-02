import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Filler } from "chart.js";

ChartJS.register(Filler);

function CumulativePLChart({ trades, net }) {

  const selectedField = net ? "profit_loss" : "gross_profit_loss";

  // Compute cumulative data
  const cumulativeData = trades.reduce((accumulator, currentTrade, idx) => {
    const currentValue = parseFloat(currentTrade[selectedField]);
    if (idx === 0) {
      accumulator.push(currentValue);
    } else {
      accumulator.push(accumulator[idx - 1] + currentValue);
    }
    return accumulator;
  }, []);
  

  cumulativeData.unshift(0); // Prepend a zero to the beginning of the array

  // Adjust the labels: Starting with '0' and then "Trade 1", "Trade 2", and so on
  const tradeLabels = trades.map((_, idx) => `Trade ${idx + 1}`);
  tradeLabels.unshift("0");

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
    tooltip: {
      callbacks: {
        afterBody: () => {
          return "\n";
        },
        footer: (tooltipItems) => {
          let trade = trades[tooltipItems[0].dataIndex];
          if (trade && trade.tags && trade.tags.length) {
            return trade.tags.map(tag => `Tag: ${tag.tag_name}`);
          }
          return null;
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
  },
};



  return <Line data={data} options={options} />;
}

export default CumulativePLChart;
