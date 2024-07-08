// controllers/userController.js

const {patients, validate } = require("../models/patients");
const bcrypt = require("bcrypt");

const registerPatients = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.message });

        const user = await patients.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: "User with given email already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new patients({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" + error});
    }
};
const findbyIdPatients = async (req, res) => {
    try {
        const user = await patients.findById(req.params.id);
        if (!user) return res.status(404).send({ message: "User not found" });

        res.json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
}


module.exports = { registerPatients,findbyIdPatients };
