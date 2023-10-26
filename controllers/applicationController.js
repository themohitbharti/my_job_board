
import applicationModel from "../models/applicationModel.js";
import userModel from "../models/userModel.js";

// export const createJobController = async(req,res,next) => {
//   const {company_id,job_title,job_description,location,salary,application_deadline}=req.body;
//   if(!company_id || !job_title || !job_description || !salary || !application_deadline){
//     next("please provide all fields");
//   }

//   const job = await jobsModel.create(req.body);
//   res.status(201).json({job});
// };

export const getAllApplicationsController = async(req,res,next)=>{
  const applications = await applicationModel.find({});
  res.status(200).json({applications});
};


export const getApplicationsController = async(req,res,next)=>{
    const jobSeekerEmail = req.params.email;
    const jobSeeker = await userModel.findOne({ email: jobSeekerEmail });
    

    if (!jobSeeker) {
        return res.status(404).json({ message: 'No job seeker found with this email.' });
    }
    const jobSeekerId = jobSeeker._id;
    const applications = await applicationModel.find({ 'job_Seeker_id': jobSeekerId});
    
    if (!applications) {
        return res.status(404).json({ message: 'No applications found for this job seeker.' });
    }

    res.status(200).json({ applications });
  };

// export const updateJobController = async(req,res,next)=>{
//     const {id} =req.params;
//     const {company_id,job_title,job_description,location,salary,application_deadline}=req.body;
//     if(!company_id || !job_title || !job_description || !salary || !application_deadline){
//         next("please provide all fields");
//       }

//       const job= jobsModel.findOne({_id:id});
//       if(!job){
//         next("no jobs found with this id");
//       }
    
//     // if (req.user.accounttype !== "company") {
//     //     return next("You are not authorized to update this job");
//     // }
    

//       const updateJob = await jobsModel.findOneAndUpdate(
//         {_id:id},
//         req.body,
//         {new:true},
        
//       )
//       res.status(200).json({updateJob});
// };