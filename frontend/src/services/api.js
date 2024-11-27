// services/api.js

export const fetchDepartments = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/departments/`);
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const fetchDetailsByEndpoint = async (endpoint) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error("Failed to fetch details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching details by endpoint:", error);
    throw error;
  }
};
