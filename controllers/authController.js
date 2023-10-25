import userModel from "../models/userModel.js";

export const signupController = async(req,res,next)=>{
   try{
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
        user
    })

   }
   catch(error){
    next(error);
   
   }
  };