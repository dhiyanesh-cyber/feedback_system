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


  // Get form details by form id
  static async getFormById(form_id) {
    try {
      if (!form_id) {
        throw new Error("All parameters must be provided");
      }

      const [form] = await db.execute(
        "SELECT * FROM forms WHERE form_id = ? ",
        [form_id]
      );


      return form[0];
    } catch (error) {
      console.error("Error fetching form details:", error);
      throw error;
    }
  }

  // Method to fetch forms based on department code and year
  static async toggleFormLiveStatus(department_code, year, status_code) {
    try {
      if (!year || !department_code || !status_code) {
        throw new Error("All parameters must be provided");
      }

      const [forms] = await db.execute(
        "UPDATE forms SET is_live = ? WHERE year = ? AND department_id	= ?",
        [status_code, year, department_code]
      );


      return forms;
    } catch (error) {
      console.error("Error fetching forms:", error);
      throw error;
    }
  }



  static async findFormsByYearAndClass(department_code, year, class_name) {
    try {
      if (!year || !class_name) {
        throw new Error("All parameters must be provided");
      }

      const [forms] = await db.execute(
        "SELECT * FROM forms WHERE year = ? AND class = ? AND department_id	= ?",
        [year, class_name, department_code]
      );


      return forms;
    } catch (error) {
      console.error("Error fetching forms:", error);
      throw error;
    }
  }

  static async findFormsByFaculty(faculty_id) {
    try {
      if (!faculty_id) {
        throw new Error("faculty id is needed");
      }

      const [forms] = await db.execute(
        "SELECT * FROM forms WHERE faculty_id = ?",
        [faculty_id]
      )

      return forms;
    } catch (error) {
      console.error("Error fetching forms:", error);
      throw error;
    }
  }

  // Method to insert a new form into the database
  static async insertForm(department_id, year, class_name, subject_id, faculty_id, student_count) {
    try {
      const [result] = await db.execute(
        "INSERT INTO forms (faculty_id, subject_id, department_id, year, class, students_count) VALUES (?, ?, ?, ?, ?, ?)",
        [faculty_id, subject_id, department_id, year, class_name, student_count]
      );

      return {
        form_id: result.insertId,
        department_id,
        year,
        class_name,
        subject_id,
        faculty_id,
        student_count
      };
    } catch (error) {
      console.error("Error inserting form:", error);
      throw error;
    }
  }

  static async deleteForm(form_id) {
    try {
      const [result] = await db.execute(
        "DELETE FROM forms WHERE (form_id = ?);",
        [form_id]
      );

      return {
        message: "Form Deleted Successfully"
      };
    } catch (error) {
      console.error("Error deleting form:", error);
      throw error;
    }
  }
}

export default StudentFormFetch;
