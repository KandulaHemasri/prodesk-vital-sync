const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Example protected route
router.get("/data", protect, (req, res) => {
  res.json({
    message: "Protected patient data accessed",
    user: req.user,
  });
});

module.exports = router;