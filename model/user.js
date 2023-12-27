import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  login:String,
  passwordHash:String,
}) 
const user=mongoose.model("user",userSchema)

const userQueries = { 
  getUserByLogin, 
  getUserById, 
  addUser
};

async function getUserById(id) {
  return await user.findById(id);
};

async function getUserByLogin(login) {
  const founUser = await user.findOne({login})
  return founUser;
}

async function addUser(userData) {
  const newUsers =new user(userData)
  return await newUsers.save()
}

export { userQueries, user };
  