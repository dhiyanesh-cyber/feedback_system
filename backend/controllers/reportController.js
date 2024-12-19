import { generateDepartmentReport, generateReport } from "../services/reportService.js";

const getReport = async (req, res) => {
    const { faculty_id } = req.params;
    try {
        const report = await generateReport(faculty_id);
        res.status(200).json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });
    }
}

const getDepartmentReport = async (req, res) => {
    const { department_id } = req.params;
    try {
        const report = await generateDepartmentReport(department_id);
        const pdfBuffer = report.output("arraybuffer");

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=class_report.pdf');
        res.send(Buffer.from(pdfBuffer));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

export default getReport;
export { getDepartmentReport };