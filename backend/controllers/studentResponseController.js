import { getStudentResponseByIdService, insertStudentResponseService } from "../services/studentResponseService.js";


export const insertStudentResponseController = async (req, res) => {
    try {
      const { student_register_number, question_id, response, form_id } = req.body;
      if (!student_register_number || !question_id || !response || !form_id) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const newResponse = await insertStudentResponseService(student_register_number, question_id, response, form_id);
      res.status(201).json({ message: "Stidemt response inserted successfully", StudentResponse: newResponse });
    } catch (error) {
      console.error("Error creating form:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  export const getStudentResponseByIdController = async (req, res) => {
    try {
      const { student_id, form_id } = req.params;
      if (!student_id || !form_id) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
  
      const studentResponse = await getStudentResponseByIdService(student_id, form_id);
      console.log(studentResponse);
      
      res.status(200).json({status : studentResponse});

    } catch (error) {
      console.error("Error fetching student response:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };