import Table from "react-bootstrap/Table";
import { chunkArray } from "../../services/statisticsService";
import React from "react";

function TableForStats({ statisticData }) {
  const chunkedData = chunkArray(statisticData, 2);

  return (
    <div className="flex justify-center">
      <Table striped bordered hover variant="light">
        <tbody>
          {chunkedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item, colIndex) => (
                <React.Fragment key={colIndex}>
                  <td>{item.title}</td>
                  <td>
                    {typeof item.value === "string"
                      ? item.value
                      : isNaN(item.value) || !isFinite(item.value)
                      ? "N/A"
                      : item.value}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default TableForStats;
