const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTags = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}tag/all`, {
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

export const retrieveTradesOptionalTags = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}tradetag/retrieve`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

export const retrieveAllTagsForTrade = async (tradeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}tradetag/all/${tradeId}`, {
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

export const deleteTagFromTrade = async (tagIdsObject, tradeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}tradetag/delete/${tradeId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagIdsObject),
    });
    if (response.headers.get("content-type")?.includes("application/json")) {
      return response.json();
    }

    return { status: response.status }; // Return status if there's no JSON body
  } catch (e) {
    console.error(e);
  }
};

export const createNewTag = async (tagNameArray) => {
  try {
    const response = await fetch(`${API_BASE_URL}tag/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagNameArray),
    });
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

export const addTagsToTrade = async (tagIdsObject, tradeId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}tradetag/addatagtotrade/${tradeId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagIdsObject),
      }
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getStatsForTags = (data) => {
  let tagResults = {};

  for (let trade of data) {
    // If the trade has no tags, we'll add it to the 'No Tags' category
    if (trade.tags.length === 0) {
      if (!tagResults["No Tags"]) {
        tagResults["No Tags"] = {
          tagName: "No Tags",
          wins: 0,
          losses: 0,
          grossPL: 0,
          netPL: 0,
          totalTrades: 0,
          totalSharesTraded: 0,
          tradeIds: [],
        };
      }

      let currentTag = tagResults["No Tags"];

      if (parseFloat(trade.gross_profit_loss) > 0) {
        currentTag.wins++;
      } else {
        currentTag.losses++;
      }

      currentTag.grossPL += parseFloat(trade.gross_profit_loss);
      currentTag.netPL += parseFloat(trade.profit_loss);
      currentTag.totalTrades++;
      currentTag.totalSharesTraded += parseInt(trade.total_shares_traded);
      currentTag.tradeIds.push(trade.id);

      continue;
    }

    for (let tag of trade.tags) {
      if (!tagResults[tag.tag_name]) {
        tagResults[tag.tag_name] = {
          tagId: tag.id,
          tagName: tag.tag_name,
          wins: 0,
          losses: 0,
          grossPL: 0,
          netPL: 0,
          totalTrades: 0,
          totalSharesTraded: 0,
          tradeIds: [],
        };
      }

      let currentTag = tagResults[tag.tag_name];

      if (parseFloat(trade.gross_profit_loss) > 0) {
        currentTag.wins++;
      } else {
        currentTag.losses++;
      }

      currentTag.grossPL += parseFloat(trade.gross_profit_loss);
      currentTag.netPL += parseFloat(trade.profit_loss);
      currentTag.totalTrades++;
      currentTag.totalSharesTraded += parseInt(trade.total_shares_traded);
      currentTag.tradeIds.push(trade.id);
    }
  }

  // for (let tag in tagResults) {
  //   let wins = tagResults[tag].wins > 0 ? tagResults[tag].grossPL : 0;
  //   let losses = tagResults[tag].losses > 0 ? -tagResults[tag].grossPL : 0;

  //   tagResults[tag].profitFactor = (losses !== 0) ? (wins / losses) : 'Infinity';
  //   }

  return Object.values(tagResults);
};

export function getTagNamesForLabels(data) {
  let tagNames = [];

  for (let trade of data) {
    if (!tagNames.includes(trade.tagName) && trade.tagName !== "No Tags") {
      tagNames.push(trade.tagName);
    }
  }
  return tagNames;
}

export function getTotalPLForTags(data, net = true) {
  let pl = [];

  for (let trade of data) {
    if (trade.tagName !== "No Tags") {
      // Filtering out 'No Tags'
      if (net) {
        pl.push(trade.netPL);
      } else {
        pl.push(trade.grossPL);
      }
    }
  }

  return pl;
}

export function processTagsTrades(
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
