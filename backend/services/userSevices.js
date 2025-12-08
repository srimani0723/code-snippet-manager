import UserModel from "../models/UserModel.js";

export const FindUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

export const CreateUser = async (user) => {
  return await UserModel.create(user);
};
