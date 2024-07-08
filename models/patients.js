
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  condition: { type: Boolean, default: false },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY2, {
    expiresIn: "7d",
  });
  this.tokens.push({ token });
  await this.save();
  return token;
};

const patients= mongoose.model("patients", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label(" Name is required"),
    email: Joi.string().email().required().label("Email is required"),
    condition: Joi.boolean().label("Condition"),
    password: Joi.string().required().label("Pasword is required"),
  });
  return schema.validate(data);
};

module.exports = {patients, validate };
