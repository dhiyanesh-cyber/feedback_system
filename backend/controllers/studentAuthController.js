import { validateStudent as _validateStudent } from "../services/studentAuthService.js";

export const validateStudent = async (req, res) => {
  try {
    const { registerNumber, dob } = req.body;

    if (!registerNumber || !dob) {
      return res.status(400).json({
        message: "Register Number and Date of Birth are required",
      });
    }

    // First attempt with the original format (YYYY-MM-DD)
    try {
      const student = await _validateStudent(registerNumber, dob);
      return res.status(200).json({
        message: "Login successful",
        student,
      });
    } catch (originalError) {
      // Attempt to interchange month and date (YYYY-DD-MM)
      const [year, month, day] = dob.split("-");
      const swappedDob = `${year}-${day}-${month}`;

      try {
        const student = await _validateStudent(registerNumber, swappedDob);
        return res.status(200).json({
          message: "Login successful",
          student,
        });
      } catch (swappedError) {
        // If both attempts fail, return the original error
        return res.status(401).json({
          message: originalError.message,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
