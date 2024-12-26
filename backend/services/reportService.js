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
      const responses = await StudentResponse.getStudentResponseByFormId(
        form.form_id
      );
      const studentCount = await StudentResponse.getStudentCount(form.form_id);

      // const totalResponse = responses.reduce(
      //     (accumulator, response) => accumulator + response.response,
      //     0 // Initial value for the accumulator
      // );

      const responseCounts = responses.map((row) => row.response);

      const count5 = responseCounts.filter((r) => r === 5).length;
      const count4 = responseCounts.filter((r) => r === 4).length;
      const count3 = responseCounts.filter((r) => r === 3).length;
      const count2 = responseCounts.filter((r) => r === 2).length;

      const totalScore =
        ((count5 * 1 + count4 * 0.75 + count3 * 0.5 + count2 * 0.25) / 24) * 25;
      // return totalScore.toFixed(2);

      const averageResponse = studentCount > 0 ? totalScore / studentCount : 0;

      return { ...form, average_response: averageResponse };
    })
  );

  // Calculate total performance
  let total_performance = form_responses.reduce(
    (accumulator, form_response) =>
      accumulator + form_response.average_response,
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
      const forms = await StudentFormFetch.findFormsByYearAndClass(
        department_id,
        classDetail.year,
        classDetail.class
      );
      classDetail.forms = forms;
    }
    // console.log(classDetails);

    for (const classDetail of classDetails) {
      classDetail.reports = [];
      const departmentName = await Department.findbyCode(department_id);
      classDetail.departmentName = departmentName.department_name;
      // console.log(classDetail.departmentName);
      for (const form of classDetail.forms) {
        const studentResponses =
          await StudentResponse.getStudentResponseByFormId(form.form_id);
        const studentCount = await StudentResponse.getStudentCount(
          form.form_id
        );
        const totalStudent = await StudentModel.getStudentCount(
          department_id,
          form.year,
          form.class
        );
        form.faculty_name = await FacultyModel.getFacultyByCode(
          form.faculty_id
        );
        // console.log(form.faculty_name);

        form.faculty_name = form.faculty_name[0].faculty_name;
        form.subject_name = await SubjectModel.getSubjectName(form.subject_id);
        // console.log(form.subject_name);

        form.subject_name = form.subject_name[0].sub_name;

        const scores = calculateScores(studentResponses);

        classDetail.reports.push({
          year: classDetail.year,
          class: classDetail.class,
          department_name: classDetail.department_name,
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
    throw new Error("Error generating report: " + error.message);
  }
};

function calculateScores(studentResponses) {
  const responseCounts = studentResponses.map((row) => row.response);

  const count5 = responseCounts.filter((r) => r === 5).length;
  const count4 = responseCounts.filter((r) => r === 4).length;
  const count3 = responseCounts.filter((r) => r === 3).length;
  const count2 = responseCounts.filter((r) => r === 2).length;

  const totalScore =
    ((count5 * 1 + count4 * 0.75 + count3 * 0.5 + count2 * 0.25) / 24) * 25;
  return totalScore.toFixed(2);
}

// Function to generate PDF
function generatePDF(data) {
    console.log("Data : ", data);
    
  const doc = new jsPDF();
  
  // Add title

  doc.setFontSize(15.5);
  doc.setFont("times", "bold");
  doc.text("SSM INSTITUTE OF ENGINEERING AND TECHNOLOGY", 105, 15, {
    align: "center",
  });

  doc.setFontSize(12.5);
  doc.setFont("times", "bold");
  doc.text("(An Autonomous Institution)", 105, 20, {
    align: "center",
  });

  doc.setFont("times", "normal");
  doc.setFontSize(10.3);
  doc.text(
    "(Approved by AICTE, New Delhi / Affiliated to Anna University, Chennai / Accredited by NAAC)",
    105,
    25,
    { align: "center" }
  );
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.text("Dindigul – Palani Highway, Dindigul – 624 002", 105, 30, {
    align: "center",
  });

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("Department of Computer Science and Engineering", 105, 37, {
    align: "center",
  });

  // Add a horizontal line below the content
  doc.setDrawColor(238, 59, 59); // RGB values for orange
  doc.setLineWidth(0.5); // Adjust line thickness (default is 0.2)
  doc.line(10, 41, 200, 41); // Adjust x1, y1, x2, y2 as needed

  // Set the font size and add the text
  doc.setFont("times", "bold");
  doc.setFontSize(15);
  doc.text("Feedback Consolidation for the EVEN semester 2023-24", 105, 53, {
    align: "center",
  });

  // Calculate the text width to position the underline correctly
  const textWidth = doc.getTextWidth(
    "Feedback Consolidation for the EVEN semester 2022-23"
  );
  const textX = 105 - textWidth / 2; // Center the text
  const textY = 54; // Slightly below the text

  // Draw the underline
  doc.setDrawColor(0, 0, 0); // Black color for the underline
  doc.setLineWidth(0.5); // Adjust thickness
  doc.line(textX, textY, textX + textWidth, textY); // From the start to the end of the text

  let currentY = 65; // Starting Y position for the tables

  // Iterate through class details
  data.forEach((classDetail, classIndex) => {
    console.log(classDetail);
    // Add header for each class
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.text(
      `Department: ${classDetail.departmentName} , Year: ${classDetail.year} / Class: ${classDetail.class}`,
      10,
      currentY
    );

    // Prepare table data
    let tableBody = [];
    if (classDetail.reports && classDetail.reports.length > 0) {
      tableBody = classDetail.reports.map((report, reportIndex) => [
        reportIndex + 1,
        `${report.subject_name} , ${report.faculty_name}`,
        `${report.totalResponses}/${report.maxResponse}`,
        report.scoreOutOf25.toFixed(2),
      ]);
    } else {
      // Add a placeholder row if no data is available
      tableBody = [["-", "No data available", "-", "-"]];
    }

    doc.autoTable({
      startY: currentY + 10, // Adjust table placement
      head: [
        [
          "S.No.",
          "Subject Name & Faculty Name",
          "Total Responses",
          "Score Out of 25",
        ],
      ],
      body: tableBody,
      theme: "grid",
      styles: {
        font: "times",
        fontSize: 12,
        cellPadding: 4,
        halign: "left", // Align the content to the left for readability
        valign: "middle", // Vertically align the content
        overflow: "linebreak", // Ensure content wraps properly
        lineWidth: 0.1,
        lineColor: [0, 0, 0], // Thin black border for cells
      },
      headStyles: {
        font: "times",
        fontStyle: "bold",
        fontSize: 13,
        textColor: [0, 0, 0], // Black text color for headers
        fillColor: [255, 200, 145], // Light orange background
        lineWidth: 0.2, // Slightly thicker border for the header
        halign: "center", // Center-align headers
      },
      bodyStyles: {
        font: "times",
        fontSize: 12,
        textColor: [0, 0, 0], // Black text
        fillColor: [255, 255, 255], // White background for cells
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Light gray background for alternate rows
      },
    });

    // Adjust currentY for the next class
    currentY = doc.lastAutoTable.finalY + 15;
  });

  // Save the PDF
  // doc.save("ClassReports.pdf");
  return doc;
}
