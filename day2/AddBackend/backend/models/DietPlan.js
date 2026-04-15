// models/DietPlan.js
const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema({
 userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
  index: true
},
 name: {
  type: String,
  required: true
},
bmi: {
  type: Number,
  required: true
},
recommendation: {
  type: String,
  required: true
},
  foodItems: [String],
  workoutPlan: [String]
});

module.exports = mongoose.model("DietPlan", dietPlanSchema);