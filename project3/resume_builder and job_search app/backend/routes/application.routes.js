const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

const {
  applyJob,
  getUserApplications,
  getApplicantsForJob,
  updateApplicationStatus
} = require('../controllers/application.controller');

// 👤 User applies
router.post('/', protect, authorizeRoles('user'), applyJob);

// 👤 User sees applied jobs
router.get('/me', protect, authorizeRoles('user'), getUserApplications);

// 🏢 Employer sees applicants
router.get('/job/:jobId', protect, authorizeRoles('employer'), getApplicantsForJob);

// 🏢 Employer updates status
router.put('/:id/status', protect, authorizeRoles('employer'), updateApplicationStatus);

module.exports = router;