import db from "../config/database.js";

class StudentForm {

    static async getForm(student_id) {
        try {
            const [result] = await db.execute(
                "SELECT * FROM student_forms WHERE student_forms_student_id = ?",
                [student_id]
            );

            return result;
        } catch (error) {
            console.error("Error getting form:", error);
            throw error;
        }
    }


    static async setForm(student_id, form_id) {
        try {
            console.log("In model => Student ID: " + student_id + " Form ID: " + form_id);

            const [result] = await db.execute(
                "INSERT INTO student_forms (student_forms_student_id, form_id) VALUES (?, ?)",
                [student_id, form_id]
            );

            return result;
        } catch (error) {
            console.error("Error setting form:", error);
            throw error;

        }
    }
}


export default StudentForm;