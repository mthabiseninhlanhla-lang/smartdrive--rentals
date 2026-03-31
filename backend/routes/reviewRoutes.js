const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { addReview, getVehicleReviews } = require("../controllers/reviewController");

router.post("/", protect, authorizeRoles("customer"), addReview);
router.get("/:vehicle_id", getVehicleReviews);

module.exports = router;