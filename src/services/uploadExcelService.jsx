const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadTrades = async (file) => { 
      try {
      const response = await fetch(`${API_BASE_URL}/tradedetails/upload-trades`, {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "multipart/form-data",
            },
            body: file,
      });
      return response;
      } catch (e) {
      console.error(e);
      }
};