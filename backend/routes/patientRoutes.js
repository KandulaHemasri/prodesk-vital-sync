import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Example protected route
router.get("/data", protect, (req, res) => {
  res.json({
    message: "Protected patient data accessed",
    user: req.user,
  });
});

export default router;