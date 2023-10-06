import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export const GlobalStateProvider = ({ children }) => {
  const [isTradeNoteBeingAltered, setIsTradeNoteBeingAltered] = useState(false);
  const [isTradeTagBeingAltered, setIsTradeTagBeingAltered] = useState(false);
  const [radioValue, setRadioValue] = useState(true);

  // //for trade filter
  // const [label, setLabel] = useState("(Trades for Last 30 days)");
  // //set symbol to correct info
  // const [symbol, setSymbol] = useState("");
  // //set selected tags to correct info
  // const [selectedTags, setSelectedTags] = useState([]);
  // const [tagOptions, setTagOptions] = useState("");
  // const [startDate, setStartDate] = useState(thirtyDaysAgo);
  // const [endDate, setEndDate] = useState(today);

  return (
    <GlobalStateContext.Provider
      value={{
        isTradeNoteBeingAltered,
        setIsTradeNoteBeingAltered,
        isTradeTagBeingAltered,
        setIsTradeTagBeingAltered,
        radioValue,
        setRadioValue,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
