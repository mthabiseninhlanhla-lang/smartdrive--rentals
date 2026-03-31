const db = require("../config/db");
const logAudit = require("../utils/auditLogger");

exports.submitLicense = (req, res) => {
  const user_id = req.user.user_id;
  const {
    license_number,
    issuing_country,
    expiry_date,
    front_image_url,
    back_image_url,
    selfie_image_url
  } = req.body;

  const sql = `
    INSERT INTO driver_license_verification
    (user_id, license_number, issuing_country, expiry_date, front_image_url, back_image_url, selfie_image_url, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
  `;

  db.query(
    sql,
    [user_id, license_number, issuing_country, expiry_date, front_image_url, back_image_url, selfie_image_url],
    (err, result) => {
      if (err) return res.status(500).json(err);

      logAudit({
        user_id,
        action: "SUBMIT_LICENSE",
        entity_type: "driver_license_verification",
        entity_id: result.insertId,
        description: "Submitted license verification",
        ip_address: req.ip
      });

      res.status(201).json({ message: "License submitted successfully" });
    }
  );
};

exports.getMyLicenseStatus = (req, res) => {
  db.query(
    `SELECT * FROM driver_license_verification WHERE user_id = ? ORDER BY created_at DESC`,
    [req.user.user_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.reviewLicense = (req, res) => {
  const { verification_id } = req.params;
  const { status, rejection_reason } = req.body;

  const sql = `
    UPDATE driver_license_verification
    SET status = ?, reviewed_by = ?, reviewed_at = NOW(), rejection_reason = ?
    WHERE verification_id = ?
  `;

  db.query(sql, [status, req.user.user_id, rejection_reason || null, verification_id], (err) => {
    if (err) return res.status(500).json(err);

    logAudit({
      user_id: req.user.user_id,
      action: "REVIEW_LICENSE",
      entity_type: "driver_license_verification",
      entity_id: verification_id,
      description: `License review set to ${status}`,
      ip_address: req.ip
    });

    res.json({ message: "License verification updated" });
  });
};