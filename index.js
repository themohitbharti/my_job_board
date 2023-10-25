
// const path=require("path");
import  express  from "express";
import dotenv from "dotenv";
import morgan from "morgan";


import connectDB from './config/db.js';
import testRouter from "./routes/testRouter.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

connectDB();

const app =express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", testRouter);
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 8000;

// app.set("view engine","ejs");
// app.set("views" , path.resolve("./views"));

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})