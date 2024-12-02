import AdminModel from "../models/adminAuthModel.js";

export const validateAdmin = async (username, password) => {
  const admin = await AdminModel.findByUsernameAndPassword(username, password);

  if (!admin) {
    throw new Error("Invalid username or password");
  }

  return admin; // Return the admin details if valid
};
