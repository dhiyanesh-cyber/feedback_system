import express from "express";
import departmentRouter from "./routes/departmentRoutes.js"
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
// const cors = require('cors');



const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/departments", departmentRouter)

app.listen(PORT, () => {
    console.log("server started successfully");
})