import express from "express";
import {
  deleteApplicationsController,
  getAllApplicationsController,
  getApplicationsController,
  
} from "../controllers/applicationController.js";
import userAuth from "../middlewares/authMiddleware.js";
import { requireJobSeekerAuth } from '../middlewares/roleMiddleware.js';

const router = express.Router();


router.get("/all", userAuth, getAllApplicationsController);

router.get("/list/:email",userAuth,requireJobSeekerAuth,getApplicationsController);

router.delete("/cancel/:id",userAuth,requireJobSeekerAuth,deleteApplicationsController);





export default router;