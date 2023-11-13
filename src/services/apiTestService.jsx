const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const testApi = async () => { 
      try {
      const response = await fetch(`${API_BASE_URL}ip`, {
            method: "GET",
            credentials: "include",
      });
      return response.json();
      } catch (e) {
      console.error(e);
      }
};