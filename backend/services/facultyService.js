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

  export const getAllFaculty = async () => {
    try {
      const faculty_ids = await FacultyModel.getAllFaculty();
      return faculty_ids;
    } catch (error) {
      console.error("Error fetching faculty id details:", error);
      throw error;
    }
  }; 