import StudentModel from "../models/studentAuthModel.js";
import StudentFormFetch from "../models/studentFormFetchModel.js";
import StudentForm from "../models/StudentFormsModel.js"

const createStudentForm = async (student_id, form_id) => {
    try {
        console.log("In service => Student ID: " + student_id + " Form ID: " + form_id);

        const newForm = await StudentForm.setForm(student_id, form_id);
        return newForm;
    } catch (error) {
        console.error('Error inserting form:', error)
        throw error
    }
}

const getForm = async (student_id) => {
    try {
        const forms = await StudentForm.getForm(student_id); // This will return the student id and form id
        const formsData = await Promise.all(

            forms.map(form => StudentFormFetch.getFormById(form.form_id))

        );
        return formsData;
    } catch (error) {
        console.error('Error fetching form:', error)
        throw error
    }
}


const getStudentService = async (department_code, year, class_no) => {
    try {
        const students = await StudentModel.getStudents(department_code, year, class_no);
        return students;
    } catch (error) {
        console.error('Error fetching students:', error)
        throw error
    }
}

export { getForm, createStudentForm, getStudentService };