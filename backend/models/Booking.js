const db = require("../config/db");

const Booking = {};

Booking.create = (booking, cb) => {
  const { vehicle_id, customer_id, start_date, end_date, total_price, status = "pending" } = booking;
  const sql = `
    INSERT INTO bookings (vehicle_id, customer_id, start_date, end_date, total_price, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [vehicle_id, customer_id, start_date, end_date, total_price, status], cb);
};

Booking.getAll = (cb) => {
  const sql = `
    SELECT b.*, v.brand, v.model, u.full_name AS customer_name
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.vehicle_id
    JOIN users u ON b.customer_id = u.user_id
    ORDER BY b.created_at DESC
  `;
  db.query(sql, cb);
};

Booking.getByCustomer = (customer_id, cb) => {
  const sql = `
    SELECT b.*, v.brand, v.model
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.vehicle_id
    WHERE b.customer_id = ?
    ORDER BY b.created_at DESC
  `;
  db.query(sql, [customer_id], cb);
};

Booking.getByProvider = (provider_id, cb) => {
  const sql = `
    SELECT b.*, v.brand, v.model, u.full_name AS customer_name
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.vehicle_id
    JOIN users u ON b.customer_id = u.user_id
    WHERE v.provider_id = ?
    ORDER BY b.created_at DESC
  `;
  db.query(sql, [provider_id], cb);
};

Booking.updateStatus = (booking_id, status, cb) => {
  db.query("UPDATE bookings SET status = ? WHERE booking_id = ?", [status, booking_id], cb);
};

Booking.findById = (booking_id, cb) => {
  db.query("SELECT * FROM bookings WHERE booking_id = ?", [booking_id], cb);
};

module.exports = Booking;