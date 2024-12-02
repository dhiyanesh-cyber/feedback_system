import db from "../config/database.js";

class StudentFormFetch {
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
}

export default StudentFormFetch;
