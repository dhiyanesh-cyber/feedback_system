import { Router } from "express";
import { getForms, createForm } from "../controllers/studentFormController.js";
const router = Router();

// Route for validating student details
router.get("/:department_name/:year/:class", getForms);
router.post("/", createForm);
export default router;