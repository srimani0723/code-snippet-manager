import { CreateUser, FindUserByEmail } from "../services/userSevices.js";
import { setCookie } from "../utils/cookies.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

const createTokenAndSetCookie = (res, payload) => {
  const token = generateToken(payload);

  setCookie(res, token);

  return token;
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await FindUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await CreateUser({
      name,
      email,
      password: await hashPassword(password),
    });

    const token = createTokenAndSetCookie(res, {
      id: newUser._id,
      email: newUser.email,
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await FindUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = createTokenAndSetCookie(res, {
      id: user._id,
      email: user.email,
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};
