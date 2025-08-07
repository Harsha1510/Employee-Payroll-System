const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Add a new employee
router.post('/add', async (req, res) => {
  try {
    const { name, salary, email, PhoneNumber } = req.body;

    const employee = new Employee({
      name,
      salary,
      email,
      PhoneNumber,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Increment WorkingDays by 1 for a given email
router.put('/increment-working-days', async (req, res) => {
  const { email } = req.body;
  try {
    const employee = await Employee.findOneAndUpdate(
      { email },
      { $inc: { WorkingDays: 1 } },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});
// Get employee by email
router.get('/:email', async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.params.email });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
