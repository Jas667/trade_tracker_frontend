const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadTrades = async (file) => {
  const formData = new FormData();
  formData.append("excelFile", file);
  try {
    const response = await fetch(`${API_BASE_URL}tradedetails/upload-trades`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};
