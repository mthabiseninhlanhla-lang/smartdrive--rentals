const db = require("../config/db");

const Review = {};

Review.create = (review, cb) => {
  const { vehicle_id, customer_id, rating, comment } = review;
  const sql = `
    INSERT INTO reviews (vehicle_id, customer_id, rating, comment)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [vehicle_id, customer_id, rating, comment], cb);
};

Review.getByVehicle = (vehicle_id, cb) => {
  const sql = `
    SELECT r.*, u.full_name AS customer_name
    FROM reviews r
    JOIN users u ON r.customer_id = u.user_id
    WHERE r.vehicle_id = ?
    ORDER BY r.created_at DESC
  `;
  db.query(sql, [vehicle_id], cb);
};

module.exports = Review;