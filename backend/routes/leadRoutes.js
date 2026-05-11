const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { protect, admin } = require('../middleware/authMiddleware');

// Submit a new lead / enrollment inquiry (Public)
router.post('/', async (req, res) => {
  try {
    const lead = new Lead({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      courseOfInterest: req.body.courseOfInterest,
      message: req.body.message
    });
    
    const newLead = await lead.save();
    res.status(201).json({ message: 'Enrollment inquiry received successfully!', lead: newLead });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all leads (Admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE lead status (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a lead (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
