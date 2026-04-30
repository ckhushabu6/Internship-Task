const Job = require('../models/job.model');


// ✅ CREATE JOB (EMPLOYER ONLY)
exports.createJob = async (req, res, next) => {
  try {
    const { title, company, location, skills, description } = req.body;

    // validation
    if (!title || !company || !location || !skills || !description) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (!Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: 'Skills must be an array'
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      skills,
      description,
      postedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: job
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET ALL JOBS + SEARCH FILTER
exports.getJobs = async (req, res, next) => {
  try {
    const { skill, location } = req.query;

    const query = {};

    // 🔍 filter by skill
    if (skill) {
      query.skills = { $regex: skill, $options: 'i' };
    }

    // 🔍 filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const jobs = await Job.find(query)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET SINGLE JOB
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });

  } catch (error) {
    next(error);
  }
};


// ✅ DELETE JOB (ONLY OWNER)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      postedBy: req.user._id
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job deleted'
    });

  } catch (error) {
    next(error);
  }
};