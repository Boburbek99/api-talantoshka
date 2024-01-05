import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: String,
})
const tag = mongoose.model("tags", tagSchema);

const tagQueries = {

    getTags,
    addTag,
    removeTag,
    updateTag
}

async function getTags() {
    const getAllTags = await tag.find();
    return getAllTags;
}

async function addTag(tagData) {
    const newCollection = new tag(tagData);
    return await newCollection.save();
}

async function removeTag(id) {
    const remove = await tag.deleteOne({ _id: id });
    return remove;
}
async function updateTag(id, props) {
    const update = await tag.findByIdAndUpdate({ _id: id }, props, { new: true });
    return await update.save();
}
export { tagQueries, tag }