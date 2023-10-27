import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company_id: {
    type: String,
    required: [true, "company name is required"],
  },
  job_title: {
    type: String,
      required: [true, "Job title is required"],
      maxlength: 100,
  },
  job_description: {
    type: String,
      required: [true, "Job description is required"],
      maxlength: 250,
  },
  location: {
    type: String,
    required: [true, " location is required"],
  },
  salary: {
    type: Number,
    required: [true, "salary  is required"],
  },
  application_deadline: {
    type: String,
    required: [true, " application deadline is required"],
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },

  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
},{timestamps:true});

export default mongoose.model("Job", jobSchema);
