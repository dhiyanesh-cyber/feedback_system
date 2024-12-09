import { Router } from "express";
import { getAllSubjects, getSubjectNameController } from "../controllers/subjectController.js";

const router = Router();

router.get("/subject-codes", getAllSubjects);

router.get("/:sub_code", getSubjectNameController);

export default router;