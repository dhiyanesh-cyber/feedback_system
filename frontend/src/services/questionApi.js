const BASE_URL = "http://localhost:3000/api"; 

// Function to validate admin login
export const fetchAllQuestions = async () => {   
  try {
    const response = await fetch(`${BASE_URL}/questions/all`);
    const data = await response.json();
    console.log(data);
    
    return data; 
  } catch (error) {
    console.log(error);
    
    throw new Error(error.response?.data?.message || "Unable to fetch question data");
  }
};
