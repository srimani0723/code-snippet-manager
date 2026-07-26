import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

console.log(SECRET);

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "2d" });
};

export const decodeToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
    // it gives us the payload
  } catch {
    return null;
  }
};
