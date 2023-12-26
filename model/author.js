import mongoose from "mongoose";

const authorSchema=new mongoose.Schema({
  name:String,
  surname:String,
  age:String,
  year:String,
  }) 
const author=mongoose.model("author",authorSchema)

const authorQueries = {
  getAuthors,
  addAuthor,
//   removeAuthor,    
//   updateAuthor,
//   getAuthorsId,
};
async  function getAuthors() {
    const res=await author.find();
    return res;
  }
  
  async function addAuthor(authorData) {
    const authors = new author(authorData)
    return await authors.save();
  }
  
  export {authorQueries,author}