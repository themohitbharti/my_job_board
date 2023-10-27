
import jobsModel from "../models/jobsModel.js";
import applicationModel from "../models/applicationModel.js";

export const createJobController = async(req,res,next) => {
  const {company_id,job_title,job_description,location,salary,application_deadline}=req.body;
  if(!company_id || !job_title || !job_description || !location || !salary || !application_deadline){
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
    if(!company_id || !job_title || !job_description || !location || !salary || !application_deadline){
        next("please provide all fields");
      }

      const job= jobsModel.findOne({_id:id});
      if(!job){
        next("no jobs found with this id");
      }
    
    // if (req.user.accounttype !== "company") {
    //     return next("You are not authorized to update this job");
    // }
    

      const updateJob = await jobsModel.findOneAndUpdate(
        {_id:id},
        req.body,
        {new:true},
        
      )
      res.status(200).json({updateJob});
};


// export const applyJobController = async(req,res,next) => {
//     const {id} =req.params;


//     const {application_date}=req.body;
//     if(!application_date ){
//       next("please provide all fields");
//     }
  
//     const application= await applicationModel.create( {
     
//         job_seeker_id: req.user.userId,
//         job_id : id,
//         application_date : req.body.application_date,
//      });
//      res.status(201).json({application});
//   };



export const applyJobController = async (req, res, next) => {
    const { id } = req.params;
    const { application_date } = req.body;

    if (!application_date) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    const jobSeekerId = req.user.userId;

    // Check if an application with the same job seeker ID and job ID exists
    const existingApplication = await applicationModel.findOne({ job_seeker_id: jobSeekerId, job_id: id });

    if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    // If no existing application is found, create a new application
    const application = await applicationModel.create({
        job_seeker_id: jobSeekerId,
        job_id: id,
        application_date: application_date,
    });

    res.status(201).json({ application });
};
