import SubjectModel from "../models/subjectModel.js"

export const getSubjectNameService = async (sub_code) => {
    try {
        const subjectName = SubjectModel.getSubjectName(sub_code);
        return subjectName;
    } catch (error) {
        console.error("Error fetching subject name ", error)
    }
}