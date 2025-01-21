import { getAllDepartments as getAllDepartmentsServicer, getDepartmentByCode as getDepartmentByCodeServicer } from "../services/departmentServices.js"
import Department from '../models/DepartmentsettingsModel.js';

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

export const getAllDepartmentsforsettings = async (req, res) => {
  try {
    const departments = await Department.getAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { code, name } = req.body;
    
    if (!code || !name) {
      return res.status(400).json({ message: 'Department code and name are required' });
    }

    const existing = await Department.findByCode(code);
    if (existing) {
      return res.status(400).json({ message: 'Department code already exists' });
    }

    await Department.create(code, name);
    res.status(201).json({ message: 'Department created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error: error.message });
  }
};

// controllers/departmentController.js
export const updateDepartment = async (req, res) => {
  try {
    const { code } = req.params; // Original code
    const { newCode, name } = req.body; // New code and name

    if (!newCode || !name) {
      return res.status(400).json({ message: 'Department code and name are required' });
    }

    const existing = await Department.findByCode(code);
    if (!existing) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // If code is being changed, check if new code already exists
    if (code !== newCode) {
      const codeExists = await Department.findByCode(newCode);
      if (codeExists) {
        return res.status(400).json({ message: 'New department code already exists' });
      }
    }

    await Department.update(code, newCode, name);
    res.json({ message: 'Department updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating department', error: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { code } = req.params;

    const existing = await Department.findByCode(code);
    if (!existing) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await Department.delete(code);
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department', error: error.message });
  }
};