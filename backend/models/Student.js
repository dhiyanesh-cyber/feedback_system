import db from '../config/database.js';

class Student {
    // Get all students
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM student_details');
            return rows;
        } catch (error) {
            console.error('Get All Students Error:', error);
            throw error;
        }
    }

    // Create a single student
    static async create(studentData) {
        const {
            student_id,
            student_name,
            student_department,
            student_dob,
            student_year,
            class: studentClass
        } = studentData;

        try {
            const [result] = await db.query(
                'INSERT INTO student_details (student_id, student_name, student_department, student_dob, student_year, class) VALUES (?, ?, ?, ?, ?, ?)',
                [student_id, student_name, student_department, student_dob, student_year, studentClass]
            );
            return result;
        } catch (error) {
            console.error('Create Student Error:', error);
            throw error;
        }
    }

    // Bulk create students
    static async bulkCreate(students) {
        const connection = await db.getConnection();

        try {
            // Start transaction
            await connection.beginTransaction();

            const successfulInserts = [];
            const failedInserts = [];

            for (const student of students) {
                try {
                    const [result] = await connection.query(
                        'INSERT INTO student_details (student_id, student_name, student_department, student_dob, student_year, class) VALUES (?, ?, ?, ?, ?, ?)',
                        [
                            student.student_id,
                            student.student_name,
                            student.student_department,
                            student.student_dob,
                            student.student_year,
                            student.class
                        ]
                    );
                    successfulInserts.push(student);
                } catch (insertError) {
                    failedInserts.push({ student, error: insertError.message });
                }
            }

            // Commit transaction
            await connection.commit();

            return {
                successfulInserts,
                failedInserts
            };
        } catch (error) {
            // Rollback transaction in case of error
            await connection.rollback();
            console.error('Bulk Create Students Error:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Update a student
    static async update(id, studentData) {
        try {
            const {
                student_id,
                student_name,
                student_department,
                student_dob,
                student_year,
                class: studentClass
            } = studentData;

            const [result] = await db.query(
                'UPDATE student_details SET student_id = ?, student_name = ?, student_department = ?, student_dob = ?, student_year = ?, class = ? WHERE id = ?',
                [student_id, student_name, student_department, student_dob, student_year, studentClass, id]
            );
            return result;
        } catch (error) {
            console.error('Update Student Error:', error);
            throw error;
        }
    }

    // Delete a student
    static async delete(id) {
        try {
            const [result] = await db.query(
                'DELETE FROM student_details WHERE id = ?',
                [id]
            );
            return result;
        } catch (error) {
            console.error('Delete Student Error:', error);
            throw error;
        }
    }

    // Bulk delete students
    static async bulkDelete(year, department) {
        try {
            const [result] = await db.query(
                'DELETE FROM student_details WHERE student_year = ? AND student_department = ?',
                [year, department]
            );
            return result;
        } catch (error) {
            console.error('Bulk Delete Students Error:', error);
            throw error;
        }
    }

    // Find student by ID
    static async findById(id) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM student_details WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Find Student by ID Error:', error);
            throw error;
        }
    }

    // Find student by student_id
    static async findByStudentId(studentId) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM student_details WHERE student_id = ?',
                [studentId]
            );
            return rows[0];
        } catch (error) {
            console.error('Find Student by Student ID Error:', error);
            throw error;
        }
    }
}

export default Student;