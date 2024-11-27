import { getFormsByCode } from "../services/studentFormFetchService.js"

export const getForms = async (req, res) => {
  try {
    const { department_name, year, class: class_name } = req.params; // Extract parameters
    if (!department_name || !year || !class_name) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const forms = await getFormsByCode(department_name, year, class_name);
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};