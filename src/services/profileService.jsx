const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProfile = async () => { 
      try {
      const response = await fetch(`${API_BASE_URL}user`, {
            method: "GET",
            credentials: "include",
      });
      return response.json();
      } catch (e) {
      console.error(e);
      }
};