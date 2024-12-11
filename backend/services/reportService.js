import StudentFormFetch from "../models/studentFormFetchModel.js";
import StudentResponse from "../models/studentResponseModel.js";

export const generateReport = async (faculty_id) => {
    const forms = await StudentFormFetch.findFormsByFaculty(faculty_id);

    // Resolve responses for each form using Promise.all
    const form_responses = await Promise.all(
        forms.map(async (form) => {
            const responses = await StudentResponse.getStudentResponseByFormId(form.form_id);
            const studentCount = await StudentResponse.getStudentCount(form.form_id);

            const totalResponse = responses.reduce(
                (accumulator, response) => accumulator + response.response,
                0 // Initial value for the accumulator
            );

            const averageResponse = studentCount > 0 ? totalResponse / studentCount : 0;

            return { ...form, average_response: averageResponse };
        })
    );

    // Calculate total performance
    let total_performance = form_responses.reduce(
        (accumulator, form_response) => accumulator + form_response.average_response,
        0 // Initial value for the accumulator
    );

    total_performance = total_performance / form_responses.length;

    return {
        subject_performance: form_responses,
        total_performance,
    };
};
