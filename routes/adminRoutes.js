import express from "express";
import {
  deleteUserController,
  
  
} from "../controllers/adminController.js";
import userAuth from "../middlewares/authMiddleware.js";
import { requireAdminAuth } from '../middlewares/roleMiddleware.js';

const router = express.Router();





router.delete("/delete/:email",userAuth,requireAdminAuth,deleteUserController);





export default router;