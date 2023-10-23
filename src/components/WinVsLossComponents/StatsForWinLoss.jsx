import Table from "react-bootstrap/Table";
import React from "react";

function StatsForWinLoss({ data }) {
  if (!data.length) return <div>No Data</div>;
  return (
    <div className="flex justify-center mt-4">
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Statistics</th>
            <th style={{ backgroundColor: "#57bcf7" }}>Winning Days</th>
            <th style={{ backgroundColor: "#d20005" }}>Losing Days</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>

              <td>
                {typeof item.winDayValue === "string"
                  ? item.winDayValue
                  : isNaN(item.winDayValue) || !isFinite(item.winDayValue)
                  ? "N/A"
                  : item.winDayValue}
              </td>
              <td>
                {typeof item.lossDayValue === "string"
                  ? item.lossDayValue
                  : isNaN(item.lossDayValue) || !isFinite(item.lossDayValue)
                  ? "N/A"
                  : item.lossDayValue}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StatsForWinLoss;
