import { CreateUser, FindUserByEmail } from "../services/userSevices.js";
import { clearAuthCookie, setCookie } from "../utils/cookies.js";
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
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    });

    res.status(201).json({
      user: {
        id: newUser._id,
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
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
      _id: user._id,
      email: user.email,
      name: user.name,
    });

    res.status(201).json({
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const logout = async (req, res) => {
  clearAuthCookie(res);
  res.status(200).json({
    message: "User logged out successfully",
  });
};
