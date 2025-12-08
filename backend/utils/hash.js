import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

export const comparePassword = async (plainPassword, hash) => {
  return await bcrypt.compare(plainPassword, hash);
};
