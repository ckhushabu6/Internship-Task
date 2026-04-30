const User = require('../models/user.model');

// ✅ GET PROFILE
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE PROFILE
exports.updateProfile = async (req, res, next) => {
  try {
    const { skills, education, experience } = req.body;

    // 🔍 Basic validation
    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: 'Skills must be an array'
      });
    }

    if (education && !Array.isArray(education)) {
      return res.status(400).json({
        success: false,
        message: 'Education must be an array'
      });
    }

    if (experience && !Array.isArray(experience)) {
      return res.status(400).json({
        success: false,
        message: 'Experience must be an array'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        skills,
        education,
        experience
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });

  } catch (error) {
    next(error);
  }
};