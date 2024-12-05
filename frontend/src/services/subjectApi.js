export const fetchSubjectDetails = async (subject_code) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/subject/${subject_code}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch subject.");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };