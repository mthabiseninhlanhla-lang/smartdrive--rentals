const db = require("../config/db");

const Vehicle = {};

Vehicle.create = (vehicle, cb) => {
  const {
    provider_id,
    brand,
    model,
    year,
    price_per_day,
    location,
    availability = true
  } = vehicle;

  const sql = `
    INSERT INTO vehicles (provider_id, brand, model, year, price_per_day, location, availability)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [provider_id, brand, model, year, price_per_day, location, availability], cb);
};

Vehicle.getAll = (cb) => {
  db.query(`
    SELECT v.*, u.full_name AS provider_name
    FROM vehicles v
    JOIN users u ON v.provider_id = u.user_id
    ORDER BY v.created_at DESC
  `, cb);
};

Vehicle.getByProvider = (provider_id, cb) => {
  db.query("SELECT * FROM vehicles WHERE provider_id = ?", [provider_id], cb);
};

Vehicle.findById = (vehicle_id, cb) => {
  db.query("SELECT * FROM vehicles WHERE vehicle_id = ?", [vehicle_id], cb);
};

Vehicle.update = (vehicle_id, data, cb) => {
  const { brand, model, year, price_per_day, location, availability } = data;
  const sql = `
    UPDATE vehicles
    SET brand = ?, model = ?, year = ?, price_per_day = ?, location = ?, availability = ?
    WHERE vehicle_id = ?
  `;
  db.query(sql, [brand, model, year, price_per_day, location, availability, vehicle_id], cb);
};

Vehicle.remove = (vehicle_id, cb) => {
  db.query("DELETE FROM vehicles WHERE vehicle_id = ?", [vehicle_id], cb);
};

module.exports = Vehicle;