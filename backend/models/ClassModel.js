import  db  from '../config/database.js';

class Class {
  static async getClassDetails(code, year) {
    const [classes] = await db.execute(
      'SELECT * FROM class_details WHERE department_code = ? and year = ?',
      [code, year]
    );
    return classes;
  }

  static async getClassDetailsByDepartment(code) {
    const [classes] = await db.execute(
      'SELECT * FROM class_details WHERE department_code = ?',
      [code]
    );
    return classes;
  }

}

export default Class;