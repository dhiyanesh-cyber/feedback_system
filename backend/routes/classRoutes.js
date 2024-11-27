import { Router } from "express";
import getClasses from "../controllers/classController.js";

const router = Router();

router.get("/:code/:year", getClasses)

export default router;