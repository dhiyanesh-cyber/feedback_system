import { Router } from "express";
import {
    getAllSubjects, getSubjectNameController, createSubject,

    updateSubject,

    deleteSubject
} from "../controllers/subjectController.js";

const router = Router();

router.get("/subject-codes", getAllSubjects);

router.get("/:sub_code", getSubjectNameController);



router.get('/', getAllSubjects);

router.post('/', createSubject);

router.put('/:sub_code', updateSubject);

router.delete('/:sub_code', deleteSubject);

export default router;