import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  name: String,
  description: String,
  newPrice: String,
  oldPrice: String,
  tag: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "tag",
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
  },
})
const collection = mongoose.model("collections", collectionSchema);

const collectionQueries = {
  getCollections,
  getCollection,
  addCollection,
  updateCollection,
  removeCollection,
}

async function getCollections() {
  const getAllcollection = await collection.find().populate("name");;
  return getAllcollection;
}

async function addCollection(collectionData) {
  const newCollection = new collection(collectionData);
  return await newCollection.save();
}

async function updateCollection(id, props) {
  const updateCollection = await collection.findByIdAndUpdate({ _id: id }, props, { new: true });
  return await updateCollection.save();
}

async function removeCollection(id) {
  const remove = await collection.deleteOne({ _id: id });
  return remove;
}

async function getCollection(id) {
  const authorCollection = await collection.find({ author: id }, { tag: id }).populate("name")
  return authorCollection;
}



export { collectionQueries, collection }