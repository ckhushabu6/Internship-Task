
// USER
// GET    /all-users       (admin)
// GET    /user/:id        (admin)
// DELETE /user/:id        (admin)
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User")
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
//user update profile route 
router.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
});

// upload profile image
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { image: `/uploads/${req.file.filename}` },
        {
        returnDocument: "after",
        runValidators: true
      }
      );

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

module.exports = router;