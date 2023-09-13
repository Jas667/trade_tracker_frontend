const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (credentials) => { 
      try {
            const response = await fetch(`${API_BASE_URL}user/login`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(credentials),
            })
            return response;

      } catch (e) {
            console.error(e)
      }
};