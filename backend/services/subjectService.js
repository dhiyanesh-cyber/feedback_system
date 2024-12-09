import SubjectModel from "../models/subjectModel.js"

export const getSubjectNameService = async (sub_code) => {
    try {
        const subjectName = SubjectModel.getSubjectName(sub_code);
        return subjectName;
    } catch (error) {
        console.error("Error fetching subject name ", error)
    }
}

export const getAllSubjects = async () => {
    try {
        const subjects_id = SubjectModel.getAllSubjects();
        return subjects_id;
    } catch (error) {
        console.error("Error fetching subject ids ", error)
    }
}