import mongoose from "mongoose";


const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("mongodb connected");
    }
    catch(error){
        console.log("mongo error",error)
    }
}

export default connectDB;