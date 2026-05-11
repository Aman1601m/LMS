const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'General'
  },
  duration: {
    type: String,
    default: '3 Months'
  },
  icon: {
    type: String,
    default: 'BookOpen'
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  syllabus: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);
