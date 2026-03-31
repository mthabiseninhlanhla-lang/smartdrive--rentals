const Payment = require("../models/Payment");
const logAudit = require("../utils/auditLogger");

exports.addPayment = (req, res) => {
  const { booking_id, amount, payment_method, payment_status } = req.body;

  Payment.create({ booking_id, amount, payment_method, payment_status }, (err, result) => {
    if (err) return res.status(500).json(err);

    logAudit({
      user_id: req.user.user_id,
      action: "ADD_PAYMENT",
      entity_type: "payments",
      entity_id: result.insertId,
      description: "Payment recorded",
      ip_address: req.ip
    });

    res.status(201).json({ message: "Payment recorded successfully", payment_id: result.insertId });
  });
};

exports.getAllPayments = (req, res) => {
  Payment.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};