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

      const user = await userModel.findById(payload.userId); // Fetch user data from your user model
      req.user = { userId: payload.userId, accounttype: user.accounttype };

    //   req.user = { userId: payload.userId };
      console.log(req.user);
      next();
    } catch (error) {
      next("Auth Failed");
    }
  };
  
  export default userAuth;