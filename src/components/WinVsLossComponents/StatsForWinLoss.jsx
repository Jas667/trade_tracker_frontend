import Table from "react-bootstrap/Table";
import React from "react";

function StatsForWinLoss({ data }) {
  if (!data.length) return <div>No Data</div>;
  return (
    <div className="flex justify-center">
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Statistics</th>
            <th style={{ backgroundColor: "aqua" }}>Winning Days</th>
            <th style={{ backgroundColor: "red" }}>Losing Days</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>
                {isNaN(Number(item.winDayValue)) ||
                !isFinite(Number(item.winDayValue))
                  ? "N/A"
                  : item.winDayValue}
              </td>
              <td>
                {isNaN(Number(item.lossDayValue)) ||
                !isFinite(Number(item.lossDayValue))
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
