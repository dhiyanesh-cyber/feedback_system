import db from "../config/database.js"

class FacultyModel {
  static async getFacultyByCode(faculty_id) {
    try {
      if (!faculty_id) {
        throw new Error("All parameters must be provided");
      }

      const [faculty] = await db.execute(
        "SELECT * FROM faculty_details WHERE code = ?",
        [faculty_id]
      );

      return faculty;
    } catch (error) {
      console.error("Error fetching faculty details:", error);
      throw error;
    }
  }

  static async getAllFaculty() {
    try {
      const [faculty] = await db.execute(
        "SELECT * FROM faculty_details"
      )

      return faculty;
    } catch (error) {
      console.error("Error fetching faculty id details:", error);
      throw error;
    }
  }
}


export default FacultyModel;