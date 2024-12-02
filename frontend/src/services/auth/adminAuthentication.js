import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; 

// Function to validate admin login
export const validateAdminLogin = async (username, password) => {   
  try {
    const response = await axios.post(`${BASE_URL}/admin/validate`, { username, password });
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to login as admin");
  }
};
