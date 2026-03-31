const db = require("../config/db");
const Booking = require("../models/Booking");
const logAudit = require("../utils/auditLogger");

exports.createBooking = (req, res) => {
  const customer_id = req.user.user_id;
  const { vehicle_id, start_date, end_date, total_price } = req.body;

  Booking.create({ vehicle_id, customer_id, start_date, end_date, total_price }, (err, result) => {
    if (err) return res.status(500).json(err);

    const booking_id = result.insertId;

    db.query(
      `
      INSERT INTO availability_calendar (vehicle_id, start_date, end_date, status, booking_id, notes)
      VALUES (?, ?, ?, 'booked', ?, 'Booking reserved')
      `,
      [vehicle_id, start_date, end_date, booking_id],
      () => {}
    );

    db.query(
      `
      INSERT INTO notifications (user_id, title, message, type)
      SELECT provider_id, 'New Booking', 'A customer placed a booking request.', 'booking'
      FROM vehicles WHERE vehicle_id = ?
      `,
      [vehicle_id],
      () => {}
    );

    logAudit({
      user_id: customer_id,
      action: "CREATE_BOOKING",
      entity_type: "bookings",
      entity_id: booking_id,
      description: "Booking created",
      ip_address: req.ip
    });

    res.status(201).json({ message: "Booking created successfully", booking_id });
  });
};

exports.getCustomerBookings = (req, res) => {
  Booking.getByCustomer(req.user.user_id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getProviderBookings = (req, res) => {
  Booking.getByProvider(req.user.user_id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getAllBookings = (req, res) => {
  Booking.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.updateBookingStatus = (req, res) => {
  const { booking_id } = req.params;
  const { status } = req.body;

  Booking.updateStatus(booking_id, status, (err) => {
    if (err) return res.status(500).json(err);

    Booking.findById(booking_id, (err, rows) => {
      if (!err && rows.length > 0) {
        const booking = rows[0];
        db.query(
          `
          INSERT INTO notifications (user_id, title, message, type)
          VALUES (?, 'Booking Update', ?, 'booking')
          `,
          [booking.customer_id, `Your booking status is now ${status}.`],
          () => {}
        );
      }
    });

    logAudit({
      user_id: req.user.user_id,
      action: "UPDATE_BOOKING_STATUS",
      entity_type: "bookings",
      entity_id: booking_id,
      description: `Booking status changed to ${status}`,
      ip_address: req.ip
    });

    res.json({ message: "Booking status updated successfully" });
  });
};