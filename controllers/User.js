import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (name == " " || email == " " || password == " ")
    return res.status(400).json({ msg: "All fields are required" });

  let user = await User.findOne({ email });
  if (user) return res.json({ msg: "User already exists" });

  const hashPass = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPass,
  });
  res.json({ msg: "User registered successfully", user });
};

//user login

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email == " " || password == " ")
    return res.status(400).json({ msg: "All fields are required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.json({ msg: "Invalid Credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_Secret, {
    expiresIn: "1d",
  });

  res.json({ msg: `Welcome back ${user.name}`, token });
};
