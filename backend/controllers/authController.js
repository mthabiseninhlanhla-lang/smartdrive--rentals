const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const logAudit = require("../utils/auditLogger");

exports.register = async (req, res) => {
  try {
    const { full_name, email, password, phone, role } = req.body;

    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (!["customer", "provider"].includes(role)) {
      return res.status(403).json({ message: "Only customer or provider can register" });
    }

    User.findByEmail(email, async (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const password_hash = await hashPassword(password);

      User.create({ full_name, email, password_hash, phone, role }, (err, result) => {
        if (err) return res.status(500).json(err);

        logAudit({
          action: "REGISTER",
          entity_type: "users",
          entity_id: result.insertId,
          description: `${role} registered`,
          ip_address: req.ip
        });

        res.status(201).json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  User.findByEmail(email, async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const isValid = await comparePassword(password, user.password_hash);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    logAudit({
      user_id: user.user_id,
      action: "LOGIN",
      entity_type: "users",
      entity_id: user.user_id,
      description: `${user.role} logged in`,
      ip_address: req.ip
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  });
};