import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    next();
  });
};

export default protectRoute;
