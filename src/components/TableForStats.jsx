import Table from "react-bootstrap/Table";
import { useState } from "react";
import { chunkArray } from "../services/statisticsService";
import React from "react";

function TableForStats({ statisticData }) {
  // const statisticCalculationsNet = {
  //   "Total gain/loss:": calculateTotalGainLossNet,
  //   "Largest gain:": calculateLagrestGainNet,
  //   "Average daily gain/loss:": calculateAverageDailyGainLossNet,
  //   "Largest loss:": calculateLargestLossNet,
  // };

  // const statisticCalculationsGross = {
  //   "Total gain/loss:": calculateTotalGainLossGross,
  //   "Largest gain:": calculateLagrestGainGross,
  //   "Average daily gain/loss:": calculateAverageDailyGainLossGross,
  //   "Largest loss:": calculateLargestLossGross,
  // };

  // const chunkArray = (array, size) => {
  //   const results = [];
  //   let copiedArray = [...array]; // Create a shallow copy
  //   while (copiedArray.length) {
  //     results.push(copiedArray.splice(0, size));
  //   }
  //   return results;
  // };

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
                  <td>{item.value}</td>
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
