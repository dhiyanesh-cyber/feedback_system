import Department from "../models/departmentModel.js";

export const getAllDepartments = async () => {
    return await Department.findAll();
}

export const getDepartmentByCode = async (code) => {
    return await Department.findbyCode(code);
}