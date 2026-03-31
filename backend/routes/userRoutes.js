const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { getAllUsers, getProfile, updateProfile } = require("../controllers/userController");

router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;