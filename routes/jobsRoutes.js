import express from "express";
import {
  createJobController,
  // deleteJobController,
  getAllJobsController,
  // jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/post", userAuth, createJobController);


router.get("/list", userAuth, getAllJobsController);


router.put("/update/:id", userAuth, updateJobController);

// //DELETE JOBS || DELETE
// router.delete("/delete-job/:id", userAuth, deleteJobController);

// // JOBS STATS FILTER || GET
// router.get("/job-stats", userAuth, jobStatsController);

export default router;