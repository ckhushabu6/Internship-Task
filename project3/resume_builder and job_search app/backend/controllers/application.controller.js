const Application = require('../models/application.model');
const Job = require('../models/job.model');
const Resume = require('../models/resume.model');


// ✅ APPLY FOR JOB
exports.applyJob = async (req, res, next) => {
  try {
    const { jobId, resumeId } = req.body;

    if (!jobId || !resumeId) {
      return res.status(400).json({
        success: false,
        message: 'Job ID and Resume ID are required'
      });
    }

    // check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // check resume belongs to user
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(403).json({
        success: false,
        message: 'Invalid resume'
      });
    }

    // prevent duplicate application
    const existing = await Application.findOne({
      userId: req.user._id,
      jobId
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Already applied to this job'
      });
    }

    const application = await Application.create({
      userId: req.user._id,
      jobId,
      resumeId
    });

    res.status(201).json({
      success: true,
      message: 'Applied successfully',
      data: application
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET USER APPLICATIONS
exports.getUserApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({
      userId: req.user._id
    })
      .populate('jobId', 'title company location')
      .populate('resumeId', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });

  } catch (error) {
    next(error);
  }
};


// ✅ EMPLOYER: VIEW APPLICANTS FOR THEIR JOB
exports.getApplicantsForJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    // ensure job belongs to employer
    const job = await Job.findOne({
      _id: jobId,
      postedBy: req.user._id
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized or job not found'
      });
    }

    const applicants = await Application.find({ jobId })
      .populate('userId', 'name email')
      .populate('resumeId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applicants.length,
      data: applicants
    });

  } catch (error) {
    next(error);
  }
};


// ✅ UPDATE APPLICATION STATUS (EMPLOYER)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('jobId');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // only job owner can update
    if (application.jobId.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Status updated',
      data: application
    });

  } catch (error) {
    next(error);
  }
};