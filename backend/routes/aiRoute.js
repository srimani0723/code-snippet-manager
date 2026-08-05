import express from "express";
import { explainCode } from "../controllers/aiController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/explain", verifyToken, explainCode);

export default router;
