import React from "react";
import { Doughnut } from "react-chartjs-2";

const AccuracyCircle = ({ accuracy }) => {
  const data = {
    labels: ["Trade Accuracy %", "Loss %"],
    datasets: [
      {
        data: [accuracy, 100 - accuracy],
        backgroundColor: ["#57bcf7", "#d20005"],
        borderColor: "black",
        borderWidth: 2,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    cutoutPercentage: 80,
    tooltips: { enabled: true },
    hover: { mode: null },
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, ctx) => {
          return ctx.datasetIndex === 0 ? `${accuracy}%` : "";
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center max-w-xs max-h-xs w-full h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AccuracyCircle;
