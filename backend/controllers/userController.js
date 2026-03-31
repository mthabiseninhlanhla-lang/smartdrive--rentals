const User = require("../models/User");
const logAudit = require("../utils/auditLogger");

exports.getAllUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) return res.status(500).json(err);
    res.json(users);
  });
};

exports.getProfile = (req, res) => {
  User.findById(req.user.user_id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const user = results[0];
    delete user.password_hash;
    res.json(user);
  });
};

exports.updateProfile = (req, res) => {
  const { full_name, phone } = req.body;

  User.updateProfile(req.user.user_id, full_name, phone, (err) => {
    if (err) return res.status(500).json(err);

    logAudit({
      user_id: req.user.user_id,
      action: "UPDATE_PROFILE",
      entity_type: "users",
      entity_id: req.user.user_id,
      description: "Updated profile",
      ip_address: req.ip
    });

    res.json({ message: "Profile updated successfully" });
  });
};