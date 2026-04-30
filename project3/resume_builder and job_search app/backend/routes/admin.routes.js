const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

// only admin can access
router.get('/dashboard', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin 🚀' });
});

module.exports = router;