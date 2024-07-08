
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const doctorTimingsSchema = new mongoose.Schema({

  starttime: { type: String, required: true },
  endtime: { type: String, required: true },
  availabledays: { type: String, required: true }
});
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  number: { type: Number, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  doctorTimings: [doctorTimingsSchema]
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  this.tokens.push({ token });
  await this.save();
  return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label(" Name is required"),
    number: Joi.string().required().label(" Number is required"),
    specialization: Joi.string().required().label("Specialization is required"),
    email: Joi.string().email().required().label("Email is required"),
    password: passwordComplexity().required().label("Strong Password is required"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
