import { getAllFaculty as _getAllFaculty, getFacultyById } from "../services/facultyService.js";
import Faculty from '../models/Faculty.js';

export const getFaculty = async (req, res) => {
    try {
      const { faculty_id } = req.params;
      if (!faculty_id) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
  
      const faculty = await getFacultyById(faculty_id);
      res.status(200).json(faculty);
    } catch (error) {
      console.error("Error fetching faculty details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getAllFaculty = async (req, res) => {
    try {
  
      const faculty_ids = await _getAllFaculty();
      res.status(200).json(faculty_ids);
    } catch (error) {
      console.error("Error fetching faculty id details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }; 

export const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.getAll();
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching faculties', 
      error: error.message 
    });
  }
};

const formatDate = (dateString) => {
  if (!dateString) return null;
  
  try {
    // Ensure the date is in YYYY-MM-DD format
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return null;
    }
    
    // Format to YYYY-MM-DD
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Date formatting error:', error);
    return null;
  }
};

export const createFaculty = async (req, res) => {
  try {
    const { 
      code, 
      faculty_name, 
      dob, 
      age, 
      department, 
      punch_id 
    } = req.body;

    // Validate required fields
    if (!code || !faculty_name) {
      return res.status(400).json({ 
        message: 'Faculty code and name are required' 
      });
    }

    // Format date
    const formattedDob = formatDate(dob);

    // Prepare data for insertion
    const facultyData = {
      code, 
      faculty_name, 
      dob: formattedDob, 
      age: formattedDob ? calculateAge(formattedDob) : age, 
      department, 
      punch_id
    };

    // Check if faculty code already exists
    const existingFaculty = await Faculty.findByCode(code);
    if (existingFaculty) {
      return res.status(400).json({ 
        message: 'Faculty code already exists' 
      });
    }

    await Faculty.create(facultyData);
    res.status(201).json({ 
      message: 'Faculty created successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating faculty', 
      error: error.message 
    });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const { code } = req.params;
    const { 
      faculty_name, 
      dob, 
      age, 
      department, 
      punch_id 
    } = req.body;

    // Validate required fields
    if (!faculty_name) {
      return res.status(400).json({ 
        message: 'Faculty name is required' 
      });
    }

    // Format date
    const formattedDob = formatDate(dob);

    // Prepare data for update
    const facultyData = {
      faculty_name, 
      dob: formattedDob, 
      age: formattedDob ? calculateAge(formattedDob) : age, 
      department, 
      punch_id
    };

    // Check if faculty exists
    const existingFaculty = await Faculty.findByCode(code);
    if (!existingFaculty) {
      return res.status(404).json({ 
        message: 'Faculty not found' 
      });
    }

    await Faculty.update(code, facultyData);
    res.json({ 
      message: 'Faculty updated successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating faculty', 
      error: error.message 
    });
  }
};

// Age calculation utility
function calculateAge(dob) {
  if (!dob) return null;
  
  const birthDate = new Date(dob);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (
    monthDiff < 0 || 
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  
  return age;
}

export const deleteFaculty = async (req, res) => {
  try {
    const { code } = req.params;

    // Check if faculty exists
    const existingFaculty = await Faculty.findByCode(code);
    if (!existingFaculty) {
      return res.status(404).json({ 
        message: 'Faculty not found' 
      });
    }

    await Faculty.delete(code);
    res.json({ 
      message: 'Faculty deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting faculty', 
      error: error.message 
    });
  }
};