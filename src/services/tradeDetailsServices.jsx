const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const individualTradeExecutions = async ({ id }) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}tradedetails/gettradedetailsbytradeid/${id}`,
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
