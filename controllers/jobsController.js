
import jobsModel from "../models/jobsModel.js";

export const createJobController = async(req,res,next) => {
  const {company_id,job_title,job_description,location,salary,application_deadline}=req.body;
  if(!company_id || !job_title || !job_description || !salary || !application_deadline){
    next("please provide all fields");
  }

  const job = await jobsModel.create(req.body);
  res.status(201).json({job});
};

export const getAllJobsController = async(req,res,next)=>{
  const jobs = await jobsModel.find({});
  res.status(200).json({jobs});
};

export const updateJobController = async(req,res,next)=>{
    const {id} =req.params;
    const {company_id,job_title,job_description,location,salary,application_deadline}=req.body;
    if(!company_id || !job_title || !job_description || !salary || !application_deadline){
        next("please provide all fields");
      }

      const job= jobsModel.findOne({_id:id});
      if(!job){
        next("no jobs found with this id");
      }

      const updateJob = await jobsModel.findOneAndUpdate(
        {_id:id},
        req.body,
        {new:true},
        
      )
      res.status(200).json({updateJob});
};