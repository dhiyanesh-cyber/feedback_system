import axios from "axios";


// Function to validate admin login
export const validateAdminLogin = async (username, password) => {   
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/validate`, { username, password });
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to login as admin");
  }
};
