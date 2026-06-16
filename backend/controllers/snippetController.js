import {
  createSnippet,
  getSnippets,
  updateSnippet,
  deleteSnippet,
  forkSnippet,
} from "../services/snippetService.js";

export const createSnippetController = async (req, res) => {
  try {
    const snippet = await createSnippet(req.body, req.user.id);
    res.status(201).json({ snippet });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const getSnippetsController = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 10,
      language,
      tags,
      isPublic = "true",
      userId,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const filters = {};

    if (userId && userId !== "undefined" && userId !== "null") {
      filters.user = userId; // only my snippets
    } else {
      filters.isPublic = isPublic === "true"; // public listing
    }

    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (language) filters.language = language;
    if (tags) filters.tags = { $in: tags.split(",").map((t) => t.trim()) };

    const { snippets, total, pages } = await getSnippets(
      filters,
      parseInt(page, 10),
      parseInt(limit, 10),
      sortBy,
      sortOrder,
    );

    res.status(200).json({ snippets, total, pages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSnippetController = async (req, res) => {
  try {
    const updated = await updateSnippet(req.params.id, req.user.id, req.body);
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Snippet not found or not owned by user" });
    }
    res.status(200).json({ snippet: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSnippetController = async (req, res) => {
  try {
    const deleted = await deleteSnippet(req.params.id, req.user.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Snippet not found or not owned by user" });
    }
    res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const forkSnippetController = async (req, res) => {
  try {
    const snippet = await forkSnippet(req.params.id, req.user.id);
    res.status(200).json({ snippet });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
