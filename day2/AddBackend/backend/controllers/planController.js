// controllers/planController.js

const DietPlan = require("../models/DietPlan");

// ==============================
// 🔹 PLAN GENERATION LOGIC
// ==============================

const generatePlanLogic = (data) => {
  // ✅ Safety check
  if (!data.weight || !data.height || data.height <= 0) {
    throw new Error("Invalid weight or height");
  }

  // ✅ BMI (number, not string)
  const bmi = parseFloat(
    (data.weight / ((data.height / 100) ** 2)).toFixed(1)
  );

  const dietType = (data.diet || '').toLowerCase().trim();
  const goal = (data.goal || '').toLowerCase().trim();

  let recommendation = '';
  let foodItems = [];
  let workoutPlan = [];

  // 🟡 BMI-Based Recommendation
  if (bmi < 18.5) {
    recommendation = '⚠️ Underweight – You need high-protein meals and supplements to build weight.';
    foodItems = getUnderweightFoods(dietType);
  } else if (bmi >= 25) {
    recommendation = '⚠️ Overweight – You need a low-carb, high-fiber diet with lean protein support.';
    foodItems = getOverweightFoods(dietType);
  } else {
    recommendation = '✅ Normal BMI – Maintain a balanced, nutritious diet with optional supplements.';
    foodItems = getHealthyWeightFoods(dietType);
  }

  // 🔵 Goal-Based Additions
  const goalNote = getGoalNote(goal);
  recommendation += ` ${goalNote}`;

  // 🏋️ Workout Plan
  workoutPlan = getWorkoutPlan(goal);

  return {
    name: data.name,
    bmi,
    recommendation,
    foodItems,
    workoutPlan
  };
};

// ==============================
// 🔹 FOOD FUNCTIONS
// ==============================

const getUnderweightFoods = (diet) => {
  switch (diet) {
    case 'non-vegetarian':
      return ['🍗 Chicken', '🥚 Eggs', '🐟 Fish', '🥛 Milk', '🍞 Bread', '💪 Whey Protein'];
    case 'vegan':
      return ['🌱 Tofu', '🥜 Nuts', '🍌 Bananas', '🍚 Brown Rice', '💪 Plant Protein'];
    default:
      return ['🥛 Milk', '🍚 Rice', '🥜 Peanut Butter', '🥚 Eggs', '💪 Casein Protein'];
  }
};

const getOverweightFoods = (diet) => {
  switch (diet) {
    case 'non-vegetarian':
      return ['🍗 Grilled Chicken', '🥦 Broccoli', '🍎 Apple', '🐟 Fish', '💪 Whey Isolate'];
    case 'vegan':
      return ['🥗 Salads', '🥑 Avocados', '🍓 Berries', '🌰 Seeds', '💪 Pea Protein'];
    default:
      return ['🥬 Greens', '🍓 Fruits', '🥛 Low-fat Yogurt', '🍲 Lentils', '💪 Low-carb Shake'];
  }
};

const getHealthyWeightFoods = (diet) => {
  switch (diet) {
    case 'non-vegetarian':
      return ['🍗 Chicken', '🐟 Fish', '🍚 Brown Rice', '🥗 Salad', '💪 Protein'];
    case 'vegan':
      return ['🥗 Kale', '🍚 Quinoa', '🥜 Almonds', '🍊 Fruits', '💪 Vegan Protein'];
    default:
      return ['🍚 Rice', '🥛 Milk', '🥗 Spinach', '🍎 Fruits', '💪 Balanced Protein'];
  }
};

// ==============================
// 🔹 GOAL + WORKOUT
// ==============================

const getGoalNote = (goal) => {
  switch (goal) {
    case 'weight_loss':
      return '🥗 Goal: Weight Loss – Focus on calorie deficit.';
    case 'weight_gain':
      return '🥩 Goal: Weight Gain – Increase protein and calories.';
    case 'maintain_weight':
      return '🧘 Goal: Maintain – Stay consistent.';
    default:
      return '';
  }
};

const getWorkoutPlan = (goal) => {
  switch (goal) {
    case 'weight_loss':
      return [
        '🏃 Cardio 30 mins',
        '🏋️ HIIT Workout',
        '🧘 Stretching'
      ];
    case 'weight_gain':
      return [
        '🏋️ Weight Lifting',
        '💪 Strength Training',
        '🥤 Protein Intake'
      ];
    case 'maintain_weight':
      return [
        '🚶 Walking',
        '🏋️ Light Strength',
        '🧘 Yoga'
      ];
    default:
      return ['⚠️ Select a goal'];
  }
};

// ==============================
// 🔹 CONTROLLERS
// ==============================

// ✅ GENERATE PLAN
exports.generatePlan = async (req, res) => {
  try {
    const userId = req.user.id;
// console.log("REQEST HAI YEEEEEE",req)
// console.log("REQUEST BODY HAI YE ", req.body )
    const result = generatePlanLogic(req.body);
    //console.log("YE RESULT HAI",result);

    const newPlan = new DietPlan({
      userId: userId,
      ...result
    });
    console.log(newPlan);
    await newPlan.save();

    res.status(201).json(newPlan);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error generating plan",
      error: error.message
    });
  }
};

// ✅ GET ALL USER PLANS
exports.getMyPlans = async (req, res) => {
  try {
    const userId = req.user.id;

    const plans = await DietPlan.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(plans);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching plans",
      error: error.message
    });
  }
};

exports.getUserDietPlan = async (req, res) => {
  try {
    const userId = req.user.id; // comes from auth middleware

    const plan = await DietPlan.findOne({ userId });

    if (!plan) {
      return res.status(404).json({ message: "No plan found" });
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};