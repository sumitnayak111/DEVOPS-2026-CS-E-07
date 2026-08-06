const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");
// Existing Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
// Profile Route
router.get("/profile", protect, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});
// Add this Admin Route BELOW the profile route
router.get("/admin", protect, authorize("admin"), (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin"
    });
});
module.exports = router;