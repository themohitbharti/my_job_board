import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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


userSchema.pre("save", async function () {
    // if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

export default mongoose.model("User",userSchema);