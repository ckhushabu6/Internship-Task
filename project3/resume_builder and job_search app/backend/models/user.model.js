const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: String
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  years: String
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
     select: false
  },
  role: {
    type: String,
    enum: ['user', 'employer', 'admin'],
    default: 'user',
    index: true
  },

  // 👇 PROFILE DATA
  skills: [String],

  education: [educationSchema],

  experience: [experienceSchema]

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);