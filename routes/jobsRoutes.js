import express from "express";
import {
  createJobController,
  getAllJobsController,
  updateJobController,
  applyJobController,
} from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/post", userAuth, createJobController);


router.get("/list", userAuth, getAllJobsController);


router.put("/update/:id", userAuth, updateJobController);

router.post("/apply/:id", userAuth, applyJobController);


export default router;