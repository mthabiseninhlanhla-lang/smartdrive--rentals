const db = require("../config/db");

const logAudit = ({ user_id = null, action, entity_type, entity_id = null, description = null, ip_address = null }) => {
  const sql = `
    INSERT INTO audit_logs (user_id, action, entity_type, entity_id, description, ip_address)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [user_id, action, entity_type, entity_id, description, ip_address], () => {});
};

module.exports = logAudit;