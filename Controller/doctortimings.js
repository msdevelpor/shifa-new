const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/user');

module.exports = {
  adddoctor: async function (req, res) {
    try {

      const { id, starttime, endtime, availabledays } = req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      user.doctorTimings.push({  starttime, endtime, availabledays });
      await user.save();

      res.status(201).json(user);
    } catch (error) {
      console.error('Error adding doctor timings:', error);
      res.status(500).json({ error: 'Error adding doctor timings' });
    }
  }
}
