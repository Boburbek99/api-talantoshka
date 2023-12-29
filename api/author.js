import express from "express";
let router = express.Router();

import { requireAuth } from "../services/passport-config.js";

import { authorQueries } from "../model/author.js";

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

    res.send(newAuthor);
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
export default router;
