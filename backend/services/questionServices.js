import Question from "../models/questionModel.js";

export const getAllQuestions = async () => {
    return await Question.findAll();
}

export const getQuestionnById = async (id) => {
    return await Question.findById(id);
}

