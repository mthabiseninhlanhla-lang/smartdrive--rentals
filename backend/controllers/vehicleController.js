const db = require("../config/db");
const Vehicle = require("../models/Vehicle");
const logAudit = require("../utils/auditLogger");

exports.addVehicle = (req, res) => {
  const provider_id = req.user.user_id;
  const { brand, model, year, price_per_day, location } = req.body;

  Vehicle.create({ provider_id, brand, model, year, price_per_day, location }, (err, result) => {
    if (err) return res.status(500).json(err);

    logAudit({
      user_id: provider_id,
      action: "ADD_VEHICLE",
      entity_type: "vehicles",
      entity_id: result.insertId,
      description: `${brand} ${model} added`,
      ip_address: req.ip
    });

    res.status(201).json({ message: "Vehicle added successfully", vehicle_id: result.insertId });
  });
};

exports.getAllVehicles = (req, res) => {
  Vehicle.getAll((err, vehicles) => {
    if (err) return res.status(500).json(err);
    res.json(vehicles);
  });
};

exports.getMyVehicles = (req, res) => {
  Vehicle.getByProvider(req.user.user_id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.updateVehicle = (req, res) => {
  const { vehicle_id } = req.params;

  Vehicle.update(vehicle_id, req.body, (err) => {
    if (err) return res.status(500).json(err);

    logAudit({
      user_id: req.user.user_id,
      action: "UPDATE_VEHICLE",
      entity_type: "vehicles",
      entity_id: vehicle_id,
      description: "Vehicle updated",
      ip_address: req.ip
    });

    res.json({ message: "Vehicle updated successfully" });
  });
};

exports.deleteVehicle = (req, res) => {
  const { vehicle_id } = req.params;

  Vehicle.remove(vehicle_id, (err) => {
    if (err) return res.status(500).json(err);

    logAudit({
      user_id: req.user.user_id,
      action: "DELETE_VEHICLE",
      entity_type: "vehicles",
      entity_id: vehicle_id,
      description: "Vehicle deleted",
      ip_address: req.ip
    });

    res.json({ message: "Vehicle deleted successfully" });
  });
};

exports.addVehicleImage = (req, res) => {
  const { vehicle_id } = req.params;
  const { image_url, is_primary = false, sort_order = 0 } = req.body;

  const sql = `
    INSERT INTO vehicle_images (vehicle_id, image_url, is_primary, sort_order)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [vehicle_id, image_url, is_primary, sort_order], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Vehicle image added", image_id: result.insertId });
  });
};

exports.getVehicleImages = (req, res) => {
  const { vehicle_id } = req.params;
  db.query(
    "SELECT * FROM vehicle_images WHERE vehicle_id = ? ORDER BY sort_order ASC, created_at ASC",
    [vehicle_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};