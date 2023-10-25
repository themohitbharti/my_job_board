import express from "express";
import {
  createJobController,
  getAllJobsController,
  updateJobController,
} from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/post", userAuth, createJobController);


router.get("/list", userAuth, getAllJobsController);


router.put("/update/:id", userAuth, updateJobController);


export default router;