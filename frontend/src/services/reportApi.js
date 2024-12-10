export const getReportData = async(faculty_id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/report/${faculty_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch faculty id details.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(err.message);
    }
  } 
