
// const path=require("path");
import  express  from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app =express();
const PORT = process.env.PORT || 8000;

// app.set("view engine","ejs");
// app.set("views" , path.resolve("./views"));

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})