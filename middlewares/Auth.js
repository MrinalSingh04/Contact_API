import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const token = req.header("Auth");
  //   console.log("This is token", token);

  if (!token) return res.status(400).json({ msg: "Login first" });

  const decoded = jwt.verify(token, process.env.JWT_Secret);
  //   console.log(decoded);
  const id = decoded.userId;

  let user = await User.findById(id);

  if (!user) return res.json({ msg: "User not found" });

  req.user = user;

  next();
};
