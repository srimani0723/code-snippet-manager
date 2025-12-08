import express from "express";
import { register, login, logout } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", verifyToken, (req, res) => {
  res.status(200).json({
    authorised: true,
    user: req.user,
  });
});

export default router;
