
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const register = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const logout = async (navigateCallback) => { 
  try {
    const response = await fetch(`${API_BASE_URL}user/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      navigateCallback("/login");
    }

    return response;
  } catch (e) {
    console.error(e);
  }
};
