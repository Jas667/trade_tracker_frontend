import React from "react";
import Table from "react-bootstrap/Table";

const StatsForTags = ({ calculatedStatsForTags }) => {



  if (!calculatedStatsForTags || !calculatedStatsForTags.length)
    return <div>No Data</div>;

  const sortedStats = [...calculatedStatsForTags].sort((a, b) => {
    if (a.tagName === "No Tags") return 1;
    if (b.tagName === "No Tags") return -1;
    return 0;
  });

  return (
    <div className="flex justify-center mt-4">
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Tag</th>
            <th>Win %</th>
            <th>Gross P&L</th>
            <th>Net P&L</th>
            <th>Count</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {sortedStats.map((item, index) => (
            <tr key={item.tagId || index}>
              <td>{item.tagName}</td>
              <td>{((item.wins / item.totalTrades) * 100).toFixed(2)}%</td>
              <td>{item.grossPL.toFixed(2)}</td>
              <td>{item.netPL.toFixed(2)}</td>
              <td>{item.totalTrades}</td>
              <td>{item.totalSharesTraded}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StatsForTags;
