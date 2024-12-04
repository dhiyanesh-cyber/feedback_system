import axios from "axios";


// Function to validate student login and store the response in local storage
export const validateStudentLogin = async (registerNumber, dob) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/students/validate`,
      { registerNumber, dob },
      { headers: { "Content-Type": "application/json" } }
    );

    // Save the response data in local storage
    const studentData = response.data.student;
    localStorage.setItem("studentData", JSON.stringify(studentData));

    return response.data; // Return the response data from the API
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred during login"
    );
  }
};

// Function to get the logged-in student data from local storage
export const getLoggedInStudent = () => {
  const studentData = localStorage.getItem("studentData");
  return studentData ? JSON.parse(studentData) : null; // Parse and return the data if it exists
};

// Function to clear the student data from local storage (for logout)
export const logoutStudent = () => {
  localStorage.removeItem("studentData");
};
