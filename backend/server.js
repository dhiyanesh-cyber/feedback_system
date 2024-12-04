import express, { json } from "express";
import departmentRouter from "./routes/departmentRoutes.js"
import studentRouter from "./routes/studentAuthRoutes.js"
import studentFormRouter from "./routes/studentFormFetchRoutes.js";
import adminRouter from "./routes/adminAuthRoutes.js"
import classRouter from "./routes/classRoutes.js"
import questionsRouter from "./routes/questionRoutes.js"
import facultyRouter from "./routes/facultyRoutes.js"
import studentResponseRouter from "./routes/studentResponseRoutes.js"
import subjectRouter from "./routes/subjectRoutes.js"
import dotenv from "dotenv";
import cors from "./config/corsConfig.js"
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
// const cors = require('cors');



const app = express();
app.use(cors);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));


const PORT = process.env.PORT || 3000;
app.use(json());
app.use("/api/departments", departmentRouter);
app.use("/api/students", studentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/studentForms", studentFormRouter)
app.use("/api/class", classRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/studentResponse", studentResponseRouter)
app.use("/api/subject",  subjectRouter)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

app.listen(PORT, () => {
    console.log("server started successfully");
})