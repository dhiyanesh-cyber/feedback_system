export const getReportData = async (faculty_id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/report/${faculty_id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch faculty id details.");
    }
    const data = await response.json();
    console.log(data);
    
    return data;
  } catch (error) {
    throw new Error(err.message);
  }
}


// Function to fetch the Blob data
export const getReportDepartmentData = async (department_code) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/report/department/${department_code}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/pdf', // Ensure correct header for PDF response
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch PDF.");
  }

  const blob = await response.blob(); // Get the response as a Blob
  return blob;
};