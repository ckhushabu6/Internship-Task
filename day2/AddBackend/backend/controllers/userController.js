// controllers/userController.js

const User = require("../models/User");
const mongoose = require("mongoose");
const DietPlan = require("../models/DietPlan");

// ✅ Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });
  }
};


exports.getOneUser = async (req, res) => {
  try {
    const {id} = req.params
    const users = await User.findById(id).select("-password"); // hide password

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });
  }
};

exports.deleteOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id); // ✅ correct method

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message
    });
  }
};


exports.getPlanByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const plan = await DietPlan.findOne({ userId }).populate("userId", "-password");

    if (!plan) {
      return res.status(404).json({ message: "Diet plan not found for this user" });
    }

    res.status(200).json(plan);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching diet plan",
      error: error.message
    });
  }
};


exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid plan ID" });
    }

    const deletedPlan = await DietPlan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({ message: "Diet plan not found" });
    }

    res.status(200).json({
      message: "Diet plan deleted successfully",
      plan: deletedPlan
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting diet plan",
      error: error.message
    });
  }
};