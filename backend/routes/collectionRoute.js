import express from "express";
import {
  createCollectionController,
  getCollectionsController,
  updateCollectionController,
  deleteCollectionController,
} from "../controllers/collectionController.js";

const router = express.Router();

router.post("/", createCollectionController);
router.get("/", getCollectionsController);
router.put("/:id", updateCollectionController);
router.delete("/:id", deleteCollectionController);

export default router;
