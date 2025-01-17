import { Router } from "express";
import { getAllFaculty, getFaculty } from "../controllers/facultyController.js";
import {
    getAllFaculties,
    createFaculty,
    updateFaculty,
    deleteFaculty
  } from '../controllers/facultyController.js';
const router = Router();

router.get("/ids", getAllFaculty);

router.get("/:faculty_id", getFaculty);


router.get('/', getAllFaculties);
router.post('/', createFaculty);
router.put('/:code', updateFaculty);
router.delete('/:code', deleteFaculty);

export default router;