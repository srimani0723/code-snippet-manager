import {
  createCollection,
  getCollectionsByUserId,
  getCollectionById,
  updateCollection,
  deleteCollection,
  updateSnippetCollections,
  updateCollectionSnippets,
} from "../services/collectionService.js";

export const updateCollectionSnippetsController = async (req, res) => {
  try {
    const collection = await updateCollectionSnippets(
      req.params.collectionId,
      req.body.snippetIds,
    );
    res.status(200).json({ collection });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const updateSnippetCollectionController = async (req, res) => {
  try {
    const collection = await updateSnippetCollections(
      req.body.collectionIds,
      req.params.snippetId,
      req.user.id,
    );
    res.status(200).json({ collection });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const createCollectionController = async (req, res) => {
  try {
    const collection = await createCollection(req.body, req.user.id);
    res.status(201).json({ collection });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const getCollectionsController = async (req, res) => {
  try {
    const collections = await getCollectionsByUserId(req.user.id);
    res.status(200).json({ collections });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const getCollectionByIdController = async (req, res) => {
  try {
    const collection = await getCollectionById(req.params.id);
    res.status(200).json({ collection });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const updateCollectionController = async (req, res) => {
  try {
    const collection = await updateCollection(req.params.id, req.body);
    res.status(200).json({ collection });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const deleteCollectionController = async (req, res) => {
  try {
    await deleteCollection(req.params.id);
    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
