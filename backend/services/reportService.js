import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Class from "../models/ClassModel.js";
import StudentModel from "../models/studentAuthModel.js";
import StudentFormFetch from "../models/studentFormFetchModel.js";
import StudentResponse from "../models/studentResponseModel.js";
import FacultyModel from "../models/facultyModel.js";
import SubjectModel from "../models/subjectModel.js";
import Department from "../models/departmentModel.js";
import { getSubjectNameService } from "./subjectService.js";
import { getDepartmentByCode } from "./departmentServices.js";
import { getQuestionnById } from "./questionServices.js";
import { getSemesterInNumber } from "../utils/getSemesterInNumber.js";
import Semester from "../models/semesterModel.js";
import { createCanvas, Image } from "canvas";



export const generateReport = async (faculty_id) => {
  const forms = await StudentFormFetch.findFormsByFaculty(faculty_id);

  // Resolve responses for each form using Promise.all
  const form_responses = await Promise.all(
    forms.map(async (form) => {
      const responses = await StudentResponse.getStudentResponseByFormId(form.form_id);
      const studentCount = await StudentResponse.getStudentCount(form.form_id);
      const subject = await getSubjectNameService(form.subject_id);
      const department = await getDepartmentByCode(form.department_id);
      const totalStudent = await StudentModel.getStudentCount(form.department_id, form.year, form.class);
      // const totalResponse = responses.reduce(
      //     (accumulator, response) => accumulator + response.response,
      //     0 // Initial value for the accumulator
      // );

      const responseCounts = responses.map(row => row.response);

      const count5 = responseCounts.filter(r => r === 5).length;
      const count4 = responseCounts.filter(r => r === 4).length;
      const count3 = responseCounts.filter(r => r === 3).length;
      const count2 = responseCounts.filter(r => r === 2).length;
      const count1 = responseCounts.filter(r => r === 1).length;

      const totalScore = ((count5 * 1) + (count4 * 0.75) + (count3 * 0.5) + (count2 * 0.25)) / 24 * 25;
      // return totalScore.toFixed(2);

      const averageResponse = studentCount > 0 ? totalScore / studentCount : 0;


      return {
        ...form, subjectName: subject[0].sub_name, departmentName: department.department_name, average_response: averageResponse, maxCount: totalStudent, studentCount, responses: [
          count1,
          count2,
          count3,
          count4,
          count5
        ]
      };
    })
  );

  // Filter out forms with studentCount of 0
  const valid_form_responses = form_responses.filter(form_response => form_response.studentCount > 0);

  // Calculate total performance based only on valid forms
  let total_performance = 0;
  if (valid_form_responses.length > 0) {
    total_performance = valid_form_responses.reduce(
      (accumulator, form_response) => accumulator + form_response.average_response,
      0 // Initial value for the accumulator
    ) / valid_form_responses.length;
  } else {
    total_performance = 0; // Or handle as needed if no valid forms
  }

  const questionPerformance = await Promise.all(
    Array.from({ length: 24 }, (_, index) => index + 1).map(async (id) => {
      const question = await getQuestionnById(id);
      let totalCounts = [0, 0, 0, 0, 0]; // Initialize counts for responses 1-5

      await Promise.all(
        form_responses.map(async (form) => {
          const responses = await StudentResponse.getStudentResponseByQuestionIdAndFormId(id, form.form_id);
          const responseCounts = responses.map(row => row.response);

          // Add counts to totals
          totalCounts[0] += responseCounts.filter(r => r === 1).length;
          totalCounts[1] += responseCounts.filter(r => r === 2).length;
          totalCounts[2] += responseCounts.filter(r => r === 3).length;
          totalCounts[3] += responseCounts.filter(r => r === 4).length;
          totalCounts[4] += responseCounts.filter(r => r === 5).length;
        })
      );

      // Return object directly instead of array
      return {
        question: question.question_text,
        responses: totalCounts
      };
    })
  );

  // Flatten the array if needed
  const flattenedResults = questionPerformance.flat();

  console.log(flattenedResults);


  return {
    subject_performance: form_responses,
    questionPerformance,
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
    // console.log("Class details : ", classDetails);


    for (const classDetail of classDetails) {
      classDetail.reports = [];
      const departmentName = await Department.findbyCode(department_id);
      classDetail.departmentName = departmentName.department_name;
      // console.log(classDetail.departmentName);
      for (const form of classDetail.forms) {
        const studentResponses = await StudentResponse.getStudentResponseByFormId(form.form_id);
        const studentCount = await StudentResponse.getStudentCount(form.form_id);
        // const totalStudent = await StudentModel.getStudentCount(department_id, form.year, form.class);
        const totalStudent = form.students_count;
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
    const semester = await Semester.findSemester();


    return await generatePDF(classDetails, semester); // Generate the PDF with the report data
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
async function generatePDF(data, semester) {
  const doc = new jsPDF();

  let dept = "";

  if (data[0].department_code === 'SH') {
    dept = data[0].departmentName;
  } else {
    dept = data[0].departmentName.split(" ").slice(1).join(" ");
  }

  try {
    const response = await fetch('https://ssmiet.ac.in/images/ssmlogo.png');
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    doc.addImage(`data:image/png;base64,${base64}`, 'PNG', 10, 12, 21, 20);

    // Add title
    doc.setFontSize(15.5);
    doc.setFont("times", "bold");
    doc.text("SSM INSTITUTE OF ENGINEERING AND TECHNOLOGY", 112, 15, {
      align: "center",
    });

    doc.setFontSize(12.5);
    doc.setFont("times", "bold");
    doc.text("(An Autonomous Institution)", 112, 20, {
      align: "center",
    });

    doc.setFont("times", "normal");
    doc.setFontSize(10.3);
    doc.text(
      "(Approved by AICTE, New Delhi / Affiliated to Anna University, Chennai / Accredited by NAAC)",
      112,
      25,
      { align: "center" }
    );

    doc.setFont("times", "bold");
    doc.setFontSize(10.5);
    doc.text("Dindigul – Palani Highway, Dindigul – 624 002", 112, 30, {
      align: "center",
    });

    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("Department of " + dept, 112, 37, {
      align: "center",
    });

    // Add horizontal line
    doc.setDrawColor(238, 59, 59);
    doc.setLineWidth(0.5);
    doc.line(10, 41, 200, 41);

    doc.setFont("times", "bold");
    doc.setFontSize(15);
    doc.text(`Feedback Consolidation for the ${semester} semester 2024 - 25`, 105, 53, {
      align: "center",
    });

    const textWidth = doc.getTextWidth(
      `Feedback Consolidation for the ${semester} semester 2024 - 25`
    );
    const textX = 105 - textWidth / 2;
    const textY = 54;

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(textX, textY, textX + textWidth, textY);

    let currentY = 65;

    data.forEach((classDetail, classIndex) => {
      // Add department text
      doc.setFont("times", "bold");
      doc.setFontSize(12);
      const departmentText = `Department: ${classDetail.departmentName} , Year: ${classDetail.year} / Class: ${classDetail.class} , Sem: ${getSemesterInNumber(classDetail.year, semester)}`;

      let tableBody = [];
      if (classDetail.reports && classDetail.reports.length > 0) {
        tableBody = classDetail.reports.map((report, reportIndex) => [
          reportIndex + 1,
          `${report.subject_name} , ${report.faculty_name}`,
          `${report.totalResponses}/${report.maxResponse}`,
          report.scoreOutOf25.toFixed(2),
        ]);
      } else {
        tableBody = [["-", "No data available", "-", "-"]];
      }

      // Calculate table height dynamically
      const rowHeight = 10;
      const tableHeight = tableBody.length * rowHeight + 40;

      // Check if the table fits on the current page
      if (currentY + tableHeight > doc.internal.pageSize.height - 20) {
        doc.addPage();
        currentY = 20;
      }

      doc.text(departmentText, 10, currentY);

      doc.autoTable({
        startY: currentY + 10,
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
          halign: "left",
          valign: "middle",
          overflow: "linebreak",
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
        },
        headStyles: {
          font: "times",
          fontStyle: "bold",
          fontSize: 13,
          textColor: [0, 0, 0],
          fillColor: [255, 200, 145],
          lineWidth: 0.2,
          halign: "center",
        },
        bodyStyles: {
          font: "times",
          fontSize: 12,
          textColor: [0, 0, 0],
          fillColor: [255, 255, 255],
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
        didParseCell: function (data) {
          // Ensure consistent cell padding
          data.cell.styles.cellPadding = 4;
        },
        willDrawCell: function (data) {
          // Prevent cells from being split across pages
          if (data.row.raw && data.row.raw.length > 0) {
            if (data.cursor.y + data.row.height > doc.internal.pageSize.height - 20) {
              doc.addPage();
              data.cursor.y = 20;
            }
          }
        },
      });

      currentY = doc.lastAutoTable.finalY + 15;
    });

    const addPrincipalSignature = () => {
      const pageHeight = doc.internal.pageSize.height;
      const marginBottom = 15; // Space from bottom of page
      const signatureHeight = 20; // Height needed for signature text

      // Check if there's enough space on the current page
      if (currentY + signatureHeight > pageHeight ) {
        doc.addPage();
        currentY = pageHeight - marginBottom; // Position at bottom of new page
      } else {
        currentY = pageHeight - marginBottom; // Position at bottom of current page
      }

      // Add Principal text
      doc.setFont("times", "bold");
      doc.setFontSize(12);
      doc.text("Principal", 170, currentY, { align: "center" });

    };

    addPrincipalSignature();

    return doc;
  } catch (error) {
    throw new Error(`Error loading logo: ${error.message}`);
  }
}
