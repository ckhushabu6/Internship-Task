const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {getMyPlans} = require("../controllers/planController");
const { getUserDietPlan } = require("../controllers/planController");
const { getAllUsers } = require("../controllers/userController");
const DietPlan = require("../models/DietPlan");


const { generatePlan } = require("../controllers/planController");

router.post("/generate", authMiddleware, generatePlan);
//router.get("/my-plans", authMiddleware, getMyPlans); // ✅ NEW
router.get("/all-users", authMiddleware, roleMiddleware(["admin"]), getAllUsers);
router.get("/my-plan", authMiddleware, getUserDietPlan);


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