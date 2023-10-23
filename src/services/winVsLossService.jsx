import { groupTradesByDate } from "./tradeServices";

export function sortDataForPieChart(rawTradeData, net = true) {
  let wins = 0;
  let losses = 0;

  //group trades by date and convert grouped trades to an array
  const groupedTradesArray = Object.values(groupTradesByDate(rawTradeData));

  groupedTradesArray.forEach((trade) => {
    const profitValue = net
      ? parseFloat(trade.profit_loss)
      : parseFloat(trade.gross_profit_loss);
    if (profitValue > 0) {
      wins += 1;
    } else {
      losses += 1;
    }
  });

  //work out wins and losses as a percentage to one decimal place
  const total = wins + losses;
  const winPercentage = ((wins / total) * 100).toFixed(1);
  const lossPercentage = ((losses / total) * 100).toFixed(1);

  let labels = [];
  let data = [];

  if (!isNaN(winPercentage)) {
    labels.push(`(${wins}) Winning Days: ${winPercentage}%`);
    data.push(winPercentage);
  }

  if (!isNaN(lossPercentage)) {
    labels.push(`(${losses}) Losing Days: ${lossPercentage}%`);
    data.push(lossPercentage);
  }

  return {
    labels: labels,
    datasets: [
      {
        backgroundColor: ["#57bcf7", "#d20005"],
        data: data,
      },
    ],
  };
}

export function splitDataIntoWinAndLoss(rawTradeData, net = true) {
  const winDays = [];
  const lossDays = [];

  // Step 1: Group trades by date and calculate the net profit/loss for each date
  const groupedByDate = rawTradeData.reduce((acc, trade) => {
    const profitValue = net
      ? parseFloat(trade.profit_loss)
      : parseFloat(trade.gross_profit_loss);
    if (!acc[trade.close_date]) {
      acc[trade.close_date] = {
        trades: [],
        netProfit: 0,
      };
    }
    acc[trade.close_date].trades.push(trade);
    acc[trade.close_date].netProfit += profitValue;
    return acc;
  }, {});

  // Step 2: Based on the net result for each date, push all trades of that date to winDays or lossDays
  Object.values(groupedByDate).forEach((group) => {
    if (group.netProfit > 0) {
      winDays.push(...group.trades);
    } else {
      lossDays.push(...group.trades);
    }
  });

  return { winDays, lossDays };
}
