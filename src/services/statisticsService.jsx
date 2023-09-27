const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getStatistics = async (trades) => {
  // console.log("trades", trades);
};

export const chunkArray = (array, size) => {
  const results = [];
  let copiedArray = [...array]; // Create a shallow copy
  while (copiedArray.length) {
    results.push(copiedArray.splice(0, size));
  }
  return results;
};
