import { Router } from "express";
import { getForms } from "../controllers/studentFormController.js";
const router = Router();

// Route for validating student details
router.get("/:department_name/:year/:class", getForms);

export default router;
