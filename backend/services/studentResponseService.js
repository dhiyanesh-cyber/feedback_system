import StudentResponse from "../models/studentResponseModel.js";

const values = [
  0,
  0.25,
  0.5,
  0.75,
  1
] 

export const insertStudentResponseService = async (student_register_number, question_id, response, form_id) => {
    try {
      response = values[response-1];
      const responseData = await StudentResponse.insertStudentResponse(student_register_number, question_id, response, form_id);
      return responseData;
    } catch (error) {
      console.error("Error inserting student response:", error);
      throw error;
    }
  };