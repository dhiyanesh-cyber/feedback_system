import { Router } from "express";
import { validateStudent } from '../controllers/studentAuthController.js';
import { getStudentController } from "../controllers/studentController.js";
const router = Router();

// Route for validating student details
router.post("/validate", validateStudent);
//get students by department name, year, class
router.get('/:department/:year/:class', getStudentController);

export default router;
