const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { addPayment, getAllPayments } = require("../controllers/paymentController");

router.post("/", protect, authorizeRoles("customer", "admin"), addPayment);
router.get("/", protect, authorizeRoles("admin"), getAllPayments);

module.exports = router;