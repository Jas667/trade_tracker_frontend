import React from "react";
import { useState, useEffect } from "react";
import TradeDetails from "../components/TradeDetails/TradeDetails";
import TradeList from "../components/TradeList";
import Pagination from "../components/Buttons/Pagination";
import { retrieveAllTagsForTrade } from "../services/tagService";
import BackToTradesButton from "../components/Buttons/BackToTradesButton";
import AppContext from "../../context/ContextProvider";
import NextPreviousTradeButton from "../components/Buttons/NextPreviousTradeButton";
const Trades = ({ rawTradeData }) => {
  if (rawTradeData.length === 0) return null;

  const [isViewingDetails, setIsViewingDetails] = useState(false);
  // const [viewingTradesList, setViewingTradesList] = useState(true);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 10;

  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
  const currentTrades = rawTradeData.slice(indexOfFirstTrade, indexOfLastTrade);

  const totalPages = Math.ceil(rawTradeData.length / tradesPerPage);

  const handleViewClick = async (tradeId) => {
    setSelectedTrade(rawTradeData.find((trade) => trade.id === tradeId));
    setIsViewingDetails(true);
  };

  const fetchTagsForTrade = async (tradeId) => {
    const tagResponse = await retrieveAllTagsForTrade(tradeId);
    if (tagResponse && tagResponse.data && tagResponse.data.tags) {
      setTags(tagResponse.data.tags);
    } else {
      setTags([]);
    }
  };

  // const handleTradeChange = (trade) => {
  //   fetchTagsForTrade(trade.id);
  // };

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
          <NextPreviousTradeButton
            rawTradeData={rawTradeData}
            selectedTrade={selectedTrade}
            setSelectedTrade={setSelectedTrade}
          />
          <AppContext.Provider
            value={{
              selectedTrade,
              tags,
              isEditing,
              setIsEditing,
              isCreatingNew,
              setIsCreatingNew,
            }}
          >
            <TradeDetails
              selectedTrade={selectedTrade}
              tags={tags}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              fetchTagsForTrade={fetchTagsForTrade}
              isCreatingNew={isCreatingNew}
              setIsCreatingNew={setIsCreatingNew}
              handleBackToTradesClick={handleBackToTradesClick}
            />
          </AppContext.Provider>
          <NextPreviousTradeButton
            rawTradeData={rawTradeData}
            selectedTrade={selectedTrade}
            setSelectedTrade={setSelectedTrade}
          />
        </>
      ) : (
        <>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
          <TradeList
            currentTrades={currentTrades}
            handleViewClick={handleViewClick}
            fetchTagsForTrade={fetchTagsForTrade}
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
