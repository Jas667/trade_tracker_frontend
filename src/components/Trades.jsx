import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const Trades = ({ rawTradeData }) => {
  if (rawTradeData.length === 0) return null;

  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 10;

  // Calculate the trades for the current page
  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
  const currentTrades = rawTradeData.slice(indexOfFirstTrade, indexOfLastTrade);

  const handleViewClick = (tradeId) => {
    console.log(`Viewing details for trade with id: ${tradeId}`);
  };

  const totalPages = Math.ceil(rawTradeData.length / tradesPerPage);

  return (
    <div className="flex justify-center flex-col items-center">
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
      <div className="mt-4">
        <Pagination>
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((num) => (
            <Pagination.Item
              key={num + 1}
              active={num + 1 === currentPage}
              onClick={() => setCurrentPage(num + 1)}
            >
              {num + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default Trades;
