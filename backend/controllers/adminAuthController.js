import { validateAdmin as _validateAdmin } from "../services/adminAuthService.js";
import { sendOtp, checkOtp, checkValidEmail } from '../services/otpService.js';

export const sendOtpHandler = async (req, res) => {
  const { email } = req.body;

  try {
    const adminDetails = await checkValidEmail(email);

    if (!adminDetails) {
      return res.status(401).json({ error: "Unauthorized: Email not found or not authorized." });
    }


    await sendOtp(email);
    res.status(200).json({ message: 'OTP sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtpHandler = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const isValid = await checkOtp(email, otp);

    if (isValid) {
      const adminDetails = await checkValidEmail(email);

      res.status(200).json({
        message: 'OTP verified successfully!',
        admin: {
          role: adminDetails.role,
          deptName: adminDetails.deptName,
          email: adminDetails.email,
        },
      });

    } else {
      res.status(400).json({ error: 'Invalid or expired OTP' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};


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
