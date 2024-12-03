import { Router } from "express";
import { getStudentResponseByIdController, insertStudentResponseController } from "../controllers/studentResponseController.js";


const router = Router()

router.post("/", insertStudentResponseController);
router.get("/:student_id/:form_id",getStudentResponseByIdController)

export default router;