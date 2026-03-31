const Review = require("../models/Review");
const logAudit = require("../utils/auditLogger");

exports.addReview = (req, res) => {
  const customer_id = req.user.user_id;
  const { vehicle_id, rating, comment } = req.body;

  Review.create({ vehicle_id, customer_id, rating, comment }, (err, result) => {
    if (err) return res.status(500).json(err);

    logAudit({
      user_id: customer_id,
      action: "ADD_REVIEW",
      entity_type: "reviews",
      entity_id: result.insertId,
      description: "Vehicle review added",
      ip_address: req.ip
    });

    res.status(201).json({ message: "Review added successfully", review_id: result.insertId });
  });
};

exports.getVehicleReviews = (req, res) => {
  Review.getByVehicle(req.params.vehicle_id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};