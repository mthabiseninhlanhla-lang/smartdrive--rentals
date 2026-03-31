const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  submitLicense,
  getMyLicenseStatus,
  reviewLicense
} = require("../controllers/licenseController");

router.post("/", protect, authorizeRoles("customer"), submitLicense);
router.get("/mine", protect, authorizeRoles("customer"), getMyLicenseStatus);
router.put("/:verification_id/review", protect, authorizeRoles("admin"), reviewLicense);

module.exports = router;