import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { retrieveAllTagsForTrade } from "../services/tagService";

const Trades = ({ rawTradeData }) => {
  if (rawTradeData.length === 0) return null;

  const [viewingDetails, setViewingDetails] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 10;

  // Calculate the trades for the current page
  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
  const currentTrades = rawTradeData.slice(indexOfFirstTrade, indexOfLastTrade);

  const totalPages = Math.ceil(rawTradeData.length / tradesPerPage);

  const maxPageNumbersToShow = 5;
  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
  startPage = Math.max(1, endPage - maxPageNumbersToShow + 1); // Recalculate start to adjust for end

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleViewClick = async (tradeId) => {
    setSelectedTrade(rawTradeData.find((trade) => trade.id === tradeId));
    setViewingDetails(true);

    // Assuming retrieveAllTagsForTrade is an async function
    const tagResponse = await retrieveAllTagsForTrade(tradeId);
    if (tagResponse && tagResponse.data && tagResponse.data.tags) {
      setTags(tagResponse.data.tags);
    } else {
      setTags([]);
    }
  };

  return (
    <div className="flex flex-col">
      {selectedTrade ? (
        <div className="flex mb-4">
          {/* Left-hand section (vertical layout) */}
          <div className="flex flex-col mr-4 w-1/3">
            {/* Trade details box */}
            <div className="border border-gray-300 p-4 mb-4">
              <p className="font-bold">{selectedTrade.symbol}</p>
              <p className="font-bold">
                {selectedTrade.open_date} -- {selectedTrade.open_time} to{" "}
                {selectedTrade.close_time}
              </p>
              <p>
                Shares Traded:{" "}
                <span className="font-bold">
                  {selectedTrade.total_shares_traded}
                </span>
              </p>
              <p>
                Closed Gross P&L:{" "}
                <span className="font-bold">
                  {Number(selectedTrade.gross_profit_loss).toFixed(2)}
                </span>
              </p>
              <p></p>
              <p>
                Commissions/Fees:
                <span className="font-bold">
                  {(
                    Number(selectedTrade.total_commission) +
                    Number(selectedTrade.total_fees)
                  ).toFixed(2)}
                </span>
              </p>
              <p>
                Closed Net P&L:{" "}
                <span className="font-bold">{selectedTrade.profit_loss}</span>
              </p>
            </div>
            {/* Tags box */}
            <div className="border border-gray-300 p-4">
              <p className="font-bold">Tags:</p>
              {tags.length > 0 ? (
                tags.map((tag) => (
                  // This outer wrapper ensures the entire tag behaves as a single unit for layout
                  <div key={tag.id} className="inline-block mr-2 mb-2">
                    <span className="bg-blue-500 p-1 rounded text-white">
                      {tag.tag_name}
                      {isEditing && (
                        <span
                          className="cursor-pointer ml-3 mr-1 text-black"
                          onClick={() => removeTag(tag)}
                        >
                          x
                        </span>
                      )}
                    </span>
                  </div>
                ))
              ) : (
                <div>No tags set for this trade.</div>
              )}
              <br />
              {isEditing ? (
                <>
                  <Button
                    variant="success"
                    className="mr-2" // Added margin for spacing between buttons
                    onClick={() => {
                      // ... Any save logic you might have ...
                      setIsEditing(false); // Turn off editing mode
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="dark"
                    className="mr-2"
                    onClick={() => {
                      // ... Any cancel logic you might have, like restoring the previous tags ...
                      setIsEditing(false); // Turn off editing mode without saving changes
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    className="mr-2" // Added margin for spacing between buttons
                    onClick={() => {
                      // ... Any save logic you might have ...
                      setIsEditing(false); // Turn off editing mode
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="secondary"
                    className="mr-2" // Added margin for spacing between buttons
                    onClick={() => {
                      // ... Any save logic you might have ...
                      setIsEditing(false); // Turn off editing mode
                    }}
                  >
                    Create New
                  </Button>
                </>
              ) : (
                <Button variant="secondary" onClick={() => setIsEditing(true)}>
                  Edit Tags
                </Button>
              )}
            </div>
          </div>

          {/* Right-hand section for the notes */}
          <div className="border border-gray-300 p-4 flex-grow">
            <Button
              variant="secondary"
              onClick={() => console.log("Add notes to - ", selectedTrade.id)}
            >
              Add Notes
            </Button>
            {selectedTrade.notes ? (
              <p>{selectedTrade.notes}</p>
            ) : (
              <p>
                <br />
                No Notes...
              </p>
            )}
          </div>
        </div>
      ) : null}

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

          {startPage > 1 && (
            <>
              <Pagination.Item onClick={() => setCurrentPage(1)}>
                1
              </Pagination.Item>
              {startPage > 2 && <Pagination.Ellipsis />}
            </>
          )}

          {pageNumbers.map((num) => (
            <Pagination.Item
              key={num}
              active={num === currentPage}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </Pagination.Item>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <Pagination.Ellipsis />}
              <Pagination.Item onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
              </Pagination.Item>
            </>
          )}

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
