import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
const signupUser = async (req, res) => {
  try {
    const { username, name, password, email } = req.body;
    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Name, username, and password are required" });
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      res.status(409).json({ error: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      name,
    });
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error occurred: " + error.message);
    console.error(error.message);
  }
};
const loginUser = async (req, res, next) => {};
const getProfile = async (req, res, next) => {};
export { signupUser, loginUser, getProfile };
