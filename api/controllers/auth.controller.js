import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { passwordGenerator } from "../utils/passwordGenerator.js";
import { convertUsername } from "../utils/convertNameToUsername.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    /** Create new mongoose User */
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
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = passwordGenerator();
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: convertUsername(req.body.name),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo
      });
    }
  } catch (error) {
    next(error);
  }
};
