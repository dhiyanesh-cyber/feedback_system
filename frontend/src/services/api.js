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

