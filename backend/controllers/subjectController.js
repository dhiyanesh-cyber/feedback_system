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
        const oldSubCode = req.params.sub_code; // The existing subject code
        const subjectData = req.body; // New data with updated code & name

        const result = await SubjectModel.update(oldSubCode, subjectData);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Subject updated successfully" });
        } else {
            res.status(404).json({ message: "Subject not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
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