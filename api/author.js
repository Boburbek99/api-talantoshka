import express from "express";
let router = express.Router();

import { requireAuth } from "../services/passport-config.js";

import { authorQueries } from "../model/author.js";
import { collectionQueries } from "../model/collection.js"

router.get("/author", requireAuth, async (req, res) => {
  try {
    const authors = await authorQueries.getAuthors();
    res.status(200).send(authors);
  } catch (error) {
    res.status(500).send("Server error", error);
  }
});

router.post("/author", requireAuth, async (req, res) => {
  try {
    const newAuthor = await authorQueries.addAuthor(req.body);
    res.status(200).send("post operation Success");
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
});
router.put("/author/:id", requireAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const updateAuthor = await authorQueries.updateAuthor(id, req.body);
    res.send(updateAuthor);
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
});

router.delete("/author/:id", requireAuth, async (req, res) => {
  try {
    const removeAuthor = await authorQueries.removeAuthor(req.params.id);
    res.send(removeAuthor);
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
});
router.get("/author/:id", requireAuth, async (req, res) => {
  try {
    const getById = await authorQueries.getAuthorById(req.params.id);
    console.log(getById, "getById")
    res.send(getById);
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
});

router.get("/author/:id/collection", requireAuth, async (req, res) => {
  try {
    const id = req.params.id
    const collectionsByAuthor = await collectionQueries.getCollection(id);
    res.send(collectionsByAuthor);
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
});
export default router;
