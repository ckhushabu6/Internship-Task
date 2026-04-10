const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Only logged-in users
router.post("/generate", authMiddleware, (req, res) => {
  res.json({ message: "Diet plan generated" });
});

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