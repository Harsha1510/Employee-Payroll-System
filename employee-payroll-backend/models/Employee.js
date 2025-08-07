const mongoose = require('mongoose');

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  salary: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  PhoneNumber: { type: Number, required: true , unique: true },
  WorkingDays: { type: Number, required: true , default : 0}
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
