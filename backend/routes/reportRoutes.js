import { Router } from "express";
import getReport from "../controllers/reportController.js";

const router = Router();

router.get("/:faculty_id", getReport)

export default router;