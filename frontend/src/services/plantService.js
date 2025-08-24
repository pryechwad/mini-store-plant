import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const getPlants = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/plants`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const addPlant = async (plant) => {
  try {
    const res = await axios.post(`${API_URL}/api/plants`, plant);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to add plant');
  }
};

export const updatePlant = async (id, plant) => {
  try {
    const res = await axios.put(`${API_URL}/api/plants/${id}`, plant);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to update plant');
  }
};

export const deletePlant = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/api/plants/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to delete plant');
  }
};
