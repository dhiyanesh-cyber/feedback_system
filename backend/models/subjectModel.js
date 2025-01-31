import db from "../config/database.js"

class SubjectModel {
  static async getSubjectName(sub_code) {
    try {
      if (!sub_code) {
        throw new Error("All parameters must be provided");
      }

      const [subjectName] = await db.execute(
        "SELECT * FROM subject_details WHERE sub_code = ? ",
        [sub_code]
      );

      return subjectName;
    } catch (error) {
      console.error("Error fetching subjectName:", error);
      throw error;
    }
  }

  static async getAllSubjects() {
    try {
      const [subjects] = await db.execute(
        "SELECT * FROM subject_details"
      );

      return subjects;
    } catch (error) {
      console.error("Error fetching subjectName:", error);
      throw error;
    }
  }

  static async getAll() {

    try {

      const [rows] = await db.query('SELECT * FROM subject_details');

      return rows;

    } catch (error) {

      throw error;

    }

  }


  static async create(subjectData) {

    try {

      const { sub_code, sub_name } = subjectData;

      const [result] = await db.query(

        'INSERT INTO subject_details (sub_code, sub_name) VALUES (?, ?)',

        [sub_code, sub_name]

      );

      return result;

    } catch (error) {

      throw error;

    }

  }


  static async update(subCode, subjectData) {

    try {

      const { sub_name } = subjectData;

      const [result] = await db.query(

        'UPDATE subject_details SET sub_name = ? WHERE sub_code = ?',

        [sub_name, subCode]

      );

      return result;

    } catch (error) {

      throw error;

    }

  }


  static async delete(subCode) {

    try {

      const [result] = await db.query(

        'DELETE FROM subject_details WHERE sub_code = ?',

        [subCode]

      );

      return result;

    } catch (error) {

      throw error;

    }

  }


  static async findByCode(subCode) {

    try {

      const [rows] = await db.query(

        'SELECT * FROM subject_details WHERE sub_code = ?',

        [subCode]

      );

      return rows[0];

    } catch (error) {

      throw error;

    }

  }
}

// ____________________________________________________________for settings page



export default SubjectModel;