import React from "react";
import ColorSchemesExample from "../components/NavBar";
import TradeFilterBar from "../components/TradeFilterBar";

const Trades = () => {
  return (
    <>
      <ColorSchemesExample />
      <div className="my-3 mx-40 bg-gray-50 flex flex-col justify-center overflow-hidden">
        <TradeFilterBar
      //     startDate={startDate}
      //     endDate={endDate}
      //     onFilter={handleTradeFilter}
      //     today={today}
      //     thirtyDaysAgo={thirtyDaysAgo}
        />
        <div>Trades</div>
      </div>
    </>
  );
};

export default Trades;
