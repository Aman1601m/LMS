const express = require('express');
const router = express.Router();
const PlacedStudent = require('../models/PlacedStudent');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const data = await PlacedStudent.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const newStudent = new PlacedStudent(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updated = await PlacedStudent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await PlacedStudent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
