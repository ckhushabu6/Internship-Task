const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // ✅ ONE PLAN PER USER
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    bmi: {
      type: Number,
      required: true
    },

    recommendation: {
      type: String,
      required: true,
      trim: true
    },

    foodItems: {
      type: [String],
      default: [] // ✅ safe fallback
    },

    workoutPlan: {
      type: [String],
      default: [] // ✅ safe fallback
    }
  },
  {
    timestamps: true // ✅ createdAt, updatedAt
  }
);

module.exports = mongoose.model("DietPlan", dietPlanSchema);