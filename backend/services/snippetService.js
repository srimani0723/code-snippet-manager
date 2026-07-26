import SnippetModel from "../models/SnippetModel.js";

export const createSnippet = async (snippet, userId) => {
  return await SnippetModel.create({ ...snippet, user: userId });
};

export const getSnippets = async (
  filters = {},
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
) => {
  const snippets = await SnippetModel.find(filters)
    .populate("user", "name email")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 });

  const total = await SnippetModel.countDocuments(filters);
  return { snippets, total, pages: Math.ceil(total / limit) };
};

export const getSnippet = async (id) => {
  return await SnippetModel.findById(id);
};

export const updateSnippet = async (id, userId, snippet) => {
  return await SnippetModel.findOneAndUpdate(
    { _id: id, user: userId },
    snippet,
    { new: true, runValidators: true },
  );
};

export const deleteSnippet = async (id, userId, userEmail, userName) => {
  const deletedSnippet = await SnippetModel.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!deletedSnippet) {
    throw new Error("Snippet not deleted");
  }

  if (deletedSnippet.forkParent && deletedSnippet.forkParent.parentSnippetId) {
    await SnippetModel.findOneAndUpdate(
      { _id: deletedSnippet.forkParent.parentSnippetId },
      { $pull: { forkUsers: { name: userName, email: userEmail } } },
    );
  }

  return deletedSnippet;
};

// service
export const forkSnippet = async (forkId, userId, userName, userEmail) => {
  // here lean() changes mongodb bson to normal js object
  const originalSnippet = await SnippetModel.findOneAndUpdate(
    {
      _id: forkId,
      user: { $ne: userId },
      "forkUsers.email": { $ne: userEmail },
    },
    {
      $push: { forkUsers: { email: userEmail, name: userName } },
    },
    { new: false },
  )
    .populate("user", "name email")
    .lean();

  if (!originalSnippet) {
    //exists checks only wheter it exists and returns boolean value
    const exists = await SnippetModel.exists({ _id: forkId });
    if (!exists) throw new Error("Snippet not found");
    throw new Error(
      "You Already forked the snippet or your own snippet can't be forked",
    );
  }

  const {
    _id,
    createdAt,
    updatedAt,
    __v,
    user,
    forkParent,
    forkUsers,
    ...cleanSnippetData
  } = originalSnippet;

  const newSnippet = {
    ...cleanSnippetData,
    user: userId,
    forkParent: {
      parentSnippetId: _id,
      parentUserDetails: { name: user.name, email: user.email },
    },
    forkUsers: [],
  };

  const forkedSnippet = await SnippetModel.create(newSnippet);

  return forkedSnippet;
};
