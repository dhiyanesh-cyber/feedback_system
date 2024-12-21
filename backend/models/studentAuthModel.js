import db from "../config/database.js";

class StudentModel {
  static async findByRegisterNumberAndDoB(registerNumber, dob) {
    const query =
      "SELECT * FROM student_details WHERE student_id = ? AND student_dob = ?";
    const [result] = await db.query(query, [registerNumber, dob]);

    return result.length > 0 ? result[0] : null; 
  }

  static async getStudentCount(department_code, year, class_no) {
    const query =
    "SELECT * FROM student_details WHERE student_year = ? AND class = ? AND student_department = ?";
  const [result] = await db.query(query, [year, class_no, department_code]);
  return result.length;
  }
}

export default StudentModel;
