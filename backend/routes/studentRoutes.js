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
    bulkUploadStudents,
    getStudentController
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

    dest: 'uploads/',

    fileFilter: (req, file, cb) => {

        // Accept only CSV files

        if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {

            cb(null, true);

        } else {

            cb(new Error('Please upload a CSV file'));

        }

    }

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
