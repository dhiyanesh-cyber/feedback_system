import axios from "axios";

// Function to send OTP to admin email
export const sendAdminOtp = async (email) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/admin/send-otp`,
      { email }
    );
    return response.data; // Contains success message
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to send OTP. Try again later."
    );
  }
};



// Function to validate admin OTP
export const validateAdminOtp = async (email, otp) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/admin/verify-otp`,
      { email, otp }
    );
    return response.data; // Contains admin details
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Invalid OTP or verification failed."
    );
  }
};


// Function to validate admin login
export const validateAdminLogin = async (username, password) => {   
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/validate`, { username, password });
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to login as admin");
  }
};
