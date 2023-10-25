import userModel from "../models/userModel.js";

export const signupController = async(req,res)=>{
   try{
    const {firstname , lastname , email, password , accounttype}= req.body;
    if(!firstname){
        return res.status(400).send({success:false, message:"please provide firstname"})
    }

    if(!lastname){
        return res.status(400).send({success:false, message:"please provide lastname"})
    }

    if(!email){
        return res.status(400).send({success:false, message:"please provide email"})
    }

    if(!password){
        return res.status(400).send({success:false, message:"please provide password"})
    }

    if(!accounttype){
        return res.status(400).send({success:false, message:"please provide accounttype"})
    }

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(200).send({
            success:false,
            message:"email already registered"
        })
    }

    const user= await userModel.create({firstname , lastname , email, password , accounttype});
    res.status(201).send({
        success:true,
        message:"user created",
        user
    })

   }
   catch(error){
    console.log(error)
    res.status(400).send({
        message: "error in signupController",
        success: false,
        error,
    })
   }
  };