import db from '../config/database.js';

class Class {

  // Used in Live status
  static async getClassDetails(code, year) {
    const [classes] = await db.execute(
      'SELECT * FROM class_details WHERE department_code = ? and year = ?',
      [code, year]
    );
    return classes;
  }

  static async getClassDetailsByYear( year) {
    const [classes] = await db.execute(
      'SELECT * FROM class_details WHERE year = ?',
      [ year]
    );
    return classes;
  }



  static async setLiveStatusByDeptYear(code, year, status_code) {
    const [classes] = await db.execute(
      'UPDATE class_details SET live_status = ? WHERE department_code = ? and year = ?',
      [status_code, code, year]
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