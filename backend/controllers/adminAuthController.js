import { validateAdmin as _validateAdmin } from "../services/adminAuthService.js";

export const validateAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and Password are required",
      });
    }

    const admin = await _validateAdmin(username, password);

    return res.status(200).json({
      message: "Login successful",
      admin,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
