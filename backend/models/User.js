const db = require("../config/db");

const User = {};

User.create = (user, cb) => {
  const { full_name, email, password_hash, phone, role } = user;
  const sql = `
    INSERT INTO users (full_name, email, password_hash, phone, role)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [full_name, email, password_hash, phone, role], cb);
};

User.findByEmail = (email, cb) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], cb);
};

User.findById = (user_id, cb) => {
  db.query("SELECT * FROM users WHERE user_id = ?", [user_id], cb);
};

User.getAll = (cb) => {
  db.query(
    "SELECT user_id, full_name, email, phone, role, created_at FROM users",
    cb
  );
};

User.updateProfile = (user_id, full_name, phone, cb) => {
  db.query(
    "UPDATE users SET full_name = ?, phone = ? WHERE user_id = ?",
    [full_name, phone, user_id],
    cb
  );
};

module.exports = User;