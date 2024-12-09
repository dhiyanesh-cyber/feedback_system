import { getAllSubjects as _getAllSubjects, getSubjectNameService } from "../services/subjectService.js";

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