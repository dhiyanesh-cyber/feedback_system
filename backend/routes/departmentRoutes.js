import { Router } from "express";
import { getAllDepartments, getAllDepartmentsforsettings, getDepartmentByCode } from "../controllers/departmentController.js";
import { 
    createDepartment, 
    updateDepartment, 
    deleteDepartment 
  } from '../controllers/departmentController.js';
  
const router = Router();

router.get("/", getAllDepartments);
router.get("/:code", getDepartmentByCode);

router.get('/', getAllDepartmentsforsettings);
router.post('/', createDepartment);
router.put('/:code', updateDepartment);
router.delete('/:code', deleteDepartment);

export default router;