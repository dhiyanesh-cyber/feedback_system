import express, { json } from "express";
import departmentRouter from "./routes/departmentRoutes.js"
import studentRouter from "./routes/studentAuthRoutes.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(json())
app.use("/api/departments", departmentRouter)
app.use("/api/students", studentRouter);

app.listen(PORT, () => {
    console.log("server started successfully");
})