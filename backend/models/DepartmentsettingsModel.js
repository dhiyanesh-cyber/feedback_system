// models/Department.js
import pool from '../config/database.js';

class Department {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM department_table');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async create(departmentCode, departmentName) {
    try {
      const [result] = await pool.query(
        'INSERT INTO department_table (department_code, department_name) VALUES (?, ?)',
        [departmentCode, departmentName]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(oldCode, newCode, departmentName) {
    try {
      const [result] = await db.query(
        'UPDATE department_table SET department_code = ?, department_name = ? WHERE department_code = ?',
        [newCode, departmentName, oldCode]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async delete(departmentCode) {
    try {
      const [result] = await pool.query(
        'DELETE FROM department_table WHERE department_code = ?',
        [departmentCode]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findByCode(departmentCode) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM department_table WHERE department_code = ?',
        [departmentCode]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default Department;