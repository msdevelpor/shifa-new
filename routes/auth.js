const router = require("express").Router();
const { doctorlogin } = require("../Controller/authController");
const {patientlogin} = require('../Controller/patientauth')
router.post("/", doctorlogin);
router.post("/patient", patientlogin);

module.exports = router;