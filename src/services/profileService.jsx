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

export const editProfile = async (toUpdate) => { 
      try {
      const response = await fetch(`${API_BASE_URL}user/update`, {
            method: "PUT",
            credentials: "include",
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify(toUpdate),
      });
      return response.json();
      } catch (e) {
      console.error(e);
      }
};

export const updatePassword = async (toUpdate) => { 
      try {
      const response = await fetch(`${API_BASE_URL}user/password`, {
            method: "PUT",
            credentials: "include",
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify(toUpdate),
      });
      return response.json();
      } catch (e) {
      console.error(e);
      }
};

export const deleteUserProfile = async () => { 
      try {
      const response = await fetch(`${API_BASE_URL}user/delete`, {
            method: "DELETE",
            credentials: "include",
      });
      return response;
      } catch (e) {
      console.error(e);
      }
};

export const resetPasswordEmail = async (email) => { 
      try {
      const response = await fetch(`${API_BASE_URL}user/reset-password`, {
            method: "PUT",
            credentials: "include",
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
      });
      return response.json();
      } catch (e) {
      console.error(e);
      }
};

export const resetPasswordUsingResetCode = async (resetCode, newPassword) => { 
      try {
      const response = await fetch(`${API_BASE_URL}user/reset-password-token`, {
            method: "PUT",
            credentials: "include",
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({ resetCode, newPassword }),
      });
      return response.json();
      } catch (e) {
      console.error(e);
      }
};