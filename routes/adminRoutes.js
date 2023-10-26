import express from "express";
import {
  deleteUserController,
  
  
} from "../controllers/adminController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();





router.delete("/delete/:email",userAuth,deleteUserController);





export default router;