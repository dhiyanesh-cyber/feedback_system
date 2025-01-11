import { Router } from "express";
import { validateAdmin, sendOtpHandler, verifyOtpHandler } from "../controllers/adminAuthController.js";
const router = Router();

// Route for validating admin login
router.post("/validate", validateAdmin);

router.post('/send-otp', sendOtpHandler);
router.post('/verify-otp', verifyOtpHandler);

export default router;
