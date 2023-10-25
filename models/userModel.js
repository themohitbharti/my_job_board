import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
     firstname:{
        type: String,
        required:[true,"name is required"]
     },

     lastname:{
        type: String,
     },

     email:{
        type:String,
        required:[true,"email is required"],
        unique: true,
        validate: validator.isEmail,
     },

     password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password should be atleast 6 characters"],
     },

     salt:{
        type:String,

     },

     accounttype:{
        type:String,
        default: "job seeker",
     },
},
{
    timestamps: true
}
);

export default mongoose.model("User",userSchema);