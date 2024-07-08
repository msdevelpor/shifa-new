const mongoose = require('mongoose');

const doctorTimingsSchema = new mongoose.Schema({
    patientId: { type: String, required: false },
    doctorId: { type: String, required: false },
    appointmentDate: { type: String, required: false },
    appointmentTime: { type: String, required: false },
    appointmentType: { type: String, required: false },
    diabtesReading: { type: String, required: false },
    bloodPreseureLow: { type: String, required: false },
    bloodPreseureHigh: { type: String, required: false },

});

const Appointment = mongoose.model('Appointment', doctorTimingsSchema);

module.exports = Appointment;