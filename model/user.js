import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  login: String,
  passwordHash: String,
  role: String,
});
const user = mongoose.model("user", userSchema);

const userQueries = {
  UserByLogin,
  getUserById,
  addUser,
  updatePassword
};

async function updatePassword(id, newPassword) {
  const update = await user.findByIdAndUpdate({ _id: id }, { passwordHash: newPassword });
  return await update.save()
}

async function getUserById(id) {
  return await user.findById(id);
}

async function UserByLogin(login) {
  const foundUser = await user.findOne({ login });
  return foundUser;
}

async function addUser(userData) {
  const newUsers = new user(userData);
  return await newUsers.save();
}

export { userQueries, user };
