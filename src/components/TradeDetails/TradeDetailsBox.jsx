const TradeDetailsBox = ({ selectedTrade }) => {
  // Define the color classes based on the P/L values
  const profitLossClass = selectedTrade.profit_loss >= 0 ? 'text-green-500' : 'text-red-500';
  const grossProfitLossClass = selectedTrade.gross_profit_loss >= 0 ? 'text-green-500' : 'text-red-500';

  return (
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
        <span className={`font-bold ${grossProfitLossClass}`}>
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
        <span className={`font-bold ${profitLossClass}`}>
          {Number(selectedTrade.profit_loss).toFixed(2)}
        </span>
      </p>
    </div>
  );
};

export default TradeDetailsBox;
