import { Router } from "express";
import { getAllFaculty, getFaculty } from "../controllers/facultyController.js";
const router = Router();

router.get("/ids", getAllFaculty);

router.get("/:faculty_id", getFaculty);

export default router;