// models/studentAuthModel.js

import db from "../config/database.js";

class StudentModel {
  static async findByRegisterNumberAndDoB(registerNumber, dob) {
    const query =
      "SELECT * FROM student_details WHERE student_id = ? AND student_dob = ?";
    const [result] = await db.query(query, [registerNumber, dob]);

    return result.length > 0 ? result[0] : null; 
  }
}

export default StudentModel;
