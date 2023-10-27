import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job_seeker_id: {
    type: String,
    required: [true, "job seeker id is required"],
  },
  job_id: {
    type: String,
      required: [true, "Job id is required"],
    
  },
 
  application_date: {
    type: String,
   
  },
  status: {
    type: String,
    enum: ["pending", "accepted","rejected"],
    default: "pending",
  },


},{timestamps:true});

export default mongoose.model("Application", applicationSchema);
