import FacultyModel from "../models/facultyModel.js";

export const getFacultyById = async (faculty_id) => {
    try {
      const faculty = await FacultyModel.getFacultyByCode(faculty_id);
      return faculty;
    } catch (error) {
      console.error("Error fetching faculty details:", error);
      throw error;
    }
  };