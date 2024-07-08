import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(express.json());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // Your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.use("/users", userRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
