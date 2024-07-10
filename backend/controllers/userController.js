import generateTokenAndSetCookies from "../middlewares/generateTokenAndSetCookies.js";
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
      message: "User saved successfully",
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
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Invalid username" });
    }
    const isMatch = bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    generateTokenAndSetCookies(user._id, res);
    res
      .status(200)
      .json({ _id: user._id, username: user.username, name: user.name });
  } catch {
    res.status(500).json({ error: error.message });
    console.log("error occurred: " + error.message);
    console.error(error.message);
  }
};
const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1, httpOnly: true });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ _id: user._id, username: user.username, name: user.name });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: error.message });
  }
};
const postResults = async (req, res) => {
  try {
    const userId = req.user._id;
    const { accuracy, wpm, practiceType } = req.body;

    // Validate input
    if (
      typeof accuracy !== "number" ||
      typeof wpm !== "number" ||
      !practiceType
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = { accuracy, wpm, practiceType };
    user.results.push(result);
    await user.save(); // Ensure to await the save operation

    res.status(201).json({ message: "Result saved successfully" });
  } catch (error) {
    console.error("An error occurred: " + error.message);
  }
};

const getResults = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const results = user.results;

    res.status(200).json(results);
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: error.message });
  }
};

const getBestResult = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const results = user.results;

    if (!results.length) {
      return res.status(404).json({ error: "No results found" });
    }

    // Find the best result based on accuracy and wpm
    let bestResult = results[0];
    for (const result of results) {
      if (
        result.wpm > bestResult.wpm ||
        (result.accuracy === bestResult.accuracy && result.wpm > bestResult.wpm)
      ) {
        bestResult = result;
      }
    }

    res.status(200).json(bestResult);
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: error.message });
  }
};

export {
  signupUser,
  loginUser,
  getProfile,
  logoutUser,
  postResults,
  getResults,
  getBestResult,
};
