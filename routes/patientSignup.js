

const router = require("express").Router();
const { registerPatients,findbyIdPatients } = require("../Controller/patientSignup");

router.post("/", registerPatients);
router.get("/:id", findbyIdPatients);



module.exports = router;
