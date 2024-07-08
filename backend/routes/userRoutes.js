import express from "express";
const router = express.Router();
import {
  signupUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";
router.get("/profile", getProfile);
router.post("/login", loginUser);
router.post("/signup", signupUser);

export default router;
