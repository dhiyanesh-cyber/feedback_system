import { Router } from "express";
import { getClasses, setLiveStatusController } from "../controllers/classController.js";

const router = Router();

router.get("/:code/:year", getClasses)
router.put("/:code/:year/:status_code", setLiveStatusController)

export default router;