import  db  from '../config/database.js';

class Department {
  static async findbyCode(code) {
    const [departments] = await db.execute(
      'SELECT * FROM department_table WHERE department_code = ?',
      [code]
    );
    return departments[0];
  }

  static async findAll() {
    const [departments] = await db.execute(
        'SELECT * FROM department_table'
      );
      return departments;
  }
}

export default Department;