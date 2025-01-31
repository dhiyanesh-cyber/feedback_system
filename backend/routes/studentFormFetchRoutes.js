import { Router } from "express";
import { getForms, createForm, deleteFormController, getFormController, getFormsByStudentId, toggleFormController } from "../controllers/studentFormController.js";
const router = Router();

// Route for validating student details
router.get("/:department_name/:year/:class", getForms); // Can be used in admin side (Because admin can view all the forms)
router.get("/student/:student_id", getFormsByStudentId) // Can be used in Student side (Because they should only see forms related to them)
router.post("/", createForm);
router.put("/:department_code/:year/:status_code", toggleFormController);
router.get("/:form_id", getFormController)
router.delete("/:form_id", deleteFormController)
export default router;