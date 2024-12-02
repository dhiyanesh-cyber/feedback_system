import { getAllQuestions as _getAllQuestions } from "../services/questionServices.js";
export const getAllQuestions = async (req, res) => {
    try {
        const questions = await _getAllQuestions();
        
        res.status(200).json(questions);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}

