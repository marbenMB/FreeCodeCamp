const UserModel = require("../Models/User.model");

const createNewUser = async (user) => {
  return await UserModel.create(user);
};

const getAllUsers = async () => {
  return await UserModel.find({});
};

const getUserById = async (id) => {
  return await UserModel.findById(id);
};

module.exports = { createNewUser, getAllUsers, getUserById };
