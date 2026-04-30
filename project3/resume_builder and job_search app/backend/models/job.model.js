const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },

  company: {
    type: String,
    required: [true, 'Company name is required']
  },

  location: {
    type: String,
    required: [true, 'Location is required'],
    index: true
  },

  skills: {
    type: [String],
    required: true,
    index: true
  },

  description: {
    type: String,
    required: [true, 'Job description is required']
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true });

// 🔍 compound index for search optimization
jobSchema.index({ skills: 1, location: 1 });

module.exports = mongoose.model('Job', jobSchema);