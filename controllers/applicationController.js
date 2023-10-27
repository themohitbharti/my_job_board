
import applicationModel from "../models/applicationModel.js";
import userModel from "../models/userModel.js";


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
    const applications = await applicationModel.find({ 'job_seeker_id': jobSeekerId});
    
    if (!applications) {
        return res.status(404).json({ message: 'No applications found for this job seeker.' });
    }

    res.status(200).json({ applications });
  };


  export const deleteApplicationsController = async(req,res,next)=>{
    const applicationId = req.params.id;
    const deletedApplication = await applicationModel.findByIdAndRemove(applicationId);
    if (!deletedApplication) {
        return res.status(404).json({ message: 'Application not found or you do not have permission to cancel it.' });
    }

    res.status(200).json({ message: 'Application deleted successfully.' });
  };
