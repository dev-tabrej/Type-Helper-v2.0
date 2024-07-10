import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from cookies:", token); // Debugging statement
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err); // Debugging statement
      return res.status(403).json({ error: "Forbidden" });
    }
    console.log("Decoded JWT:", decoded); // Debugging statement

    req.user = await User.findById(decoded.userId);
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    next();
  });
};

export default protectRoute;
