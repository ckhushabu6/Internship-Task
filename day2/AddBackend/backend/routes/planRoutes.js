const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const DietPlan = require("../models/DietPlan");


const { generatePlan } = require("../controllers/planController");

router.post("/generate", authMiddleware, generatePlan);



router.get("/my-plans", authMiddleware, async (req, res) => {
  try {
    const plans = await DietPlan.find({ userId: req.user.id });
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Only logged-in users
// router.post("/generate", authMiddleware, (req, res) => {
//   res.json({ message: "Diet plan generated" });
// });

// Only admin can access
router.get(
  "/all-plans",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ message: "All plans (Admin only)" });
  }
);

module.exports = router;