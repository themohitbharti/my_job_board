import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      next("Auth Failed");
    }
    const token = authHeader.split(" ")[1];
    try {
      const payload = JWT.verify(token, process.env.JWT_SECRET);

      const user = await userModel.findById(payload.userId); 
      req.user = { userId: payload.userId, accounttype: user.accounttype ,email:user.email};

   
     
      next();
    } catch (error) {
      next("Auth Failed");
    }
  };
  
  export default userAuth;