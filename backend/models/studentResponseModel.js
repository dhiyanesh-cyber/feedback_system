import db from "../config/database.js"

class StudentResponse {
    static async insertStudentResponse(student_register_number, question_id, response, form_id) {
        try {
            const [result] = await db.execute(
                "INSERT INTO student_response (student_register_number, question_id, response, form_id) VALUES (?, ?, ?, ?)",
                [student_register_number, question_id, response, form_id]
            );

            return {
                student_response_id: result.insertId,
                student_register_number,
                question_id, 
                response, 
                form_id
            };
        } catch (error) {
            console.error("Error inserting student response :", error);
            throw error;
        }
    }

    static async getStudentResponseById(student_id, form_id){
        try {
            const [studentResponse] = await db.execute(
                "SELECT * FROM student_response WHERE student_register_number = ? AND form_id = ?",
                [student_id, form_id]
              );

              return studentResponse;
        } catch (error) {
            console.error("Error getting student response :", error);
            throw error;
        }
    }



}


export default StudentResponse;