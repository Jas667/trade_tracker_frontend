const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const transformData = (winData, lossData) => {
  return winData.map((winItem, index) => {
    const lossItem = lossData[index];
    return {
      title: winItem.title,
      winDayValue: winItem.value,
      lossDayValue: lossItem.value
    };
  });
}

export const getStatistics = (trades, initialStatistics, isNet = true) => {
  //clone initial stats
  const updatedStatistics = [...initialStatistics];

  for (let stat of updatedStatistics) {
    switch (stat.title) {
      case "Total gain/loss:":
        stat.value = isNet
          ? calculateTotalGainLossNet(trades)
          : calculateTotalGainLossGross(trades);
        break;
      case "Largest gain:":
        stat.value = isNet
          ? calculateLargestGainNet(trades)
          : calculateLargestGainGross(trades);
        break;
      case "Average daily gain/loss:":
        stat.value = isNet
          ? calculateAverageDailyGainLossNet(trades)
          : calculateAverageDailyGainLossGross(trades);
        break;
      case "Largest loss:":
        stat.value = isNet
          ? calculateLargestLossNet(trades)
          : calculateLargestLossGross(trades);
        break;
      case "Average daily volume:":
        stat.value = calculateAverageDailyVolume(trades);
        break;
      case "Average per-share gain/loss:":
        stat.value = isNet
          ? calculateAveragePerShareGainLossNet(trades)
          : calculateAveragePerShareGainLossGross(trades);
        break;
      case "Average losing trade:":
        stat.value = isNet
          ? calculateAverageLosingTradeNet(trades)
          : calculateAverageLosingTradeGross(trades);
        break;
      case "Average winning trade:":
        stat.value = isNet
          ? calculateAverageWinningTradeNet(trades)
          : calculateAverageWinningTradeGross(trades);
        break;
      case "Probability of random chance:":
        stat.value = probabilityOfRandomChance(trades) + "%";
        break;
      case "Total number of trades:":
        stat.value = totalNumberOfTrades(trades);
        break;
      case "Profit factor:":
        stat.value = isNet
          ? calculateProfitFactorNet(trades)
          : calculateProfitFactorGross(trades);
        break;
      case "Kelly percentage:":
        stat.value = isNet
          ? calculateKellyPercentageNet(trades)
          : calculateKellyPercentageGross(trades);
        break;
      case "Number of winning trades:":
        stat.value = calculateNumberOfWinningTrades(trades);
        break;
      case "Average Hold Time (winning trades):":
        stat.value = calculateAverageHoldTimeWinningTrades(trades);
        break;
      case "Average Hold Time (losing trades):":
        stat.value = calculateAverageHoldTimeLosingTrades(trades);
        break;
      case "Number of losing trades:":
        stat.value = calculateNumberOfLosingTrades(trades);
        break;
      case "Max consecutive wins:":
        stat.value = calculateMaxConsecutiveWins(trades);
        break;
      case "Max consecutive losses:":
        stat.value = calculateMaxConsecutiveLosses(trades);
        break;
      case "Total commissions:":
        stat.value = calculateTotalCommissions(trades);
        break;
      case "Total fees:":
        stat.value = calculateTotalFees(trades);
        break;
    }
  }
  return updatedStatistics;
};

export const chunkArray = (array, size) => {
  const results = [];
  let copiedArray = [...array]; // Create a shallow copy
  while (copiedArray.length) {
    results.push(copiedArray.splice(0, size));
  }
  return results;
};

//functions to calculate statistics. Each entry has a function for gross/net, both grouped together for ease if changes are necessary
const calculateTotalGainLossNet = (trades) => {
  return trades
    .reduce((acc, trade) => acc + parseFloat(trade.profit_loss), 0)
    .toFixed(2);
};
const calculateTotalGainLossGross = (trades) => {
  return trades
    .reduce((acc, trade) => acc + parseFloat(trade.gross_profit_loss), 0)
    .toFixed(2);
};

//largest gain
const calculateLargestGainNet = (trades) => {
  return trades
    .reduce((acc, trade) => {
      if (parseFloat(trade.profit_loss) > acc) {
        acc = parseFloat(trade.profit_loss);
      }
      return acc;
    }, 0)
    .toFixed(2);
};
const calculateLargestGainGross = (trades) => {
  return trades
    .reduce((acc, trade) => {
      if (parseFloat(trade.gross_profit_loss) > acc) {
        acc = parseFloat(trade.gross_profit_loss);
      }
      return acc;
    }, 0)
    .toFixed(2);
};
//average daily gain/loss
const calculateAverageDailyGainLossNet = (trades) => {
  return (
    trades.reduce((acc, trade) => acc + parseFloat(trade.profit_loss), 0) /
    trades.length
  ).toFixed(2);
};
const calculateAverageDailyGainLossGross = (trades) => {
  return (
    trades.reduce(
      (acc, trade) => acc + parseFloat(trade.gross_profit_loss),
      0
    ) / trades.length
  ).toFixed(2);
};
//largest loss
const calculateLargestLossNet = (trades) => {
  return trades
    .reduce((acc, trade) => {
      if (parseFloat(trade.profit_loss) < acc) {
        acc = parseFloat(trade.profit_loss);
      }
      return acc;
    }, 0)
    .toFixed(2);
};
const calculateLargestLossGross = (trades) => {
  return trades
    .reduce((acc, trade) => {
      if (parseFloat(trade.gross_profit_loss) < acc) {
        acc = parseFloat(trade.gross_profit_loss);
      }
      return acc;
    }, 0)
    .toFixed(2);
};
//average daily volume using total_shares_traded
const calculateAverageDailyVolume = (trades) => {
  return (
    trades.reduce(
      (acc, trade) => acc + parseFloat(trade.total_shares_traded),
      0
    ) / trades.length
  ).toFixed(0);
};
const calculateAveragePerShareGainLossNet = (trades) => {
  return (
    trades.reduce((acc, trade) => acc + parseFloat(trade.profit_loss), 0) /
    trades.reduce(
      (acc, trade) => acc + parseFloat(trade.total_shares_traded),
      0
    )
  ).toFixed(2);
};
const calculateAveragePerShareGainLossGross = (trades) => {
  return (
    trades.reduce(
      (acc, trade) => acc + parseFloat(trade.gross_profit_loss),
      0
    ) /
    trades.reduce(
      (acc, trade) => acc + parseFloat(trade.total_shares_traded),
      0
    )
  ).toFixed(2);
};
//average losing trade
const calculateAverageLosingTradeNet = (trades) => {
  const losingTrades = trades.filter(
    (trade) => parseFloat(trade.profit_loss) < 0
  );
  const totalLoss = losingTrades.reduce(
    (acc, trade) => acc + parseFloat(trade.profit_loss),
    0
  );

  return (totalLoss / losingTrades.length).toFixed(2);
};

const calculateAverageLosingTradeGross = (trades) => {
  const losingTrades = trades.filter(
    (trade) => parseFloat(trade.gross_profit_loss) < 0
  );
  const totalLoss = losingTrades.reduce(
    (acc, trade) => acc + parseFloat(trade.gross_profit_loss),
    0
  );

  return (totalLoss / losingTrades.length).toFixed(2);
};
//average winning trade
const calculateAverageWinningTradeNet = (trades) => {
  const winningTrades = trades.filter(
    (trade) => parseFloat(trade.profit_loss) > 0
  );
  const totalWin = winningTrades.reduce(
    (acc, trade) => acc + parseFloat(trade.profit_loss),
    0
  );

  return (totalWin / winningTrades.length).toFixed(2);
};
const calculateAverageWinningTradeGross = (trades) => {
  const winningTrades = trades.filter(
    (trade) => parseFloat(trade.gross_profit_loss) > 0
  );
  const totalWin = winningTrades.reduce(
    (acc, trade) => acc + parseFloat(trade.gross_profit_loss),
    0
  );

  return (totalWin / winningTrades.length).toFixed(2);
};

//probability of random chance
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function binomialCoefficient(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function binomialProbability(n, k) {
  const p = 0.5; // Assuming equal chance for success and failure
  return binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

const probabilityOfRandomChance = (trades) => {
  const totalTrades = trades.length;
  const numberOfWins = calculateNumberOfWinningTrades(trades);
  let probability = 0;
  for (let i = numberOfWins; i <= totalTrades; i++) {
    probability += binomialProbability(totalTrades, i);
  }
  return probability.toFixed(2);
};
//total number of trades
const totalNumberOfTrades = (trades) => {
  return trades.length;
};
//profit factor
const calculateProfitFactorNet = (trades) => {
  let netProfit = 0;
  let netLoss = 0;

  trades.forEach((trade) => {
    const profitOrLoss = parseFloat(trade.profit_loss);
    if (profitOrLoss > 0) {
      netProfit += profitOrLoss;
    } else {
      netLoss += Math.abs(profitOrLoss); // Absolute value for losses
    }
  });

  // Check for divide by zero scenario
  if (netLoss === 0) {
    // If there's no loss, but there's profit, we can consider the profit factor as infinity.
    // If there's no profit either, then it's undefined (or could be set to 0).
    return netProfit > 0 ? Infinity : 0;
  }

  return (netProfit / netLoss).toFixed(2); // Rounded to 2 decimal places
};
const calculateProfitFactorGross = (trades) => {
  let grossProfit = 0;
  let grossLoss = 0;

  trades.forEach((trade) => {
    const profitOrLoss = parseFloat(trade.gross_profit_loss);
    if (profitOrLoss > 0) {
      grossProfit += profitOrLoss;
    } else {
      grossLoss += Math.abs(profitOrLoss); // Absolute value for losses
    }
  });

  // Check for divide by zero scenario
  if (grossLoss === 0) {
    // If there's no loss, but there's profit, we can consider the profit factor as infinity.
    // If there's no profit either, then it's undefined (or could be set to 0).
    return grossProfit > 0 ? Infinity : 0;
  }

  return (grossProfit / grossLoss).toFixed(2); // Rounded to 2 decimal places
};

//kelly percentage
const calculateKellyPercentageNet = (trades) => {
  const totalTrades = trades.length;
  const winningTrades = trades.filter(
    (trade) => parseFloat(trade.profit_loss) > 0
  ).length;
  const losingTrades = totalTrades - winningTrades;

  const averageWin =
    trades
      .filter((trade) => parseFloat(trade.profit_loss) > 0)
      .reduce((sum, trade) => sum + parseFloat(trade.profit_loss), 0) /
    winningTrades;

  const averageLoss =
    trades
      .filter((trade) => parseFloat(trade.profit_loss) < 0)
      .reduce(
        (sum, trade) => sum + Math.abs(parseFloat(trade.profit_loss)),
        0
      ) / losingTrades;

  const b = averageWin / averageLoss;
  const p = winningTrades / totalTrades;
  const q = 1 - p;

  const kellyPercentage = (b * p - q) / b;

  return Math.max(0, kellyPercentage.toFixed(2)); // Rounded to 2 decimal places, and ensure it's non-negative
};
const calculateKellyPercentageGross = (trades) => {
  const totalTrades = trades.length;
  const winningTrades = trades.filter(
    (trade) => parseFloat(trade.gross_profit_loss) > 0
  ).length;
  const losingTrades = totalTrades - winningTrades;

  const averageWin =
    trades
      .filter((trade) => parseFloat(trade.gross_profit_loss) > 0)
      .reduce((sum, trade) => sum + parseFloat(trade.gross_profit_loss), 0) /
    winningTrades;

  const averageLoss =
    trades
      .filter((trade) => parseFloat(trade.gross_profit_loss) < 0)
      .reduce(
        (sum, trade) => sum + Math.abs(parseFloat(trade.gross_profit_loss)),
        0
      ) / losingTrades;

  const b = averageWin / averageLoss;
  const p = winningTrades / totalTrades;
  const q = 1 - p;

  const kellyPercentage = (b * p - q) / b;

  return Math.max(0, kellyPercentage.toFixed(2)); // Rounded to 2 decimal places, and ensure it's non-negative
};

//number of winning trades
const calculateNumberOfWinningTrades = (trades) => {
  return trades.filter((trade) => parseFloat(trade.profit_loss) > 0).length;
};
//average hold time
// Calculate hold time in seconds for a trade
const calculateHoldTimeInSeconds = (openTime, closeTime) => {
  const openDate = new Date(`1970-01-01T${openTime}Z`);
  const closeDate = new Date(`1970-01-01T${closeTime}Z`);
  return (closeDate - openDate) / 1000;
};
// Convert seconds to the format "X minute(s) Y second(s)"
const formatSecondsToTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  let result = "";
  if (minutes > 0) {
    result += `${minutes} minute${minutes !== 1 ? "s" : ""} `;
  }
  if (remainingSeconds > 0 || result === "") {
    result += `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
  }

  return result.trim();
};

// Average hold time for winning trades
const calculateAverageHoldTimeWinningTrades = (trades) => {
  const winningTrades = trades.filter(
    (trade) => parseFloat(trade.gross_profit_loss) > 0
  );
  const totalHoldTime = winningTrades.reduce((acc, trade) => {
    return acc + calculateHoldTimeInSeconds(trade.open_time, trade.close_time);
  }, 0);
  const averageTimeInSeconds = totalHoldTime / winningTrades.length;
  return formatSecondsToTime(Math.round(averageTimeInSeconds));
};

// Average hold time for losing trades
const calculateAverageHoldTimeLosingTrades = (trades) => {
  const losingTrades = trades.filter(
    (trade) => parseFloat(trade.gross_profit_loss) < 0
  );
  const totalHoldTime = losingTrades.reduce((acc, trade) => {
    return acc + calculateHoldTimeInSeconds(trade.open_time, trade.close_time);
  }, 0);
  const averageTimeInSeconds = totalHoldTime / losingTrades.length;
  return formatSecondsToTime(Math.round(averageTimeInSeconds));
};
//number of losing trades
const calculateNumberOfLosingTrades = (trades) => {
  return trades.filter((trade) => parseFloat(trade.profit_loss) < 0).length;
};
// Max consecutive wins
const calculateMaxConsecutiveWins = (trades) => {
  let currentStreak = 0;
  let maxStreak = 0;

  trades.forEach((trade) => {
    if (parseFloat(trade.gross_profit_loss) > 0) {
      // if the trade is a win
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0; // reset streak
    }
  });

  return maxStreak;
};

// Max consecutive losses
const calculateMaxConsecutiveLosses = (trades) => {
  let currentStreak = 0;
  let maxStreak = 0;

  trades.forEach((trade) => {
    if (parseFloat(trade.gross_profit_loss) < 0) {
      // if the trade is a loss
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0; // reset streak
    }
  });
  return maxStreak;
};
//total commissions
const calculateTotalCommissions = (trades) => {
  return trades
    .reduce((acc, trade) => acc + parseFloat(trade.total_commission), 0)
    .toFixed(2);
};
//total fees
const calculateTotalFees = (trades) => {
  return trades
    .reduce((acc, trade) => acc + parseFloat(trade.total_fees), 0)
    .toFixed(2);
};
