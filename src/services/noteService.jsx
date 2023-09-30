const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addNoteToTrade = async (tradeId, noteObject) => { 
      try {
        const response = await fetch(`${API_BASE_URL}trade/update/${tradeId}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteObject),
        });
        return response.json();
      } catch (e) {
        console.error(e);
      }
}
    
export const getNotesForTrade = async (tradeId) => { 
      try {
        const response = await fetch(`${API_BASE_URL}comment/all/${tradeId}`, {
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