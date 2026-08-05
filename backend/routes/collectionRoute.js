import express from "express";
import {
  createCollectionController,
  getCollectionsController,
  updateCollectionController,
  deleteCollectionController,
  getCollectionByIdController,
  updateSnippetCollectionController,
  updateCollectionSnippetsController,
} from "../controllers/collectionController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, createCollectionController);

router.get("/", verifyToken, getCollectionsController);
router.get("/:id", verifyToken, getCollectionByIdController);

router.put("/:id", verifyToken, updateCollectionController);
router.delete("/:id", verifyToken, deleteCollectionController);

router.patch(
  "/sync/:snippetId",
  verifyToken,
  updateSnippetCollectionController,
);

router.put(
  "/sync/:collectionId",
  verifyToken,
  updateCollectionSnippetsController,
);

export default router;
