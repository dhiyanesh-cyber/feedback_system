import db from '../config/database.js';

class Faculty {
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM faculty_details');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async create(facultyData) {
    try {
      const { 
        code, 
        faculty_name, 
        dob, 
        age, 
        department, 
        punch_id 
      } = facultyData;
  
      // Ensure dob is in correct format or null
      const formattedDob = dob ? new Date(dob).toISOString().split('T')[0] : null;
  
      const [result] = await db.query(
        'INSERT INTO faculty_details (code, faculty_name, dob, age, department, punch_id) VALUES (?, ?, ?, ?, ?, ?)',
        [code, faculty_name, formattedDob, age, department, punch_id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  static async update(code, facultyData) {
    try {
      const { 
        faculty_name, 
        dob, 
        age, 
        department, 
        punch_id 
      } = facultyData;
  
      // Ensure dob is in correct format or null
      const formattedDob = dob ? new Date(dob).toISOString().split('T')[0] : null;
  
      const [result] = await db.query(
        'UPDATE faculty_details SET faculty_name = ?, dob = ?, age = ?, department = ?, punch_id = ? WHERE code = ?',
        [faculty_name, formattedDob, age, department, punch_id, code]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async delete(code) {
    try {
      const [result] = await db.query(
        'DELETE FROM faculty_details WHERE code = ?',
        [code]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findByCode(code) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM faculty_details WHERE code = ?',
        [code]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default Faculty;