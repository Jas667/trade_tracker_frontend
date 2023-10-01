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
    const [isTradeDataBeingAltered, setIsTradeDataBeingAltered ] = useState(false);

    return (
        <GlobalStateContext.Provider value={{ isTradeDataBeingAltered, setIsTradeDataBeingAltered }}>
            {children}
        </GlobalStateContext.Provider>
    );
}
