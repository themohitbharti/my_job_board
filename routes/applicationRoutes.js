import express from "express";
import {
  
  getAllApplicationsController,
  getApplicationsController,
  
} from "../controllers/applicationController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();


// router.post("/post", userAuth, createJobController);


router.get("/all", userAuth, getAllApplicationsController);

router.get("/list/:email", userAuth,getApplicationsController);


// router.put("/update/:id", userAuth, updateJobController);


export default router;