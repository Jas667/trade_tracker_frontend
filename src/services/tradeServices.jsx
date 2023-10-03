const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function sortTradesByDate(trades) {
  return trades.sort((a, b) => new Date(a.close_date) - new Date(b.close_date));
}

export function groupTradesByDate(trades) {
  return trades.reduce((acc, trade) => {
    if (!acc[trade.close_date]) {
      acc[trade.close_date] = {
        date: trade.close_date,
        profit_loss: 0,
        gross_profit_loss: 0,
        dayOfWeek: new Date(trade.close_date).getDay(),
      };
    }
    acc[trade.close_date].profit_loss += parseFloat(trade.profit_loss);
    acc[trade.close_date].gross_profit_loss += parseFloat(
      trade.gross_profit_loss
    );
    return acc;
  }, {});
}

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

export function processTrades(
  trades,
  label,
  accumulativePL = false,
  net = true
) {
  
  // Convert grouped trades to an array
  const groupedTradesArray = Object.values(groupTradesByDate(trades));
  // 3. Accumulate the profit/loss for the grouped trades
  let cumulative = 0;
  let grossCumulative = 0;
  const processedTrades = groupedTradesArray.map((trade) => {
    if (accumulativePL) {
      cumulative += trade.profit_loss;
      grossCumulative += trade.gross_profit_loss;
      return {
        date: trade.date,
        profit_loss: cumulative,
        gross_profit_loss: grossCumulative,
      };
    } else {
      return {
        date: trade.date,
        profit_loss: trade.profit_loss,
        gross_profit_loss: trade.gross_profit_loss,
      };
    }
  });

  // 4. Extract labels and dataset
  const labels = processedTrades.map((trade) => trade.date);
  const data = processedTrades.map((trade) => trade.profit_loss);
  const grossData = processedTrades.map((trade) => trade.gross_profit_loss);

  if (net) {
    return {
      labels: labels,
      datasets: [
        {
          label: "Net " + label,
          data: data,
        },
      ],
    };
    //else statement returns gross data instead of net
  } else {
    return {
      labels: labels,
      datasets: [
        {
          label: "Gross " + label,
          data: grossData,
        },
      ],
    };
  }
}

export function processTradesByDayOfWeek(trades, label, grouped=false) {
  // 1. Sort the trades by close_date
  trades = sortTradesByDate(trades);

  // Convert grouped trades to an array
  const groupedTradesArray = Object.values(groupTradesByDate(trades));

  // 3. Group by day of the week
  const tradesByDayOfWeek = groupedTradesArray.reduce((acc, dailyTrade) => {
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][dailyTrade.dayOfWeek];

    if (!acc[day]) {
      acc[day] = {
        day: day,
        profit_loss: 0,
      };
    }

    acc[day].profit_loss += dailyTrade.profit_loss;
    return acc;
  }, {});

  // 4. Convert to array and sort by day of the week
  const sortedTradesByDayOfWeek = Object.values(tradesByDayOfWeek).sort(
    (a, b) => {
      const order = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      return order.indexOf(a.day) - order.indexOf(b.day);
    }
  );

  // 5. Extract labels and dataset
  const labels = sortedTradesByDayOfWeek.map((trade) => trade.day);
  const data = sortedTradesByDayOfWeek.map((trade) => trade.profit_loss);

  if (grouped) {
    return {
      labels: labels,
      data: data
    }
  }

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

export function performanceByIntradayHoldTime(trades, label) {
  // 1. Filter intraday trades
  const intradayTrades = trades.filter(
    (trade) => trade.open_date === trade.close_date
  );

  // 2. Compute the hold time for each trade
  const tradesWithHoldTime = intradayTrades.map((trade) => {
    const openTimeParts = trade.open_time.split(":").map(Number);
    const closeTimeParts = trade.close_time.split(":").map(Number);

    const openTime = new Date(
      1970,
      0,
      1,
      openTimeParts[0],
      openTimeParts[1],
      openTimeParts[2]
    );
    const closeTime = new Date(
      1970,
      0,
      1,
      closeTimeParts[0],
      closeTimeParts[1],
      closeTimeParts[2]
    );

    const holdTimeInMinutes = (closeTime - openTime) / (1000 * 60); // Convert milliseconds to minutes
    return {
      ...trade,
      holdTime: holdTimeInMinutes,
    };
  });

  // 3. & 4. Group by duration and sum profit/loss
  const categories = {
    "Under 1:00": { min: 0, max: 1, profit_loss: 0 },
    "1 - 1:59": { min: 1, max: 2, profit_loss: 0 },
    "2 - 2.59": { min: 2, max: 3, profit_loss: 0 },
    "3 - 3.59": { min: 3, max: 4, profit_loss: 0 },
    "4 - 4.49": { min: 4, max: Infinity, profit_loss: 0 },
    "5 +": { min: 5, max: 6, profit_loss: 0 },
    //further time durations can be added here

    // "6 - 9.59": { min: 6, max: 10, profit_loss: 0 },
    // "10 - 19.99": { min: 10, max: 20, profit_loss: 0 },
    // "20 +": { min: 20, max: Infinity, profit_loss: 0 },
  };

  tradesWithHoldTime.forEach((trade) => {
    for (let category in categories) {
      if (
        trade.holdTime >= categories[category].min &&
        trade.holdTime < categories[category].max
      ) {
        categories[category].profit_loss += parseFloat(trade.profit_loss);
        break;
      }
    }
  });

  // Convert the data into the desired format for charting
  const labels = Object.keys(categories);
  const data = labels.map((label) => categories[label].profit_loss);

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
