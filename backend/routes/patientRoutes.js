import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
const router = express.Router();

// Protected patient utility route
router.get("/data", protect, (req, res) => {
  res.json({
    message: "Protected patient data accessed",
    user: req.user,
  });
});

// Update authenticated user profile
router.put("/update-profile", protect, async (req, res) => {
  try {
    const { age, gender } = req.body;

    if (age !== null && age !== undefined) {
      if (typeof age !== "number" || age < 1 || age > 120) {
        return res.status(400).json({ message: "Age must be a number between 1 and 120" });
      }
    }

    if (gender && !["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value" });
    }

    const updateData = {};
    if (age !== null && age !== undefined) updateData.age = age;
    if (gender) updateData.gender = gender;

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      age: user.age,
      gender: user.gender,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;