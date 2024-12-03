import { Router } from "express";
import { insertStudentResponseController } from "../controllers/studentResponseController.js";

const router = Router()

router.post("/", insertStudentResponseController);

export default router;