import crypto from 'crypto';
import transporter from '../utils/emailTransporter.js';
import { saveOtp, verifyOtp } from '../models/otpModel.js';

export const sendOtp = async (email) => {
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP

  // Save OTP to the database55
  await saveOtp(email, otp);

  // Send OTP via email
  const mailOptions = {
    from: 'ssmiet@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

export const checkOtp = async (email, otp) => {
  return verifyOtp(email, otp);
};
