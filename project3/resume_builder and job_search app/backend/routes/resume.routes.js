const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth.middleware');

const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume
} = require('../controllers/resume.controller');

// protected routes
router.post('/', protect, createResume);
router.get('/', protect, getUserResumes);
router.get('/:id', protect, getResumeById);
router.put('/:id', protect, updateResume);
router.delete('/:id', protect, deleteResume);

module.exports = router;