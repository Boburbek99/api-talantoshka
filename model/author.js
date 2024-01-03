import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: String,
  surname: String,
  age: String,
  year: String,
  email: String
})
const author = mongoose.model("author", authorSchema)

const authorQueries = {
  getAuthors,
  addAuthor,
  removeAuthor,
  updateAuthor,
  getAuthorById
};
async function getAuthors() {
  const res = await author.find();
  return res;
}

async function getAuthorById(id) {
  const result = await author.findById(id)
  return result;
}

async function addAuthor(authorData) {
  const authors = new author(authorData)
  return await authors.save();
}

async function removeAuthor(id) {
  const index = await author.deleteOne({ _id: id })
  return index;
}

async function updateAuthor(id, props) {
  const updatauthor = await author.findByIdAndUpdate({ _id: id }, props, { new: true });
  return await updatauthor.save();
}

export { authorQueries, author }