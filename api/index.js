import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

//config .env variables
dotenv.config();

/** Connecting mongoose to mongoDB */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

/** Creating server with express */
const app = express();

/** Allowing json as input from server middleware */
app.use(express.json());
app.use(cookieParser())

app.listen(3000, () => {
  console.log("Server running on port 3000!");
});

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
