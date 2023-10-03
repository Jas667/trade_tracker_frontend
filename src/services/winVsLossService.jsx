export function sortDataForPieChart(rawTradeData, net = true) {
  let wins = 0;
  let losses = 0;

  rawTradeData.forEach((trade) => {
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
    labels.push(`Winning Days: ${winPercentage}%`);
    data.push(winPercentage);
  }

  if (!isNaN(lossPercentage)) {
    labels.push(`Losing Days: ${lossPercentage}%`);
    data.push(lossPercentage);
  }

  return {
    labels: labels,
    datasets: [
      {
        backgroundColor: ["aqua", "red"],
        data: data,
      },
    ],
  };
}

export function splitDataIntoWinAndLoss(rawTradeData, net = true) {
  const winDays = [];
  const lossDays = [];

  rawTradeData.forEach((trade) => {
    const profitValue = net
      ? parseFloat(trade.profit_loss)
      : parseFloat(trade.gross_profit_loss);
    if (profitValue > 0) {
      winDays.push(trade);
    } else {
      lossDays.push(trade);
    }
  });

  return {winDays, lossDays};
}
