import db from "../config/database.js";

class StudentFormFetch {
  // Method to fetch forms based on department code, year, and class
  static async findFormsByCode(department_code, year, class_name) {
    try {
      if (!department_code || !year || !class_name) {
        throw new Error("All parameters must be provided");
      }

      const [forms] = await db.execute(
        "SELECT * FROM forms WHERE department_id = ? AND year = ? AND class = ?",
        [department_code, year, class_name]
      );

      
      return forms;
    } catch (error) {
      console.error("Error fetching forms:", error);
      throw error;
    }
  }

  // Method to insert a new form into the database
  static async insertForm(department_id, year, class_name, subject_id, faculty_id) {
    try {
      const [result] = await db.execute(
        "INSERT INTO forms (faculty_id, subject_id, department_id, year, class) VALUES (?, ?, ?, ?, ?)",
        [faculty_id, subject_id, department_id, year, class_name]
      );

      return {
        form_id: result.insertId,
        department_id,
        year,
        class_name,
        subject_id,
        faculty_id,
      };
    } catch (error) {
      console.error("Error inserting form:", error);
      throw error;
    }
  }
}

export default StudentFormFetch;
