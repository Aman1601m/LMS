const mongoose = require('mongoose');

const placedStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  package: { type: String },
  image: { type: String, default: 'https://i.pravatar.cc/150' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PlacedStudent', placedStudentSchema);
