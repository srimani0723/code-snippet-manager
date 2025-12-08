import SnippetModel from "../models/SnippetModel.js";

export const createSnippet = async (snippet, userId) => {
  return await SnippetModel.create({ ...snippet, user: userId });
};

export const getSnippets = async (
  filters = {},
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc"
) => {
  const snippets = await SnippetModel.find(filters)
    .populate("user", "name")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 });

  const total = await SnippetModel.countDocuments(filters);
  return { snippets, total, pages: Math.ceil(total / limit) };
};

export const updateSnippet = async (id, userId, snippet) => {
  return await SnippetModel.findOneAndUpdate(
    { _id: id, user: userId },
    snippet,
    { new: true, runValidators: true }
  );
};

export const deleteSnippet = async (id, userId) => {
  return await SnippetModel.findOneAndDelete({ _id: id, user: userId });
};

// service
export const forkSnippet = async (id, userId) => {
  const snippet = await SnippetModel.findById(id);
  if (!snippet) {
    throw new Error("Snippet not found");
  }

  const plain = snippet.toObject();
  delete plain._id;
  delete plain.createdAt;
  delete plain.updatedAt;
  delete plain.__v;
  delete plain.user;
  delete plain.forkParent;

  const forkedSnippet = await SnippetModel.create({
    ...plain,
    user: userId,
    forkParent: snippet._id,
  });

  return forkedSnippet;
};
