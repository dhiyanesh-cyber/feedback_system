import { getFormsByCode, createFormInDB, deleteFormById, getFormDetailsById } from "../services/studentFormFetchService.js";

export const getForms = async (req, res) => {
  try {
    const { department_name, year, class: class_name } = req.params;
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

export const createForm = async (req, res) => {
  try {
    const { department_code, year, class_name, subject_id, staff_id } = req.body;
    if (!department_code || !year || !class_name || !subject_id || !staff_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Call the service to insert the new form
    const newForm = await createFormInDB(department_code, year, class_name, subject_id, staff_id);
    res.status(201).json({ message: "Form created successfully", form: newForm });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteFormController = async (req, res) => {
  try {
    const { form_id } = req.params;
    if (!form_id) {
      return res.status(400).json({ message: "All attributes required" })
    }

    const deleteRes = await deleteFormById(form_id);
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form : ", error)
    res.status(500).json({ message: "Internal server error" })
  }
}


export const getFormController = async (req, res) => {
  try {
    const { form_id } = req.params;
    console.log("Vandhuruchu");

    if (!form_id) {
      return res.status(400).json({ message: "All attributes required" })
    }

    const getFormRes = await getFormDetailsById(form_id);
    res.status(200).json(getFormRes);
  } catch (error) {
    console.error("Error deleting form : ", error)
    res.status(500).json({ message: "Internal server error" })
  }
}