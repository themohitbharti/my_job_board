import mongoose from "mongoose";


const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/jobportaldb');
        console.log("mongodb connected");
    }
    catch(error){
        console.log("mongo error",error)
    }
}

export default connectDB;