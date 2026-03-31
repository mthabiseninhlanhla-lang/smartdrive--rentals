const db = require("../config/db");

const Payment = {};

Payment.create = (payment, cb) => {
  const { booking_id, amount, payment_method, payment_status = "pending" } = payment;
  const sql = `
    INSERT INTO payments (booking_id, amount, payment_method, payment_status)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [booking_id, amount, payment_method, payment_status], cb);
};

Payment.getAll = (cb) => {
  const sql = `
    SELECT p.*, b.customer_id, b.vehicle_id
    FROM payments p
    JOIN bookings b ON p.booking_id = b.booking_id
    ORDER BY p.payment_date DESC
  `;
  db.query(sql, cb);
};

module.exports = Payment;