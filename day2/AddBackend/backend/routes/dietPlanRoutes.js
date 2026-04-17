// DIET PLAN
// POST   /generate
// GET    /my-plan         (user)
// GET    /plan/:userId    (admin)
// DELETE /plan/:id



const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {getMyPlans} = require("../controllers/planController");
const { getUserDietPlan } = require("../controllers/planController");
const DietPlan = require("../models/DietPlan");
const { generatePlan } = require("../controllers/planController");
const {getPlanByUserId} = require("../controllers/userController")
const {deletePlan} = require("../controllers/userController")


router.post("/generate", authMiddleware, generatePlan);
//router.get("/my-plans", authMiddleware, getMyPlans); // ✅ NEW
router.get("/my-plan", authMiddleware, getUserDietPlan);

router.get(
  "/plan/:userId",
  authMiddleware,
  roleMiddleware(["admin"]),
  getPlanByUserId
);

router.delete(
  "/plan/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deletePlan
);

module.exports = router;