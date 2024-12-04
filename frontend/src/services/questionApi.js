const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`; 

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
