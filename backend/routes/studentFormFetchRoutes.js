import { Router } from "express";
import { getForms, createForm, deleteFormController, getFormController } from "../controllers/studentFormController.js";
const router = Router();

// Route for validating student details
router.get("/:department_name/:year/:class", getForms);
router.post("/", createForm);
router.get("/:form_id", getFormController)
router.delete("/:form_id", deleteFormController)
export default router;