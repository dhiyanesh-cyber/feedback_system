export const fetchFacultyDetails = async (faculty_id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/faculty/${faculty_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch faculty details.");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

export const getAllFaculty = async() => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/faculty/ids`);
    if (!response.ok) {
      throw new Error("Failed to fetch faculty id details.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(err.message);
  }
}  