import React from "react";
import { useState } from "react";
import TradeDetails from "./TradeDetails/TradeDetails";
import TradeList from "./TradeList";
import Pagination from "./Pagination";
import { retrieveAllTagsForTrade } from "../services/tagService";
import BackToTradesButton from "./BackToTradesButton";

const Trades = ({ rawTradeData }) => {
  if (rawTradeData.length === 0) return null;

  const [isViewingDetails, setIsViewingDetails] = useState(false);
  // const [viewingTradesList, setViewingTradesList] = useState(true);
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
    setIsViewingDetails(true);

    const tagResponse = await retrieveAllTagsForTrade(tradeId);
    if (tagResponse && tagResponse.data && tagResponse.data.tags) {
      setTags(tagResponse.data.tags);
    } else {
      setTags([]);
    }
  };

  const handleBackToTradesClick = () => {
    setIsViewingDetails(false);
    setSelectedTrade(null);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
      {selectedTrade ? (
        <>
          <BackToTradesButton
            handleBackToTradesClick={handleBackToTradesClick}
          />
          <TradeDetails
            selectedTrade={selectedTrade}
            tags={tags}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </>
      ) : (
        <>
          <TradeList
            currentTrades={currentTrades}
            handleViewClick={handleViewClick}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default Trades;
