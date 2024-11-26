import { validateStudent as _validateStudent } from "../services/studentAuthService.js";

export const validateStudent = async (req, res) => {
  try {
    console.log(req.body);
    const { registerNumber, dob } = req.body;
    
    

    if (!registerNumber || !dob) {
      return res.status(400).json({ message: "Register Number and Date of Birth are required" });
    }

    const student = await _validateStudent(registerNumber, dob);
    return res.status(200).json({ message: "Student found", student });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
