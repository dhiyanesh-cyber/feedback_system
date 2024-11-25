import { getAllDepartments as getAllDepartmentsServicer, getDepartmentByCode as getDepartmentByCodeServicer } from "../services/departmentServices.js"

export const getAllDepartments = async (req, res) => {
    try {
        const departments = await getAllDepartmentsServicer();
        
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getDepartmentByCode = async (req, res) => {
    try {
        const department = await getDepartmentByCodeServicer(req.params.code);
        
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}