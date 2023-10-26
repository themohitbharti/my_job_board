

import userModel from "../models/userModel.js";


  export const deleteUserController = async(req,res,next)=>{
    const userEmail = req.params.email;
    const deletedUser = await userModel.findOneAndRemove({ email: userEmail });
    if (!deletedUser) {
        next("user not found");
    }
    res.status(200).json({ message: 'User deleted successfully.' })
   
  };
