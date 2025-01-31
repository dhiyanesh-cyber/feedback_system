import { getAllSubjects as _getAllSubjects, getSubjectNameService } from "../services/subjectService.js";
import SubjectModel from "../models/subjectModel.js";

export const getSubjectNameController = async (req, res) => {
    try {
        const { sub_code } = req.params;

        if (!sub_code) {
            return res.status(400).json({ message: "All parameters must be provided !" });
        }

        const data = await getSubjectNameService(sub_code);
        res.status(200).json(data);


    } catch (error) {
        console.error("Error fetching student name:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllSubjects = async (req, res) => {
    try {

        const data = await _getAllSubjects();
        res.status(200).json(data);


    } catch (error) {
        console.error("Error fetching subject ids:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// ____________________________________________________________for settings page

// Get all subjects

// export const getAllSubjects = async (req, res) => {

//     try {

//         const subjects = await subjects.getAll();

//         res.json(subjects);

//     } catch (error) {

//         res.status(500).json({

//             message: 'Error fetching subjects',

//             error: error.message

//         });

//     }

// };


// Create a new subject

export const createSubject = async (req, res) => {

    try {

        const { sub_code, sub_name } = req.body;


        // Validate required fields

        if (!sub_code || !sub_name) {

            return res.status(400).json({

                message: 'Subject code and name are required'

            });

        }


        // Check if subject code already exists

        const existingSubject = await SubjectModel.findByCode(sub_code);

        if (existingSubject) {

            return res.status(400).json({

                message: 'Subject code already exists'

            });

        }


        await SubjectModel.create({ sub_code, sub_name });

        res.status(201).json({

            message: 'Subject created successfully'

        });

    } catch (error) {

        res.status(500).json({

            message: 'Error creating subject',

            error: error.message

        });

    }

};


// Update a subject

export const updateSubject = async (req, res) => {

    try {

        const { sub_code } = req.params;

        const { sub_name } = req.body;


        // Validate required field

        if (!sub_name) {

            return res.status(400).json({

                message: 'Subject name is required'

            });

        }


        // Check if subject exists

        const existingSubject = await SubjectModel.findByCode(sub_code);

        if (!existingSubject) {

            return res.status(404).json({

                message: 'Subject not found'

            });

        }


        await SubjectModel.update(sub_code, { sub_name });

        res.json({

            message: 'Subject updated successfully'

        });

    } catch (error) {

        res.status(500).json({

            message: 'Error updating subject',

            error: error.message

        });

    }

};


// Delete a subject

export const deleteSubject = async (req, res) => {

    try {

        const { sub_code } = req.params;


        // Check if subject exists

        const existingSubject = await SubjectModel.findByCode(sub_code);

        if (!existingSubject) {

            return res.status(404).json({

                message: 'Subject not found'

            });

        }


        await SubjectModel.delete(sub_code);

        res.json({

            message: 'Subject deleted successfully'

        });

    } catch (error) {

        res.status(500).json({

            message: 'Error deleting subject',

            error: error.message

        });

    }

};