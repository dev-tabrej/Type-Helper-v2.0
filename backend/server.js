import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
connectDB();
app.use(express.json());

// Load environment variables from .env file

// Middleware to parse JSON

// Connect to MongoDB

// Define a simple route
app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

// Get the port from environment variables or use default 4000
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
