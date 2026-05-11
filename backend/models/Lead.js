const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  courseOfInterest: {
    type: String
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Interested', 'Enrolled'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lead', leadSchema);
