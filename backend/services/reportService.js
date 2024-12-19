import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Class from "../models/ClassModel.js";
import StudentModel from "../models/studentAuthModel.js";
import StudentFormFetch from "../models/studentFormFetchModel.js";
import StudentResponse from "../models/studentResponseModel.js";
import FacultyModel from "../models/facultyModel.js";
import SubjectModel from "../models/subjectModel.js";
import Department from "../models/departmentModel.js";



export const generateReport = async (faculty_id) => {
    const forms = await StudentFormFetch.findFormsByFaculty(faculty_id);

    // Resolve responses for each form using Promise.all
    const form_responses = await Promise.all(
        forms.map(async (form) => {
            const responses = await StudentResponse.getStudentResponseByFormId(form.form_id);
            const studentCount = await StudentResponse.getStudentCount(form.form_id);


            // const totalResponse = responses.reduce(
            //     (accumulator, response) => accumulator + response.response,
            //     0 // Initial value for the accumulator
            // );

            const responseCounts = responses.map(row => row.response);

            const count5 = responseCounts.filter(r => r === 5).length;
            const count4 = responseCounts.filter(r => r === 4).length;
            const count3 = responseCounts.filter(r => r === 3).length;
            const count2 = responseCounts.filter(r => r === 2).length;

            const totalScore = ((count5 * 1) + (count4 * 0.75) + (count3 * 0.5) + (count2 * 0.25)) / 24 * 25;
            // return totalScore.toFixed(2);

            const averageResponse = studentCount > 0 ? totalScore / studentCount : 0;

            return { ...form, average_response: averageResponse };
        })
    );

    // Calculate total performance
    let total_performance = form_responses.reduce(
        (accumulator, form_response) => accumulator + form_response.average_response,
        0 // Initial value for the accumulator
    );

    total_performance = total_performance / form_responses.length;

    return {
        subject_performance: form_responses,
        total_performance,
    };
};


export const generateDepartmentReport = async (department_id) => {
    try {
        // Fetch class details
        const classDetails = await Class.getClassDetailsByDepartment(department_id);
        // console.log(classDetails);


        for (const classDetail of classDetails) {
            const forms = await StudentFormFetch.findFormsByYearAndClass(department_id, classDetail.year, classDetail.class);
            classDetail.forms = forms

        }
        // console.log(classDetails);


        for (const classDetail of classDetails) {
            classDetail.reports = [];
            const departmentName = await Department.findbyCode(department_id);
            classDetail.departmentName = departmentName.department_name;
                // console.log(classDetail.departmentName);
            for (const form of classDetail.forms) {
                const studentResponses = await StudentResponse.getStudentResponseByFormId(form.form_id);
                const studentCount = await StudentResponse.getStudentCount(form.form_id);
                const totalStudent = await StudentModel.getStudentCount(department_id, form.year, form.class)
                form.faculty_name = await FacultyModel.getFacultyByCode(form.faculty_id);
                // console.log(form.faculty_name);
                
                form.faculty_name = form.faculty_name[0].faculty_name;
                form.subject_name = await SubjectModel.getSubjectName(form.subject_id);
                // console.log(form.subject_name);
                
                form.subject_name = form.subject_name[0].sub_name;
                

                const scores = calculateScores(studentResponses);

                
                
                classDetail.reports.push({
                    year: classDetail.year,
                    class: classDetail.class,
                    departmentCode: classDetail.department_code,
                    faculty_name: form.faculty_name,
                    subject_name: form.subject_name,
                    // departmentName: ,
                    totalResponses: studentCount,
                    maxResponse: totalStudent,
                    scoreOutOf25: scores / studentCount,
                });

            }
        }

        

        // classDetails.forEach(classDetail => {
        //     console.log(classDetail.forms);
        // });

        return generatePDF(classDetails); // Generate the PDF with the report data
    } catch (error) {
        throw new Error('Error generating report: ' + error.message);
    }
}

function calculateScores(studentResponses) {
    const responseCounts = studentResponses.map(row => row.response);

    const count5 = responseCounts.filter(r => r === 5).length;
    const count4 = responseCounts.filter(r => r === 4).length;
    const count3 = responseCounts.filter(r => r === 3).length;
    const count2 = responseCounts.filter(r => r === 2).length;

    const totalScore = ((count5 * 1) + (count4 * 0.75) + (count3 * 0.5) + (count2 * 0.25)) / 24 * 25;
    return totalScore.toFixed(2);
}

// Function to generate PDF
function generatePDF(data) {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(24);
    doc.text("SSMIET AN AUTONOMOUS INSTITUTION", 105, 20, { align: "center" });
    doc.setFontSize(18);
    doc.text("Feedback Consolidation for the EVEN semester 2022-23", 105, 30, { align: "center" });

    // Iterate through class details
    data.forEach((classDetail, classIndex) => {
        // Add header for each class
        doc.setFontSize(16);
        doc.text(`Department: ${classDetail.department_code} , Year: ${classDetail.year} / Class: ${classDetail.class}`, 10, 60 + classIndex * 60);

        // Prepare table data
        const tableBody = classDetail.reports.map((report, reportIndex) => [
            reportIndex + 1,
            `${report.subject_name} , ${report.faculty_name}`, // You can update this to include more specific details if available
            `${report.totalResponses}/${report.maxResponse}`,
            report.scoreOutOf25
        ]);

        // Add the table
        doc.autoTable({
            startY: 70 + classIndex * 60, // Adjust table placement
            head: [['S.No.', 'Subject Name & Faculty Name', 'Total Responses', 'Score Out of 25']],
            body: tableBody, // Use the mapped rows
            theme: "grid", // Optional: Makes it look cleaner
            styles: {
                // font: "times",
                fontSize: 12,
                cellPadding: 4,
                overflow: "linebreak",
                halign: "center",
            },
            headStyles: {
                overflow: "linebreak",
                align: "center",
                textColor: [255, 250, 245],
                fillColor: [211, 157, 85] // Set table header color to orange
            }
        });
    });

    // Save the PDF
    // doc.save("ClassReports.pdf");
    return doc;
}

