import Student from '../models/Student.js';
import csv from 'csv-parser';
import fs from 'fs/promises';
import path from 'path';
import { getStudentService } from '../services/studentFormsService.js';

// Utility function to parse CSV
const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                // Transform and validate data
                const transformedData = {
                    student_id: data.student_id ? Number(data.student_id) : null,
                    student_name: data.student_name?.trim() || null,
                    student_department: data.student_department?.trim() || null,
                    student_dob: data.student_dob ? new Date(data.student_dob).toISOString().split('T')[0] : null,
                    student_year: data.student_year ? Number(data.student_year) : null,
                    class: data.class ? Number(data.class) : null
                };
                results.push(transformedData);
            })
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

// Get all students
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.getAll();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching students',
            error: error.message
        });
    }
};

// Get 
export const getStudentController = async (req, res) => {
    try {
        console.log(req.params);

        const { year, department, class: class_no } = req.params;

        if (!year || !department || !class_no) {
            return res.status(400).json({
                message: 'Year and department are required'
            });
        }

        const students = await getStudentService(department, year, class_no);
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching students',
            error: error.message
        });
    }
}

// Create a single student
export const createStudent = async (req, res) => {
    try {
        const {
            student_id,
            student_name
        } = req.body;

        // Validate required fields
        if (!student_id || !student_name) {
            return res.status(400).json({
                message: 'Student ID and name are required'
            });
        }

        // Check if student ID already exists
        const existingStudent = await Student.findByStudentId(student_id);
        if (existingStudent) {
            return res.status(400).json({
                message: 'Student ID already exists'
            });
        }

        await Student.create(req.body);
        res.status(201).json({
            message: 'Student created successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating student',
            error: error.message
        });
    }
};

// Bulk upload students from CSV
export const bulkUploadStudents = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        // Parse CSV
        const students = await parseCSV(req.file.path);

        // Validate students
        const validationResults = students.map(student => {
            const errors = [];

            if (!student.student_id) errors.push('Student ID is required');
            if (!student.student_name) errors.push('Student name is required');

            return {
                student,
                isValid: errors.length === 0,
                errors
            };
        });

        // Separate valid and invalid students
        const validStudents = validationResults.filter(result => result.isValid).map(result => result.student);
        const invalidStudents = validationResults.filter(result => !result.isValid);

        // Perform bulk insert
        const bulkInsertResult = await Student.bulkCreate(validStudents);

        // Remove the uploaded file
        await fs.unlink(req.file.path);

        res.json({
            message: 'Bulk student upload processed',
            totalStudents: students.length,
            validStudents: validStudents.length,
            successfulInserts: bulkInsertResult.successfulInserts.length,
            failedInserts: bulkInsertResult.failedInserts.length,
            invalidStudents,
            failedInserts: bulkInsertResult.failedInserts
        });
    } catch (error) {
        // Remove the uploaded file in case of error
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => { });
        }

        res.status(500).json({
            message: 'Error processing CSV file',
            error: error.message
        });
    }
};

// Update a student
export const updateStudent = async (req, res) => {
    try {
        const { student_id } = req.params;
        const studentData = req.body;

        const existingStudent = await Student.findByStudentId(student_id);
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await Student.update(student_id, studentData);
        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating student',
            error: error.message
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { student_id } = req.params;

        const existingStudent = await Student.findByStudentId(student_id);
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await Student.delete(student_id);
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting student',
            error: error.message
        });
    }
};

// Bulk delete students
export const bulkDeleteStudents = async (req, res) => {
    try {
        const { year, department } = req.body;

        // Validate input
        if (!year || !department) {
            return res.status(400).json({
                message: 'Year and department are required for bulk deletion'
            });
        }

        const result = await Student.bulkDelete(year, department);

        res.json({
            message: `${result.affectedRows} students deleted successfully`,
            deletedCount: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error performing bulk deletion',
            error: error.message
        });
    }
};