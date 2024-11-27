import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; // Replace with your backend API URL

export const validateStudentLogin = async (registerNumber, dob) => {
  try {
    const response = await axios.post(`${BASE_URL}/students/validate`, {
      registerNumber,
      dob,
    }, {headers: { 'Content-Type': 'application/json' }},);
    return response.data; // Return the response data from the API
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred during login"
    );
  }
};


