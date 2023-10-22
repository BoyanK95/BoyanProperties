import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json("User created succesfully!");
  } catch (error) {
    // res.status(500).json(error.message);
    // next(errorHandler(550, "error from the function!"));
    next(error);
  }
};

export const signin = async (req, res, next) => {
  /** Geting user and password */
  const { email, password } = req.body;

  try {
    /** Checking for User validation */
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Wrong credentials!"));
    }

    /** User is correct, authenticating user (creating cookie) */
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(validUser);
      
  } catch (error) {
    next(error);
  }
};
