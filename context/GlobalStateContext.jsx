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
  const [localSelectedTags, setLocalSelectedTags] = useState([]);
  const [initialTagsFromFetch, setInitialTagsFromFetch] = useState([]);
  const [tags, setTags] = useState([]);
  
  const [monthClickedStartDate, setMonthClickedStartDate] = useState("");
  const [monthClickedEndDate, setMonthClickedEndDate] = useState("");

  const [reRenderAfterTagUpdate, setReRenderAfterTagUpdate] = useState(0);


  return (
    <GlobalStateContext.Provider
      value={{
        isTradeNoteBeingAltered,
        setIsTradeNoteBeingAltered,
        isTradeTagBeingAltered,
        setIsTradeTagBeingAltered,
        radioValue,
        setRadioValue,
        localSelectedTags,
        setLocalSelectedTags,
        initialTagsFromFetch,
        setInitialTagsFromFetch,
        tags,
        setTags,
        monthClickedStartDate,
        setMonthClickedStartDate,
        monthClickedEndDate,
        setMonthClickedEndDate,
        reRenderAfterTagUpdate,
        setReRenderAfterTagUpdate
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
