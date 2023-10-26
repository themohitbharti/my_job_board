import express from "express";
import {
  deleteApplicationsController,
  getAllApplicationsController,
  getApplicationsController,
  
} from "../controllers/applicationController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/all", userAuth, getAllApplicationsController);

router.get("/list/:email", userAuth,getApplicationsController);

router.delete("/cancel/:id",userAuth,deleteApplicationsController);





export default router;