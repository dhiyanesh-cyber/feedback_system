import { Router } from "express";
import { validateStudent } from '../controllers/studentAuthController.js';
import multer from 'multer';
import path from 'path';
import {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    bulkDeleteStudents,
    bulkUploadStudents
} from '../controllers/studentController.js';



const router = Router();


// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `students-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.csv') {
            return cb(new Error('Only CSV files are allowed'));
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

// Route for validating student details
router.post("/validate", validateStudent);


router.get('/', getAllStudents);
router.post('/', createStudent);
router.put('/:student_id', updateStudent);
router.delete('/:student_id', deleteStudent);

// Bulk Operations Routes
router.post('/bulk-delete', bulkDeleteStudents);
router.post('/bulk-upload', upload.single('file'), bulkUploadStudents);

export default router;
