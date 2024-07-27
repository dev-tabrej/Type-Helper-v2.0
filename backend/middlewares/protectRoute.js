import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from cookies:", token); // Debugging statement
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debugging statement
    req.user = await User.findById(decoded.userId);
    if (!req.user) {
      return res.status(404).json({ error: 'User not found' });
    }
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); // Debugging statement
    return res.status(403).json({ error: 'Forbidden' });
  }
};

export default protectRoute;

