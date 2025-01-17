import pool from '../config/database.js';

export const saveOtp = async (email, otp) => {
  const query = `INSERT INTO otp_verification (email, otp, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))`;
  await pool.query(query, [email, otp]);
};

export const verifyOtp = async (email, otp) => {
  const query = `SELECT * FROM otp_verification WHERE email = ? AND otp = ? AND expires_at > NOW()`;
  const [rows] = await pool.query(query, [email, otp]);
  return rows.length > 0;
};
