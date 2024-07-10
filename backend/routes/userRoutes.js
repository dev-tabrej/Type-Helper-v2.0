import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  signupUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../controllers/userController.js";
const router = express.Router();
router.get("/profile", protectRoute, getProfile);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);

export default router;
