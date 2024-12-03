import StudentFormFetch from "../models/studentFormFetchModel.js";

// Fetch forms by department code, year, and class
export const getFormsByCode = async (department_code, year, class_name) => {
  try {
    const forms = await StudentFormFetch.findFormsByCode(department_code, year, class_name);
    return forms;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
};

// Create a new form in the database
export const createFormInDB = async (department_code, year, class_name, subject_id, staff_id) => {
  try {
    const newForm = await StudentFormFetch.insertForm(department_code, year, class_name, subject_id, staff_id);
    return newForm;
  } catch (error) {
    console.error("Error inserting form:", error);
    throw error;
  }
};