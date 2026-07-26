import express from "express";
import { javascriptCompiler } from "../controllers/compilerController.js";

const router = express.Router();

router.post("/javascript", javascriptCompiler);

export default router;
