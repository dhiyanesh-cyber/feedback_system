import { Router } from "express";
import { getAllDepartments, getDepartmentByCode } from "../controllers/departmentController.js";

const router = Router();

router.get("/", getAllDepartments);

router.get("/:code", getDepartmentByCode);

export default router;

