const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

const {
  createJob,
  getJobs,
  getJobById,
  deleteJob
} = require('../controllers/job.controller');

// 🔐 Employer only
router.post('/', protect, authorizeRoles('employer'), createJob);

// 🌍 Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// 🔐 Owner only
router.delete('/:id', protect, authorizeRoles('employer'), deleteJob);

module.exports = router;