import { generateReport } from "../services/reportService.js";

const getReport = async(req, res) => {
    const {faculty_id} = req.params;
    try {
        const report = await generateReport(faculty_id);
        res.status(200).json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "internal server error"});
    }
}

export default getReport;