const Appointment = require("../models/appointmentModel");
const { patients } = require("../models/patients");
const addappointment = async (req, res) => {
  try {
    // Extract data from the request
    const {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      appointmentType,
      diabtesReading,
      bloodPreseureLow,
      bloodPreseureHigh,
    } = req.body;

    // Create a new job posting
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      appointmentType,
      diabtesReading,
      bloodPreseureLow,
      bloodPreseureHigh,
    });
    console.log(appointment, "appointment");
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Appointment creation failed:", error);
    res.status(500).json({ error: "Appointment creation failed" + error });
  }
};

// const finddoctorById = async (req, res) => {
//     try {
//         console.log(req,"request")
//         console.log(req.params.id,"doctorId")
//         const doctorId=req.params.id
//         const doctor = await Appointment.findById(doctorId);
//         console.log(doctor,"doctor")
//         if (!doctor) return res.status(404).send({ message: "doctor not found" });

//         res.json(doctor);
//     } catch (error) {
//         console.error('Error fetching user by doctor:', error);
//         res.status(500).json({ error: 'Error fetching user' });
//     }
// };

const finddoctorAll = async (req, res) => {
  try {
    const users = await Appointment.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};


const finddoctorbyId = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const appointments = await Appointment.aggregate([
      { $match: { doctorId: doctorId } },
      {
        $addFields: {
          patientObjId: { $toObjectId: "$patientId" },
        },
      },
      {
        $lookup: {
          from: 'patients', // Name of the Patient collection
          localField: 'patientObjId',
          foreignField: '_id',
          as: 'patientInfo'
        }
      },
      {
        $unwind: {
          path: '$patientInfo',
          preserveNullAndEmptyArrays: true // Keep appointments even if no matching patient is found
        }
      },
      {
        $project: {
          _id: 1,
          patientId: 1,
          doctorId: 1,
          appointmentDate: 1,
          appointmentTime: 1,
          appointmentType: 1,
          diabtesReading: 1,
          bloodPreseureLow: 1,
          bloodPreseureHigh: 1,
          patientInfo: 1 // Directly include the patientInfo field
        }
      }
    ]);

    if (!appointments || appointments.length === 0) {
      return res.status(404).send({ message: "Doctor not found or no appointments for this doctor" });
    }

    console.log(appointments, "appointments with patient info");
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    res.status(500).json({ error: "Error fetching doctor" });
  }
};



const findPatientById = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Appointment.find({ patientId: patientId });

    if (!patient) return res.status(404).send({ message: "doctor not found" });

    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient by ID:", error);
    res.status(500).json({ error: "Error fetching doctor" });
  }
};

module.exports = { addappointment, finddoctorAll, finddoctorbyId,findPatientById };
