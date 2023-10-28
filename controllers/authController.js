
import userModel from "../models/userModel.js";
import sendEmail from "../utils/email.js";
import  crypto  from 'crypto';

export const signupController = async(req,res,next)=>{
    

    const {firstname , lastname , email, password , accounttype}= req.body;
    if(!firstname){
        // return res.status(400).send({success:false, message:"please provide firstname"})
        next("firstname required");
    }

    if(!lastname){
        // return res.status(400).send({success:false, message:"please provide lastname"})
        next("lastname required");
    }

    if(!email){
        // return res.status(400).send({success:false, message:"please provide email"})
        next("email required");
    }

    if(!password){
        // return res.status(400).send({success:false, message:"please provide password"})
        next("password required more than 6 chars");
    }

    if(!accounttype){
        // return res.status(400).send({success:false, message:"please provide accounttype"})
        next("accountype required");
    }

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        // return res.status(200).send({
        //     success:false,
        //     message:"email already registered"
        // })
        next("email already registered");
    }

    const user= await userModel.create({firstname , lastname , email, password , accounttype});


    res.status(201).send({
        success:true,
        message:"user created",
        user:{
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            accounttype: user.accounttype,
        },
      
    })
  };

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide both email and password." });
    }

    
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
           
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        
        }

        
        user.password = undefined;

        const token = user.createJWT();

        

        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token,
            
        });
   
};



export const forgotPassword = async (req,res,next) =>{
      const user = await userModel.findOne({email: req.body.email});
      if(!user){
        next("can't find user");
        return res.status(404).send("no user found with that email");
      }


     const resetToken = user.createResetPasswordToken();

     await user.save({validateBeforeSave: false});


     const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/password/reset/${resetToken}`;
     const message = `we have a password reset request, use the below link to reset password
                      \n\n${resetUrl}\n\nThis reset password link will be valid only for 10 mins`;

     try{
        await sendEmail({
          email:user.email,
          subject: "password change request received",
          message: message,
       });

       res.status(200).json({
        status: "success",
        message: "password reset link send to user email",
       });
     }
     catch(err){
          user.passwordResetToken= undefined;
          user.passwordResetTokenExpire = undefined;
          user.save({validateBeforeSave:false});

          return res.status(500).send("there was an error sending password reset email, try again later");
     }

     
};



export const resetPassword = async (req,res,next)=>{
     const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
     const user = await userModel.findOne({passwordResetToken:token , passwordResetTokenExpire : {$gt: Date.now()}});
     
     if(!user){
        return res.status(400).send("token is invalid or expired");
     }


     user.password = req.body.new_password;
     user.passwordResetToken = undefined;
     user.passwordResetTokenExpire = undefined;

     user.save();

     res.status(200).send({
        status:"success",
     })
}

  