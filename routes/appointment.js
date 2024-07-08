

const router = require("express").Router();
const { addappointment,finddoctorAll,finddoctorbyId,findPatientById } = require("../Controller/appointment");

router.post("/", addappointment);
router.get("/findalldoctors",finddoctorAll)
router.get("/:doctorId",finddoctorbyId)
router.get("/patient/:patientId",findPatientById)
module.exports = router;
