// middleware/auth.js
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  try {
    if (!token) {
      throw new Error("Token is missing"); // Token is missing
    }

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) {
      throw new Error("User not found"); // User not found
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
    console.log("Unauthorized");
  }
};

module.exports = auth;