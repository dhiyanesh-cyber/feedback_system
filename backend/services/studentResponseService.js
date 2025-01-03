import StudentResponse from "../models/studentResponseModel.js";



export const insertStudentResponseService = async (student_register_number, question_id, response, form_id) => {
    try {      
      const responseData = await StudentResponse.insertStudentResponse(student_register_number, question_id, response, form_id);
      return responseData;
    } catch (error) {
      console.error("Error inserting student response:", error);
      throw error;
    }
};


export const getStudentResponseByIdService = async (student_id, form_id) => {
  try {
    const studentResponse = await StudentResponse.getStudentResponseById(student_id, form_id);
    if (studentResponse.length > 0) {
      return "filled";
    } 

    return "not-filled"
    
  } catch (error) {
    console.error("Error fetching student response:", error);
    throw error;
  }
};
