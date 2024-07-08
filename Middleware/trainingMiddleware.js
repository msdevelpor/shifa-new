// Middleware/auth.js
const jwt = require('jsonwebtoken');

function trainingMiddleware(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY); // Replace 'your_secret_key' with your actual secret key
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
}

module.exports =trainingMiddleware;
