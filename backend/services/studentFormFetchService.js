import StudentFormFetch from "../models/studentFormFetchModel.js";


export const getFormsByCode = async (department_code, year, class_name) => {
    return await StudentFormFetch.findFormsByCode(department_code, year, class_name);
}