import { getReportDepartmentData } from "../../services/reportApi";

// Function to download the PDF
export const downloadReportPdf = async (department_code) => {
    try {
        const blob = await getReportDepartmentData(department_code); // Use the async version here
        const url = URL.createObjectURL(blob); // Create a temporary URL for the Blob
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `department_${department_code}.pdf`); // Correctly use department_code here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the link
    } catch (error) {
        console.error("Failed to download the PDF:", error);
    }
};

