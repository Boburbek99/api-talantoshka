import express from "express";
let router = express.Router();

import { requireAuth } from "../services/passport-config.js";
import { collectionQueries } from "../model/collection.js"

router.get("/collection", requireAuth, async (req, res) => {
  try {
    const collection = await collectionQueries.getCollections();
    res.send(collection);
  } catch (error) {
    res.status(500).send("Server error", error);
  }
})
router.post("/collection", requireAuth, async (req, res) => {
  try {
    const newCollection = await collectionQueries.addCollection(req.body);

    res.send(newCollection);
  } catch (error) {
    console.log(error, 'error')
    res.status(500).send("Server error", error);
  }
})
router.put("/collection/:id", requireAuth, async (req, res) => {
  try {
    const id = req.params.id
    const newCollection = await collectionQueries.updateCollection(id, req.body);
    res.send(newCollection);
  } catch (error) {
    console.log(error, 'error')
    res.status(500).send("Server error", error);
  }
})
router.delete("/collection/:id", requireAuth, async (req, res) => {
  try {
    const id = req.params.id
    const deleteCollection = await collectionQueries.removeCollection(id);
    res.status(200).send("delete operation Success");
  } catch (error) {
    res.status(500).send("Server error", error);
  }
})


export default router;