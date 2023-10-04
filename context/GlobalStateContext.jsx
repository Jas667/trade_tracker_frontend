import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
}

export const GlobalStateProvider = ({ children }) => {
    const [isTradeNoteBeingAltered, setIsTradeNoteBeingAltered] = useState(false);
    const [isTradeTagBeingAltered, setIsTradeTagBeingAltered] = useState(false);
  const [radioValue, setRadioValue] = useState(true);


    return (
        <GlobalStateContext.Provider value={{ isTradeNoteBeingAltered, setIsTradeNoteBeingAltered, isTradeTagBeingAltered, setIsTradeTagBeingAltered, radioValue, setRadioValue }}>
            {children}
        </GlobalStateContext.Provider>
    );
}
