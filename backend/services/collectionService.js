import CollectionModel from "../models/CollectionModel.js";

export const createCollection = async (collection, userId) => {
  return await CollectionModel.create({ ...collection, user: userId });
};

export const getCollectionsByUserId = async (userId) => {
  return await CollectionModel.find({ user: userId }).populate("snippets");
};

export const getCollectionById = async (id) => {
  return await CollectionModel.findById(id).populate("snippets");
};

export const updateCollection = async (id, collection) => {
  return await CollectionModel.findByIdAndUpdate(id, collection, {
    new: true,
  }).populate("snippets");
};

export const addSnippetToCollection = async (collectionId, snippetId) => {
  return await CollectionModel.findByIdAndUpdate(
    collectionId,
    { addToSet: { snippets: snippetId } },
    { new: true },
  ).populate("snippets");
};

export const updateSnippetCollections = async (
  collectionIds,
  snippetId,
  userId,
) => {
  // adds the snippet to the collections in collectionIds and removes it from collections not in collectionIds

  await CollectionModel.updateMany(
    { user: userId, _id: { $in: collectionIds } },
    { $addToSet: { snippets: snippetId } },
  );

  await CollectionModel.updateMany(
    { user: userId, _id: { $nin: collectionIds } },
    { $pull: { snippets: snippetId } },
  );

  return await CollectionModel.find({ user: userId }).populate("snippets");
};

export const deleteCollection = async (id) => {
  return await CollectionModel.findByIdAndDelete(id);
};
