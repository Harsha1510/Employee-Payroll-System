// const express = require('express');
// const router = express.Router();
// const Employee = require('../models/Employee');

// // Login route for employees
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body; // Expecting email and password from the client

//     // Find employee by email
//     const employee = await Employee.findOne({ email });

//     if (!employee) {
//       return res.status(400).json({ error: 'Employee not found' });
//     }

//     // Directly compare the password
//     if (employee.password !== password) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Send response if successful
//     res.status(200).json({ message: 'Login successful', employee });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // GET route to fetch employee details by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id); // Find employee by ID

//     if (!employee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }

//     res.status(200).json(employee); // Send employee data as a response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // PATCH route to update employee details
// router.patch('/:id', async (req, res) => {
//   try {
//     const { name, salary, email, PhoneNumber, password } = req.body;

//     // Find employee by ID and update details
//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       { name, salary, email, PhoneNumber, password },
//       { new: true } // Return the updated employee
//     );

//     if (!updatedEmployee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }

//     res.status(200).json(updatedEmployee); // Send the updated employee data
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
