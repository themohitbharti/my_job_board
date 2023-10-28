import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";

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
        select: true,
     },

     salt:{
        type:String,

     },

     accounttype:{
        type:String,
        enum: ["job seeker", "company", "admin"],
        default: "job seeker",
     },

     passwordResetToken:String,
     passwordResetTokenExpire: Date,
},
{
    timestamps: true
}
);


userSchema.pre("save", async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.salt = salt;
    this.password = await bcrypt.hash(this.password, salt);
  });

  userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

  userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  };

  userSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpire = Date.now() + 10*60*1000;

    console.log(resetToken,this.passwordResetToken);

    return resetToken;
  }

export default mongoose.model("User",userSchema);