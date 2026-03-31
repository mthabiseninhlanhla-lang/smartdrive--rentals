const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  getAllBookings,
  updateBookingStatus
} = require("../controllers/bookingController");

router.post("/", protect, authorizeRoles("customer"), createBooking);
router.get("/customer", protect, authorizeRoles("customer"), getCustomerBookings);
router.get("/provider", protect, authorizeRoles("provider"), getProviderBookings);
router.get("/all", protect, authorizeRoles("admin"), getAllBookings);
router.put("/:booking_id/status", protect, authorizeRoles("provider", "admin"), updateBookingStatus);

module.exports = router;