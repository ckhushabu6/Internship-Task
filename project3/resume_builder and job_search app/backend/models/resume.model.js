const mongoose = require('mongoose');

// sub schemas
const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String }
});

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  years: { type: String }
});

const personalInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  summary: String
});

// main schema
const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  title: {
    type: String,
    default: 'Untitled Resume'
  },

  personalInfo: personalInfoSchema,

  skills: [String],

  education: [educationSchema],

  experience: [experienceSchema]

}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);