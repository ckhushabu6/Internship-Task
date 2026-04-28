const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      trim: true
    },

    bmi: {
      type: Number,
      required: true
    },

    height: {
      type: Number,
      required: true,
      min: 50,
      max: 300
    },

    weight: {
      type: Number,
      required: true,
      min: 20,
      max: 300
    },

    goal: {
      type: String,
      enum: ["weight_loss", "weight_gain", "maintain_weight"],
      required: true
    },

    recommendation: {
      type: String,
      required: true,
      trim: true
    },

    foodItems: {
      type: [String],
      default: []
    },

    workoutPlan: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// index for fast queries
dietPlanSchema.index({ userId: 1 });

module.exports = mongoose.model("DietPlan", dietPlanSchema);