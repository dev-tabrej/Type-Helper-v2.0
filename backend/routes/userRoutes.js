import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  signupUser,
  loginUser,
  getProfile,
  logoutUser,
  postResults,
  getResults,
  getBestResult,
} from "../controllers/userController.js";
const router = express.Router();
router.get("/profile", protectRoute, getProfile);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);
router.post("/postresults", protectRoute, postResults);
router.get("/results", protectRoute, getResults);
router.get("/best-result", protectRoute, getBestResult);
export default router;
