const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTrades = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}trade`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getTradesByDateRange = async (startDate, endDate) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}trade/dateRange?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

export function filterTradesBySymbol(trades, symbol) {
  //set symbol to all uppercase
  const upperCaseSymbol = symbol.toUpperCase();
  //filter trades by symbol
  const filteredTrades = trades.filter(
    (trade) => trade.symbol === upperCaseSymbol
  );
  return filteredTrades;
}

export function processTrades(trades, label, accumulativePL = false) {
  // 1. Sort the trades by close_date
  trades.sort((a, b) => new Date(a.close_date) - new Date(b.close_date));

  // 2. Group trades by close_date
  const groupedTrades = trades.reduce((acc, trade) => {
    if (!acc[trade.close_date]) {
      acc[trade.close_date] = {
        date: trade.close_date,
        profit_loss: 0,
      };
    }
    acc[trade.close_date].profit_loss += parseFloat(trade.profit_loss);
    return acc;
  }, {});

  // Convert grouped trades to an array
  const groupedTradesArray = Object.values(groupedTrades);

  // 3. Accumulate the profit/loss for the grouped trades
  let cumulative = 0;
  const processedTrades = groupedTradesArray.map((trade) => {
    if (accumulativePL) {
      cumulative += trade.profit_loss;
      return {
        date: trade.date,
        profit_loss: cumulative,
      };
    } else { 
      return {
        date: trade.date,
        profit_loss: trade.profit_loss,
      };
    }
  });

  // 4. Extract labels and dataset
  const labels = processedTrades.map((trade) => trade.date);
  const data = processedTrades.map((trade) => trade.profit_loss);

  return {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
      },
    ],
  };
}