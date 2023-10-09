import React from "react";

const TradeExecutions = ({individualTradeExecutionsData }) => {
  // Utility function to compute fees
  const computeFees = (gross, net, commission) => {
    return parseFloat(gross) - parseFloat(net) - parseFloat(commission);
  };

  return (
    <div className="border border-gray-300 p-4 mb-4">
      <p className="mb-4 text-xl font-bold text-black">Individual Trade Executions</p>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Execution Time</th>
            <th className="border px-4 py-2">Side</th>
            <th className="border px-4 py-2">Commission</th>
            <th className="border px-4 py-2">Fees</th>
            <th className="border px-4 py-2">Gross Proceeds</th>
            <th className="border px-4 py-2">Net Proceeds</th>
          </tr>
        </thead>
        <tbody>
          {individualTradeExecutionsData.map((trade, index) => {
            const fees = computeFees(
              trade.gross_proceeds,
              trade.net_proceeds,
              trade.commission
            );

            return (
              <tr key={index}>
                <td className="border px-4 py-2">{trade.execution_time}</td>
                <td className="border px-4 py-2">
                  {trade.side === "B" ? "Buy" : "Sell"}
                </td>
                <td className="border px-4 py-2">
                  ${parseFloat(trade.commission).toFixed(2)}
                </td>
                <td className="border px-4 py-2">${fees.toFixed(2)}</td>
                <td
                  className={`border px-4 py-2 ${
                    parseFloat(trade.gross_proceeds) > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ${parseFloat(trade.gross_proceeds).toFixed(2)}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    parseFloat(trade.net_proceeds) > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ${parseFloat(trade.net_proceeds).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TradeExecutions;
