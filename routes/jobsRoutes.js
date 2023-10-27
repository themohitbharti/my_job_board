import express from "express";
import {
  createJobController,
  getAllJobsController,
  updateJobController,
  applyJobController,
} from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddleware.js";
import { requireCompanyAuth ,requireJobSeekerAuth} from "../middlewares/roleMiddleware.js";

const router = express.Router();


router.post("/post", userAuth ,requireCompanyAuth,createJobController);


router.get("/list", userAuth, getAllJobsController);


router.put("/update/:id", userAuth, requireCompanyAuth,updateJobController);

router.post("/apply/:id", userAuth,requireJobSeekerAuth, applyJobController);


export default router;