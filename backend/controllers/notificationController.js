const db = require("../config/db");

exports.getMyNotifications = (req, res) => {
  db.query(
    "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
    [req.user.user_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.markAsRead = (req, res) => {
  db.query(
    "UPDATE notifications SET is_read = TRUE WHERE notification_id = ? AND user_id = ?",
    [req.params.notification_id, req.user.user_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Notification marked as read" });
    }
  );
};