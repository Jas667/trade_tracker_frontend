import React from "react";
// import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import { useState } from "react";
// import Pagination from "react-bootstrap/Pagination";
import TradeDetails from "./TradeDetails";
import TradeList from "./TradeList";
import Pagination from "./Pagination";
import { retrieveAllTagsForTrade } from "../services/tagService";

const Trades = ({ rawTradeData }) => {
  if (rawTradeData.length === 0) return null;

  const [viewingDetails, setViewingDetails] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 10;

  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
  const currentTrades = rawTradeData.slice(indexOfFirstTrade, indexOfLastTrade);

  const totalPages = Math.ceil(rawTradeData.length / tradesPerPage);

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
      {selectedTrade && (
        <TradeDetails
          selectedTrade={selectedTrade}
          tags={tags}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
      <TradeList
        currentTrades={currentTrades}
        handleViewClick={handleViewClick}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Trades;
