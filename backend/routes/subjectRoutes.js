import { Router } from "express";
import { getSubjectNameController } from "../controllers/subjectController.js";

const router = Router();

router.get("/:sub_code", getSubjectNameController)

export default router;