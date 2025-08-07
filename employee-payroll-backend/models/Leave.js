const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  employee: String,
  reason: String,
  date: String,
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Leave', LeaveSchema);