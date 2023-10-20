import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000!");
});


app.get('/', (req, res, next) => {
    res.send('Hello world!!!')
})