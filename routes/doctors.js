

const router = require("express").Router();
const { adddoctor } = require("../Controller/doctortimings");

router.post("/", adddoctor);


module.exports = router;
