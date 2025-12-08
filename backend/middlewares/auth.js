import { decodeToken } from "../utils/jwt.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized or No Token" });
  }

  try {
    const decoded = decodeToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized or Invalid Token" });
    }

    req.user = decoded; // { id, name, email, ... }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token", error: error });
  }
};
