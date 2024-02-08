const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require('../models/user.model');
const blacklist = new Set(); // Set to store revoked tokens

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "1h"});
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode
  console.log(`Default algorithm used: ${decoded.jti} == `,decoded ); 
  return token;
};

const verifyToken = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (blacklist.has(decoded.iat)) {
        return res.status(401).json({ message: 'Token revoked' });
      }
      req.user = await User.findById(decoded.id).select("password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Please login again");
    }
  }
  else {
    res.status(401);
    throw new Error("Not authorized, please login with token");}
});

const expireToken  = asyncHandler(async (req, res, next) => {
  const token = req.headers['authorization'].split(" ")[1];;
  if (!token) return res.status(400).json({ message: 'Token required' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    blacklist.add(decoded.iat);
    res.status(200).json({ message: 'Logged out successfully' });
   } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
});

module.exports = {generateToken, verifyToken, expireToken};
