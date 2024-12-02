import { Router } from "express";
import { getAllQuestions } from "../controllers/questionController.js";

const router = Router();

router.get("/all", getAllQuestions);


export default router;

