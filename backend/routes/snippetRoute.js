import express from "express";
import {
  createSnippetController,
  getSnippetsController,
  updateSnippetController,
  deleteSnippetController,
  forkSnippetController,
  getSnippetController,
} from "../controllers/snippetController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, createSnippetController);

router.get("/", getSnippetsController);
router.get("/:id", getSnippetController);

router.put("/:id", verifyToken, updateSnippetController);
router.delete("/:id", verifyToken, deleteSnippetController);
router.post("/:id/fork", verifyToken, forkSnippetController);

export default router;
