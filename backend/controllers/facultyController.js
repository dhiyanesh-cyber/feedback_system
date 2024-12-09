import { getAllFaculty as _getAllFaculty, getFacultyById } from "../services/facultyService.js";

export const getFaculty = async (req, res) => {
    try {
      const { faculty_id } = req.params;
      if (!faculty_id) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
  
      const faculty = await getFacultyById(faculty_id);
      res.status(200).json(faculty);
    } catch (error) {
      console.error("Error fetching faculty details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getAllFaculty = async (req, res) => {
    try {
  
      const faculty_ids = await _getAllFaculty();
      res.status(200).json(faculty_ids);
    } catch (error) {
      console.error("Error fetching faculty id details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };  