const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  addVehicle,
  getAllVehicles,
  getMyVehicles,
  updateVehicle,
  deleteVehicle,
  addVehicleImage,
  getVehicleImages
} = require("../controllers/vehicleController");

router.get("/", getAllVehicles);
router.get("/mine", protect, authorizeRoles("provider"), getMyVehicles);
router.post("/", protect, authorizeRoles("provider"), addVehicle);
router.put("/:vehicle_id", protect, authorizeRoles("provider", "admin"), updateVehicle);
router.delete("/:vehicle_id", protect, authorizeRoles("provider", "admin"), deleteVehicle);

router.post("/:vehicle_id/images", protect, authorizeRoles("provider", "admin"), addVehicleImage);
router.get("/:vehicle_id/images", getVehicleImages);

module.exports = router;