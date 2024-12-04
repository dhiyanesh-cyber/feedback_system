import { Router } from "express";
import { validateAdmin } from "../controllers/adminAuthController.js";

const router = Router();

// Route for validating admin login
router.post("/validate", validateAdmin);

export default router;
