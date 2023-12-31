import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const options = {};

  if (data && data.datasets && data.datasets[0]) {
    data.datasets[0].offset = 6;
  }

  return (
    <>
      <div
        style={{
          margin: "auto",
          padding: "10px",
          width: "50%",
          justifyContent: "center",
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </>
  );
};

export default PieChart;

