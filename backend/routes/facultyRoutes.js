import { Router } from "express";
import { getFaculty } from "../controllers/facultyController.js";
const router = Router();


router.get("/:faculty_id", getFaculty);

export default router;