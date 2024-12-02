import Question from "../models/questionModel.js";

export const getAllQuestions = async () => {
    return await Question.findAll();
}

