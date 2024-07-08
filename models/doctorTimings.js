const mongoose = require('mongoose');

const doctorTimingsSchema = new mongoose.Schema({
  starttime: { type: String, required: true },
  endtime: { type: String, required: true },
  availabledays: { type: String, required: true }
});

const DoctorTiming = mongoose.model('DoctorTiming', doctorTimingsSchema);

module.exports = DoctorTiming;
