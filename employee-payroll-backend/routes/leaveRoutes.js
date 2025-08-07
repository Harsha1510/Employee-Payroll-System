const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');

// Submit a new leave request
router.post('/add', async (req, res) => {
  try {
    const { employee, reason, date } = req.body;

    const leave = new Leave({ employee, reason, date });
    await leave.save();

    res.status(201).json({ message: 'Leave request submitted', leave });
  } catch (error) {
    console.error('Error submitting leave:', error);
    res.status(500).json({ error: 'Failed to submit leave request' });
  }
});

// Get all leave requests
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
});

// Update leave status (e.g., approve/reject)
router.patch('/:id', async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leave status' });
  }
});

module.exports = router;
