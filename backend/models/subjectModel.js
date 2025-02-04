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


  static async update(oldSubCode, subjectData) {
    try {
      const { sub_code: newSubCode, sub_name } = subjectData;

      // Check if the new sub_code already exists to prevent conflicts
      const [existing] = await db.query(
        'SELECT sub_code FROM subject_details WHERE sub_code = ?',
        [newSubCode]
      );

      if (existing.length > 0 && oldSubCode !== newSubCode) {
        throw new Error("The new subject code already exists.");
      }

      // Perform the update
      const [result] = await db.query(
        'UPDATE subject_details SET sub_code = ?, sub_name = ? WHERE sub_code = ?',
        [newSubCode, sub_name, oldSubCode]
      );

      return result;
    } catch (error) {
      console.error("Error updating subject:", error);
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