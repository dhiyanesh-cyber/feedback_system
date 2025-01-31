import StudentFormFetch from '../models/studentFormFetchModel.js'
import StudentForm from '../models/StudentFormsModel.js'
import StudentResponse from '../models/studentResponseModel.js'

// Fetch forms by department code, year, and class
export const getFormsByCode = async (department_code, year, class_name) => {
  try {
    const forms = await StudentFormFetch.findFormsByCode(
      department_code,
      year,
      class_name
    )
    return forms
  } catch (error) {
    console.error('Error fetching forms:', error)
    throw error
  }
}

// Create a new form in the database
export const createFormInDB = async (
  department_code,
  year,
  class_name,
  subject_id,
  staff_id,
  student_count
) => {
  try {
    const newForm = await StudentFormFetch.insertForm(
      department_code,
      year,
      class_name,
      subject_id,
      staff_id,
      student_count
    )
    return newForm
  } catch (error) {
    console.error('Error inserting form:', error)
    throw error
  }
}

export const deleteFormById = async form_id => {
  try {
    const deleteStudentResponse = await StudentResponse.deleteStudentResponseByFormId(form_id)
    await StudentForm.deleteFormByFormId(form_id);
    const deleteResponse = await StudentFormFetch.deleteForm(form_id)
    return deleteResponse
  } catch (error) {
    console.error('Error deleting form : ', error)
    throw error
  }
}

export const getFormDetailsById = async form_id => {
  try {
    const form = await StudentFormFetch.getFormById(form_id)
    return form
  } catch (error) {
    console.error('Error fetching forms : ', error)
    throw error
  }
}

export const toggleFormStatusService = async (department_code, year, status_code) => {
  try {
    const form = await StudentFormFetch.toggleFormLiveStatus(department_code, year, status_code)
    return form
  } catch (error) {
    console.error('Error toggling forms live status : ', error)
    throw error
  }
}

