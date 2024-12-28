import db from '../config/database.js'

class StudentResponse {
  static async insertStudentResponse (
    student_register_number,
    question_id,
    response,
    form_id
  ) {
    try {
      const [result] = await db.execute(
        'INSERT INTO student_response (student_register_number, question_id, response, form_id) VALUES (?, ?, ?, ?)',
        [student_register_number, question_id, response, form_id]
      )

      return {
        student_response_id: result.insertId,
        student_register_number,
        question_id,
        response,
        form_id
      }
    } catch (error) {
      console.error('Error inserting student response :', error)
      throw error
    }
  }

  static async getStudentResponseById (student_id, form_id) {
    try {
      const [studentResponse] = await db.execute(
        'SELECT * FROM student_response WHERE student_register_number = ? AND form_id = ?',
        [student_id, form_id]
      )

      return studentResponse
    } catch (error) {
      console.error('Error getting student response :', error)
      throw error
    }
  }

  static async getStudentResponseByClassAndYear (year, class_no) {
    try {
      const [studentResponse] = await db.execute(
        'SELECT * FROM student_response WHERE student_register_number = ? AND form_id = ?',
        [student_id, form_id]
      )

      return studentResponse
    } catch (error) {
      console.error('Error getting student response :', error)
      throw error
    }
  }

  static async getStudentResponseByFormId (form_id) {
    try {
      const [studentResponse] = await db.execute(
        'SELECT * FROM student_response WHERE form_id = ?',
        [form_id]
      )

      return studentResponse
    } catch (error) {
      console.error('Error getting student response :', error)
      throw error
    }
  }

  static async deleteStudentResponseByFormId (form_id) {
    try {
      const [studentResponse] = await db.execute(
        'DELETE FROM student_response WHERE (form_id = ?);',
        [form_id]
      )

      return studentResponse
    } catch (error) {
      console.error('Error deleting student response :', error)
      throw error
    }
  }

  static async getStudentCount (form_id) {
    try {
      const [student_count] = await db.execute(
        'SELECT COUNT(DISTINCT student_register_number) AS total_students FROM student_response WHERE form_id = ?',
        [form_id]
      )

      return student_count[0].total_students
    } catch (error) {
      console.error('Error counting studets')
      throw error
    }
  }
}

export default StudentResponse
