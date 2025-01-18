import crypto from 'crypto';
import transporter from '../utils/emailTransporter.js';
import { saveOtp, verifyOtp } from '../models/otpModel.js';
import AdminEmailModel from '../models/adminEmailModel.js';

export const sendOtp = async (email) => {
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP

  // Save OTP to the database55
  await saveOtp(email, otp);
  
  // Send OTP via email
  const mailOptions = {
    from: 'ssmietfeedback@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

export const checkValidEmail = async(email) => {
  const adminDetails = await AdminEmailModel.findByEmail(email);

  if (!adminDetails) {
    return null;
  }

  return adminDetails;
}

export const checkOtp = async (email, otp) => {
  return verifyOtp(email, otp);
};
