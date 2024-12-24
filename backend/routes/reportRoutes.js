import { Router } from "express";
import getReport, { getDepartmentReport } from "../controllers/reportController.js";

const router = Router();

router.get("/:faculty_id", getReport)

router.get("/department/:department_id", getDepartmentReport);

export default router;