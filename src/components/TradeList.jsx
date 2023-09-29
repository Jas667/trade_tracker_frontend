import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const TradeList = ({ currentTrades, handleViewClick }) => {
  return (
    <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>Date</th>
          <th>Symbol</th>
          <th>P&L</th>
          <th>Volume</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {currentTrades.map((trade) => (

          <tr key={trade.id}>
            <td>{trade.open_date}</td>
            <td>{trade.symbol}</td>
            <td style={{ color: trade.profit_loss >= 0 ? "green" : "red" }}>
              {trade.profit_loss}
            </td>
            <td>{trade.total_shares_traded}</td>
            <td>{trade.notes}</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="secondary"
                onClick={() => handleViewClick(trade.id)}
              >
                View
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TradeList;
