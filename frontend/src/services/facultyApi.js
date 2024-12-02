export const fetchFacultyDetails = async (faculty_id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/faculty/${faculty_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch forms.");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };