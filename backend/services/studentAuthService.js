import StudentModel from "../models/studentAuthModel.js";

export const validateStudent = async (registerNumber, dob) => {
  const student = await StudentModel.findByRegisterNumberAndDoB(registerNumber, dob);

  if (!student) {
    throw new Error("Invalid Register Number or Date of Birth");
  }

  return student;
};
