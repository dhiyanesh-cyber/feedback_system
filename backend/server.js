import express, { json } from "express";
import departmentRouter from "./routes/departmentRoutes.js"
import studentRouter from "./routes/studentAuthRoutes.js"
import studentFormRouter from "./routes/studentFormFetchRoutes.js";
import adminRouter from "./routes/adminAuthRoutes.js"
import dotenv from "dotenv";
import cors from "./config/corsConfig.js"
dotenv.config();
// const cors = require('cors');



const app = express();
app.use(cors);


const PORT = process.env.PORT || 3000;
app.use(json())
app.use("/api/departments", departmentRouter)
app.use("/api/students", studentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/studentForms", studentFormRouter)

app.listen(PORT, () => {
    console.log("server started successfully");
})