import mongoose from "mongoose";

const collectionSchema=new mongoose.Schema({
  name:String,
  description:String,
  newPrice:String,
  oldPrice:String,
  author:String
  }) 
const collection=mongoose.model("collections",collectionSchema);

const collectionQueries={getCollections,addCollection,updateCollection,removeCollection}

async function getCollections(){
    const getAllcollection= await collection.find();
    return getAllcollection;
}
async function addCollection(collectionData){
    const newCollection= new collection (collectionData);
    return await newCollection.save();
}
async function updateCollection(id, props) {
    const updateCollection= await collection.findByIdAndUpdate({_id:id}, props, { new: true });
    return await updateCollection.save();
  }
  async function removeCollection(id) {
    const remove= await collection.deleteOne({_id:id});
    return remove;
  }
export {collectionQueries,collection}