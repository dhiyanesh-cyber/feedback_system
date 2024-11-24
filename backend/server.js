import express from "express";
import departmentRouter from "./routes/departmentRoutes.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/departments", departmentRouter)

app.listen(PORT, () => {
    console.log("server started successfully");
})