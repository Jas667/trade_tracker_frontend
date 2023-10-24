const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadImage = async (file, tradeId) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await fetch(`${API_BASE_URL}image/add/${tradeId}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    return response.json();
  } catch (e) {
    console.error(e);
  }
};
