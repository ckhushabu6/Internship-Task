const Resume = require('../models/resume.model');


// ✅ CREATE RESUME
exports.createResume = async (req, res, next) => {
  try {
    const { title, personalInfo, skills, education, experience } = req.body;

    if (!personalInfo || !personalInfo.fullName || !personalInfo.email) {
      return res.status(400).json({
        success: false,
        message: 'Personal info is required'
      });
    }

    const resume = await Resume.create({
      userId: req.user._id,
      title,
      personalInfo,
      skills,
      education,
      experience
    });

    res.status(201).json({
      success: true,
      message: 'Resume created',
      data: resume
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET ALL RESUMES OF USER
exports.getUserResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET SINGLE RESUME
exports.getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });

  } catch (error) {
    next(error);
  }
};


// ✅ UPDATE RESUME (PARTIAL SAFE UPDATE)
exports.updateResume = async (req, res, next) => {
  try {
    const updateData = {};

    const { title, personalInfo, skills, education, experience } = req.body;

    if (title) updateData.title = title;
    if (personalInfo) updateData.personalInfo = personalInfo;
    if (skills) updateData.skills = skills;
    if (education) updateData.education = education;
    if (experience) updateData.experience = experience;

    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found or unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume updated',
      data: resume
    });

  } catch (error) {
    next(error);
  }
};


// ✅ DELETE RESUME
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found or unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume deleted'
    });

  } catch (error) {
    next(error);
  }
};