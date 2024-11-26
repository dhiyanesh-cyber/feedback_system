import { Router } from "express";
import { validateStudent } from '../controllers/studentAuthController.js';
const router = Router();

// Route for validating student details
router.post("/validate", validateStudent);

export default router;
