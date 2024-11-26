import  db  from '../config/database.js';

class StudentModel {
    static async findByRegisterNumberAndDoB(registerNumber, dob) {
      const query = "SELECT * FROM student_details WHERE student_id = ? AND student_dob = ?";
      const result = await db.query(query, [registerNumber, dob]);
      return result[0]; 
    }
  }
  
export default StudentModel;