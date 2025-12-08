import CollectionModel from "../models/CollectionModel.js";

export const createCollection = async (collection, userId) => {
  return await CollectionModel.create({ ...collection, user: userId });
};

export const getCollectionsByUserId = async (userId) => {
  return await CollectionModel.find({ user: userId });
};

export const updateCollection = async (id, collection) => {
  return await CollectionModel.findByIdAndUpdate(id, collection, { new: true });
};

export const deleteCollection = async (id) => {
  return await CollectionModel.findByIdAndDelete(id);
};
