const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//this is a test service to test number of proxies when using Railway app so that the rate limiter continues to work as expected 

export const testApi = async () => { 
      try {
      const response = await fetch(`${API_BASE_URL}ip`, {
            method: "GET",
            credentials: "include",
      });
      return response.text();
      } catch (e) {
      console.error(e);
      }
};